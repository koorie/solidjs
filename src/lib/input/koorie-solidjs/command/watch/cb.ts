import { FSWatcher, watch } from 'chokidar'
import { Dang } from '@cli-dang/decors'
import { spawn } from 'node:child_process'

const app_path = `${process.cwd()}/app`
export default async function cb( data: Input.ParsedArgv ):Promise<void>{

  const watcher: FSWatcher = watch( app_path, {
    ignoreInitial: true,
    interval: 0,
    awaitWriteFinish:{
      stabilityThreshold: 0
    }
  } ).on( 'add', async () => {
    await run_vite( data )
  } ).on( 'change', async () => {
    await run_vite( data )
  } ).on( 'unlink',  async () => {
    await run_vite( data )
  } )

  watcher.on( 'ready', () => {
    process.stdout.write( Dang.underline( `ks -> watching [${Dang.white( 'app' )}] \n` ) )
  } )
}

async function run_vite( data: Input.ParsedArgv ){
  // @ts-ignore: @to-fix
  const conf: string = data.flag?.[ '--config' ] ?? `${process.cwd()}/node_modules/@koorie/solidjs/vite.config.ts`

  spawn( 'node_modules/.bin/vite', [ '--emptyOutDir', '--config', conf, 'build' ], {
    stdio: [ 'ignore', 'inherit', 'inherit' ]
  } )
}
