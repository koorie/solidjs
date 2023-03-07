import { spawn } from 'node:child_process'

export default async function cb<cb> ():Promise<void>{

  const conf = `${process.cwd()}/node_modules/@koorie/solidjs/vite.config.js`

  spawn( 'node_modules/.bin/vite', [ '--config', conf, 'build' ], {
    stdio: [ 'ignore', 'inherit', 'inherit' ]
  } )

}