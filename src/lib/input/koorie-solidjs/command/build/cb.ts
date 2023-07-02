import { spawn } from 'node:child_process'

export default async function cb( data: Input.ParsedArgv ):Promise<void>{

  // @ts-ignore: @to-fix
  const conf: string = data.flag?.[ '--config' ] ?? `${process.cwd()}/node_modules/@koorie/solidjs/vite.config.ts`

  spawn( 'node_modules/.bin/vite', [ '--emptyOutDir', '--config', conf, 'build' ], {
    stdio: [ 'ignore', 'inherit', 'inherit' ]
  } )

}
