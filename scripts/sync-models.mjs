// scripts/sync-models.mjs
// Proxy script to generic app update script (scripts/sync-app.mjs)
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const syncAppScript = path.resolve(__dirname, 'sync-app.mjs');

const child = spawn(process.execPath, [syncAppScript, '--models'], {
  stdio: 'inherit',
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
