import { writeFile } from 'node:fs/promises'
import { access } from 'fs/promises'

type ProjectJsonEntries = Map<string, {[prop:string]:string}|string|string[]>


export default async function project():Promise<void>{
  const project_json: ProjectJsonEntries = new Map()

  project_json.set( 'name', 'koorie-solidjs' )
  project_json.set( 'description', 'Koorie server SolidJS' )
  project_json.set( 'version', '1.0.0' )
  project_json.set( 'type', 'module' )
  project_json.set( 'dependencies', {
    '@solidjs/router': '^0.8.2',
    'koorie': '^2.0.0',
    'solid-js': '^1.6.14'
  } )
  project_json.set( 'devDependencies', {
    '@koorie/solidjs': '^1.0.0',
    'typescript': '^5.1.3',
  } )
  project_json.set( 'scripts', {
    'build' : 'npx ks build',
    'watch' : 'npx ks --watch',
    'dev'   : 'npx koorie spin-up --on-port=8080 --log-everything --to-index-html --hot-live-reloading',
    'serve' : 'npx koorie spin-up --on-port=8080 --log-everything --to-index-html',
  } )
  project_json.set( 'keywords', [
    'koorie',
    'server',
    'solidjs'
  ] )
  project_json.set( 'homepage', 'https://koorie.orbital.ooo' )
  project_json.set( 'author', {
    name: 'koorie',
    url: 'https://koorie.orbital.ooo',
    email: 'koorie@protonmail.com'
  } )

  project_json.set( 'repository', {
    type: 'git',
    url: 'https://github.com/koorie/solidjs.git'
  } )
  let package_json_path = `${process.cwd()}/package.json`
  if( ! ( await access( package_json_path ).catch( error => error ) instanceof Error ) )
    package_json_path = `${process.cwd()}/koorie_package.json`

  await writeFile( package_json_path, JSON.stringify( Object.fromEntries( project_json ), null, 2 ) )
}
