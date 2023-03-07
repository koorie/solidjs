import { resolvers, undefined_ } from 'oftypes'

export default async function cb<cb> ( data:ParsedArgv ):Promise<void>{

  const truthy  = true
  const falsy = async () => false

  console.trace( await undefined_( data.flag?.[ '--bare' ], await resolvers( truthy, falsy ) ) )
}