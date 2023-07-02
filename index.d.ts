export {}

declare global {
  type SemVersion = string
  type projectName = string
  type projectVersion = string
  type projectAuthor = {name: string, email?:string, url?:string} & unknown
  type projectDescription = string
  type projectDependencies = {
    solidjs: SemVersion
    koorie: SemVersion
    [package_name: string]: SemVersion
  }
  type projectDevDependencies = {
    '@koorie/solidjs' : SemVersion
    [package_name : string]: SemVersion
  }
  type projectScripts = {
    build: string
    serve: string
    [command: string]: string
  }
  type projectHomepage = string
  type projectRepository = {url: string, type: string} & unknown
  type projectKeywords = string[]
  type ProjectArgs = {
    name: projectName,
    version: projectVersion,
    author: projectAuthor
    description: projectDescription
    dependencies: projectDependencies
    devDependencies: projectDevDependencies
    scripts: projectScripts
    homepage: projectHomepage,
    repository: projectRepository
    keywords: projectKeywords
  }
  namespace koorie_solidjs {
    type cb_argument = { [object:string]: object|never } & string & number & boolean & never
  }
}