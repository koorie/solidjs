import { Parcel } from '@parcel/core'

const app_path = `${process.cwd()}/app`
export default async function cb():Promise<void>{

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
    console.log( err.diagnostics )
  }

}
