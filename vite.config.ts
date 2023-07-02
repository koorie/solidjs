import solidPlugin from 'vite-plugin-solid'
import devtools from 'solid-devtools/vite'
import { defineConfig } from 'vite'

export default defineConfig( {
  plugins: [ solidPlugin(), devtools() ],
  root :'app',
  build: {
    target: 'esnext',
    outDir: '../public'
  },
} )
