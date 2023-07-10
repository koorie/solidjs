npx tsc --skipLibCheck &&
npx eslint . --fix --ext .ts &&
npm run build:fix-chmod &&
sh shell_scripts/assets.sh
