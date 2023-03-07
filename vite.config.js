import solidPlugin from 'vite-plugin-solid'
import { defineConfig } from 'vite'

export default defineConfig( {
  plugins: [ solidPlugin() ],
  root :'app',
  build: {
    target: 'esnext',
    outDir: '../public'
  },
} )