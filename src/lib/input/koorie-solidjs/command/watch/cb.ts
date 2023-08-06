import { Parcel } from '@parcel/core'
import { inspect } from 'util'

const app_path = `${process.cwd()}/app`
export default async function cb():Promise<void>{

  const bundler = new Parcel( {
    entries: `${app_path}/index.html`,
    defaultConfig: '@parcel/config-default',
    defaultTargetOptions: {
      distDir: 'public',
    }
  } )

  await bundler.watch( ( err, event ) => {
    if ( err ) {
      // Fatal error
      throw err
    }

    if ( event.type === 'buildSuccess' ) {
      const bundles = event.bundleGraph.getBundles()
      console.log( `✨ Built ${bundles.length} bundles in ${event.buildTime}ms!` )
    } else if ( event.type === 'buildFailure' ) {
      console.log( inspect( event, {
        depth: Infinity,
        colors: true,
        showHidden: true
      } ) )
    }

  } )
}
