import source from '../../../../solidjs/source.js'
import { resolvers, undefined_ } from 'oftypes'
import project from '../../../../solidjs/project.js'
import { spawn } from 'node:child_process'
import ncu from 'npm-check-updates'

export default async function cb( data: Input.ParsedArgv ):Promise<void>{

  // @ts-ignore: @to-fix
  await undefined_( data.flag?.[ '--bare' ], await resolvers( bare, init ) )
}

function bare(){/**/}

async function init(): Promise<void>{
  await project()
  source()

  console.log( '✨ Created directories structure and initialize project' )
  console.log( '📦 Updating dependencies in package.json to latest version' )

  const upgraded = await ncu.run( {
    packageFile: `${process.cwd()}/package.json`,
    upgrade: true,
    // Defaults:
    // JsonUpgraded: true,
    // Silent: true,
  } )

  console.log( `✨ upgrade happened`, upgraded )

  const npm_child = spawn( 'npm', [ 'install', '--silent' ], { stdio: [ 'ignore', 'inherit', 'inherit' ] } )

  npm_child.on( 'spawn', () => {
    console.log( '📦 Installing dependencies' )
  } )

  npm_child.on( 'error', error => {
    console.error( '❌ Error installing dependencies' )
    console.trace( error )
  } )

  npm_child.on( 'exit', code => {
    if ( code === 0 )
      console.log( '✨ Dependencies installed' )
    else console.log( '❌ Error installing dependencies' )
  } )

}
