export {}

declare global {
  type SemVersion = string
  type projectName = string
  type projectVersion = string
  type projectAuthor = {name: string, email?:string, url?:string}
  type projectDescription = string
  type projectDependencies = {
    solidjs: SemVersion
    koorie: SemVersion
    [prop: string]: SemVersion
  }
  type projectDevDependencies = {
    '@koorie/solidjs' : SemVersion
    [prop: string]: SemVersion
  }
  type projectScripts = {
    build: string
    serve: string
    [prop: string]: string
  }
  type projectHomepage = string
  type projectRepository = {url: string, type: string}
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
