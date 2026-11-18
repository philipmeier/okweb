#!/usr/bin/env bash
# scripts/deploy-dev.sh
# Builds 10z-web and syncs dist/ to the Dev GCS bucket (gs://mid-10z-dev-2)
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${ROOT_DIR}"
node scripts/deploy.mjs dev "$@"

