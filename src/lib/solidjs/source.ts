import { cp, mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolvers, undefined_ } from 'oftypes'

const favicon: string = `${dirname( fileURLToPath( import.meta.url ) )}/assets/favicon.ico`
const source_map: Map<string, string> = new Map()
const app_path: string = `${process.cwd()}/app`
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

  await mkdir( assets_path, { recursive: true } ).catch( error => console.log( error ) )

  source_map.forEach( async ( source_code: string, filename: string ): Promise<void> => {

    if( filename === 'assets' )
      await cp( favicon, `${assets_path}/favicon.ico` ).catch( error => console.log( error ) )
    else
      await writeFile( `${app_path}/${filename}`, source_code ).catch( error => console.log( error ) )
  } )
}

function set_source_map(): void{

  console.log( App_text_source )
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

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
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
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "jsx": "preserve",
    "jsxImportSource": "solid-js",
    "types": ["vite/client"],
    "noEmit": true,
    "isolatedModules": true
  }
}
` )
}
