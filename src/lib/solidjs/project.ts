import { object_, resolvers, undefined_ } from 'oftypes'

const project_json = new Map()

project_json.set( 'dependencies', {
  'solidjs': '^1.6.14',
  'koorie': '^2.0.0'
} )

project_json.set( 'devDependencies', {
  '@koorie/solidjs': '^1.0.0',
  'solid-devtools': '^0.27.3',
  'typescript': '^5.1.3',
} )

project_json.set( 'scripts', {
  'build' : 'npx ks build',
  'serve' : 'npx koorie spin-up --on-port=8080 --log-everything'
} )

export default async function project( data: ProjectArgs ):Promise<void>{

  await undefined_( data?.author, await resolvers( () => {
    project_json.set( 'author', {
      name: 'koorie',
      url: 'https://koorie.orbital.ooo',
      email: 'koorie@protonmail.com'
    } )
  }, async () => {
    await object_( data.author, await resolvers( () => {
      project_json.set( 'author', {
        name: data.author?.name ?? 'koorie',
        url: data.author?.url ?? 'https://koorie.orbital.ooo',
        email: data.author?.email ?? 'koorie@protonmail.com'
      } )

    }, () => { project_json.set( 'author', data.author ) } ) )
  } ) )

  await undefined_( data?.repository, await resolvers( () => {
    project_json.set( 'repository', {
      type: 'git',
      url: 'https://github.com/koorie/solidjs.git'
    } )
  }, async () => {
    await object_( data.repository, await resolvers( () => {
      project_json.set( 'repository', {
        type: data.repository?.type ?? 'git',
        url: data.repository?.url ?? 'https://github.com/koorie/solidjs.git'
      } )
    }, () => {project_json.set( 'repository', data.repository )} ) )
  } ) )

  await undefined_( data?.name, await resolvers( () => {
    project_json.set( 'name', 'koorie-solidjs' )
  }, async () => {

    project_json.set( 'name', data.name )

  } ) )

  await undefined_( data?.description, await resolvers( () => {
    project_json.set( 'description', 'Koorie server SolidJS' )
  }, async () => {

    project_json.set( 'description', data.description )

  } ) )

  await undefined_( data?.version, await resolvers( () => {
    project_json.set( 'version', '1.0.0' )
  }, async () => {

    project_json.set( 'version', data.version )

  } ) )

  await undefined_( data?.homepage, await resolvers( () => {
    project_json.set( 'homepage', 'https://koorie.orbital.ooo' )
  }, async () => {

    project_json.set( 'homepage', data.homepage )

  } ) )

  await undefined_( data?.keywords, await resolvers( () => {
    project_json.set( 'keywords', [
      'koorie',
      'server',
      'solidjs'
    ] )
  }, async () => {

    project_json.set( 'keywords', data.keywords )

  } ) )
}
