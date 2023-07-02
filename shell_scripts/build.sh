npx tsc &&
npx eslint . --fix --ext .ts &&
npm run build:fix-chmod &&
mkdir lib/solidjs/assets || true &&
cp src/lib/solidjs/assets/favicon.ico lib/solidjs/assets/favicon.ico || true
