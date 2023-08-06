import { Parcel } from '@parcel/core'
import Parser from 'node-html-parser'
import { readFile, writeFile } from 'node:fs/promises'
import { inspect } from 'util'

const app_path = `${process.cwd()}/app`
export default async function cb( data: Input.ParsedArgv ):Promise<void>{

  // @ts-ignore: @to-fix
  if( data.flag_returns?.[ '--production' ] ) {
    const index_html = await readFile( `${app_path}/index.html`, 'utf-8' )
    const DOM = Parser.parse( index_html )

    DOM.getElementById( 'koorie-script' ).remove()
    await writeFile( `${app_path}/index.html`, DOM.toString() )
  }

  const bundler = new Parcel( {
    entries: `${app_path}/index.html`,
    defaultConfig: '@parcel/config-default',
    defaultTargetOptions: {
      distDir: 'public',
    }
  } )

  try {
    const { bundleGraph, buildTime } = await bundler.run()
    const bundles = bundleGraph.getBundles()
    console.log( `✨ Built ${bundles.length} bundles in ${buildTime}ms!` )
  } catch ( err ) {
    console.log( inspect( err, {
      depth: Infinity,
      colors: true,
      showHidden: true
    } ) )
  }

}
