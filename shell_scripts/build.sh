npx babel --extensions ".ts" --out-dir ./ src &&
npx tsc &&
npx eslint . --fix --ext .ts --ext .js &&
npm run build:fix-chmod