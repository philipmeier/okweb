#!/usr/bin/env node
/**
 * scripts/deploy.mjs
 *
 * Builds the 10z-web Astro site and deploys `dist/` to the corresponding
 * Google Cloud Storage bucket using `gcloud storage rsync`.
 *
 * Environments:
 *   - dev  -> gs://mid-10z-dev-2 (https://mid-10z-dev-2.storage.googleapis.com)
 *   - prod -> gs://mid-10z-dev-1 (https://mid-10z-dev-1.storage.googleapis.com)
 *
 * Usage:
 *   npm run deploy:dev
 *   npm run deploy:prod
 *   node scripts/deploy.mjs dev [--skip-build] [--build-only] [--dry-run] [--no-delete]
 *   node scripts/deploy.mjs prod [--skip-build] [--build-only] [--dry-run] [--no-delete]
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

const ENVIRONMENTS = {
  dev: {
    name: 'Development',
    bucket: process.env.GCS_BUCKET_DEV || 'mid-10z-dev-2',
    siteUrl: process.env.SITE_URL_DEV || 'https://mid-10z-dev-2.storage.googleapis.com',
  },
  prod: {
    name: 'Production',
    bucket: process.env.GCS_BUCKET_PROD || 'mid-10z-dev-1',
    siteUrl: process.env.SITE_URL_PROD || 'https://mid-10z-dev-1.storage.googleapis.com',
  },
};

function printHelp() {
  console.log(`
10zebra Web — Google Cloud Storage Deployment Script

Usage:
  node scripts/deploy.mjs <dev|prod> [options]

Targets:
  dev                 Deploy to Dev bucket  (gs://${ENVIRONMENTS.dev.bucket})
  prod                Deploy to Prod bucket (gs://${ENVIRONMENTS.prod.bucket})

Options:
  --skip-build        Skip running "astro build" and deploy existing dist/ directory
  --build-only        Run "astro build" for the target environment without uploading to GCS
  --dry-run           Preview gcloud storage rsync changes without modifying the bucket
  --no-delete         Do not delete destination objects in the bucket that are absent in dist/
  --skip-cache        Skip updating Cache-Control headers on .html objects after upload
  -h, --help          Show this help message
`);
}

const args = process.argv.slice(2);
if (args.includes('-h') || args.includes('--help')) {
  printHelp();
  process.exit(0);
}

const envArg = args.find((a) => !a.startsWith('-'))?.toLowerCase();
if (!envArg || !ENVIRONMENTS[envArg]) {
  console.error('❌ Error: Please specify a valid target environment: "dev" or "prod".');
  printHelp();
  process.exit(1);
}

const skipBuild = args.includes('--skip-build');
const buildOnly = args.includes('--build-only');
const dryRun = args.includes('--dry-run');
const noDelete = args.includes('--no-delete');
const skipCache = args.includes('--skip-cache');

const target = ENVIRONMENTS[envArg];
const bucketUri = `gs://${target.bucket}`;

console.log('================================================================');
console.log(`🚀 10zebra Web Deployment — ${target.name.toUpperCase()} (${envArg})`);
console.log(`📦 Target Bucket : ${bucketUri}`);
console.log(`🌐 Site Base URL : ${target.siteUrl}`);
console.log('================================================================');

/**
 * Helper to execute a shell command with inherited stdio.
 */
function runCommand(command, cmdArgs, extraEnv = {}) {
  const fullCmd = [command, ...cmdArgs].join(' ');
  console.log(`\n▶ ${fullCmd}`);

  const result = spawnSync(command, cmdArgs, {
    cwd: rootDir,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: {
      ...process.env,
      ...extraEnv,
    },
  });

  if (result.error) {
    console.error(`\n❌ Failed to start command "${command}": ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`\n❌ Command exited with code ${result.status}: ${fullCmd}`);
    process.exit(result.status || 1);
  }
}

// ---------------------------------------------------------------------------
// Step 1: Build the Astro site
// ---------------------------------------------------------------------------
if (!skipBuild) {
  console.log(`\n[1/3] 🛠️  Building Astro site for ${target.name}...`);
  runCommand('npx', ['astro', 'build'], {
    SITE_URL: target.siteUrl,
  });
} else {
  console.log('\n[1/3] ⏭️  Skipping Astro build (--skip-build)');
}

if (!fs.existsSync(distDir) || !fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error(`\n❌ Error: Build output not found at ${distDir}/index.html.`);
  process.exit(1);
}

if (buildOnly) {
  console.log(`\n✅ Build completed for ${target.name} (--build-only). Output is in dist/.`);
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Step 2: Sync dist/ to Google Cloud Storage bucket
// ---------------------------------------------------------------------------
console.log(`\n[2/3] ☁️  Syncing dist/ to ${bucketUri}...`);
const rsyncArgs = ['storage', 'rsync', 'dist', bucketUri, '--recursive'];
if (!noDelete) {
  rsyncArgs.push('--delete-unmatched-destination-objects');
}
if (dryRun) {
  rsyncArgs.push('--dry-run');
}

runCommand('gcloud', rsyncArgs);

// ---------------------------------------------------------------------------
// Step 3: Set no-cache headers on HTML files so updates appear immediately
// ---------------------------------------------------------------------------
if (!dryRun && !skipCache) {
  console.log(`\n[3/3] 🔄 Setting no-cache headers on HTML files in ${bucketUri}...`);
  runCommand('gcloud', [
    'storage',
    'objects',
    'update',
    `${bucketUri}/**.html`,
    '--cache-control=no-cache, max-age=0, must-revalidate',
  ]);
} else {
  console.log(
    `\n[3/3] ⏭️  Skipping HTML cache header update (${dryRun ? '--dry-run' : '--skip-cache'})`
  );
}

console.log('\n================================================================');
console.log(`✅ Deployment to ${target.name} (${bucketUri}) complete!`);
console.log(`🔗 Live URL: ${target.siteUrl}/index.html`);
console.log('================================================================\n');

