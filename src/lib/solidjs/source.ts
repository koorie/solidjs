import { cp, mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolvers, undefined_ } from 'oftypes'
import { access, rm } from 'fs/promises'

const favicon: string = `${dirname( fileURLToPath( import.meta.url ) )}/assets/favicon.ico`
const source_map: Map<string, string> = new Map()
const app_path: string = `${process.cwd()}/app`
const root_path: string = `${process.cwd()}`
const assets_path: string = `${app_path}/assets`

let root_source: string = 'root'
let html_title_source: string = 'Koorie SolidJS App'
let App_text_source: string = 'Koorie server SolidJS'

source_map.set( 'assets', null )

export default async function source( root?: string, html_title?: string, App_text?: string ): Promise<void>{

  root_source = await undefined_( root, await resolvers( root_source, root ) ) as string
  html_title_source = await undefined_( html_title, await resolvers( html_title_source, html_title ) ) as string
  App_text_source = await undefined_( App_text, await resolvers( App_text_source, App_text ) ) as string

  set_source_map()

  if( !( await access( app_path ).catch( error => error ) instanceof Error ) )
    await rm( app_path, { recursive: true, force: true } ).catch( error => console.log( error ) )

  await mkdir( assets_path, { recursive: true } ).catch( error => console.log( error ) )

  source_map.forEach( async ( source_code: string, filename: string ): Promise<void> => {

    if( filename === 'assets' )
      await cp( favicon, `${assets_path}/favicon.ico` ).catch( error => console.log( error ) )
    else if( filename === 'tsconfig.json' ) {
      if ( await access( `${root_path}/${filename}` ).catch( error => error ) instanceof Error )
        await writeFile( `${root_path}/${filename}`, source_code )
      else await writeFile( `${root_path}/_${filename}`, source_code )

    }
    else if( filename === '.babelrc' ) {
      if ( await access( `${root_path}/${filename}` ).catch( error => error ) instanceof Error )
        await writeFile( `${root_path}/${filename}`, source_code )
      else await writeFile( `${root_path}/_${filename}`, source_code )

    }
    else if( filename === 'declarations.d.ts' ) {
      if ( await access( `${root_path}/${filename}` ).catch( error => error ) instanceof Error )
        await writeFile( `${root_path}/${filename}`, source_code )
      else await writeFile( `${root_path}/_${filename}`, source_code )

    }
    else
      await writeFile( `${app_path}/${filename}`, source_code ).catch( error => console.log( error ) )
  } )
}

function set_source_map(): void {

  source_map.set( 'App.tsx', `import styles from './App.css';
import type { Component } from 'solid-js';

const App: Component = () => {
  return (
    <>
    <div class={styles.App}>
      <header class={styles.header}>
        <span>${App_text_source}</span>
      </header>
    </div>
    </>
  );
};
export default App;
` )

  source_map.set( 'index.tsx', `import { render } from 'solid-js/web'

import App from './App'

const root = document.getElementById('${root_source}')

if (!(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  )
}

render(() => <App />, root)
` )

  source_map.set( 'index.html', `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="shortcut icon" type="image/ico" href="assets/favicon.ico" />
    <title>${html_title_source}</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="${root_source}"></div>

    <script src="index.tsx" type="module"></script>
    <script id="koorie-script">
      const webSocket = new WebSocket('ws://localhost:6553/')
      webSocket.onmessage = (event) => {
        console.log(event.data)
        setTimeout(() => {
          window.location.reload()
        }, 500)
      };
      webSocket.addEventListener("open", () => {
        console.log("koorie HLR connected")
      });
    </script>
  </body>
</html>

` )

  source_map.set( 'App.css', `.App {
  text-align: center;
}

.header {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
}
` )

  source_map.set( 'tsconfig.json', `{
  "compilerOptions": {
    "isolatedModules": true,
    "module": "ESNext",
    "target": "ESNext",
    "moduleResolution": "nodenext",
    "jsx": "preserve",
    "esModuleInterop": true,
    "allowJs": true,
    "lib": [
      "ES6",
      "DOM",
    ],
    "jsxImportSource": "solid-js",
    "allowSyntheticDefaultImports": true,
    "types": [
      "node",
      "solid-js",
      "solid-js/web"
    ]
  }
}
` )

  source_map.set( '.babelrc', `{
  "presets": [
    "babel-preset-solid"
  ]
}
` )

  source_map.set( 'declarations.d.ts', `declare module "*.css";
declare module "*.module.css";
declare module "*.ico";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
` )

}
