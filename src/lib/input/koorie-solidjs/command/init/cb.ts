import source from '../../../../solidjs/source.js'
import { resolvers, undefined_ } from 'oftypes'

export default async function cb( data: Input.ParsedArgv ):Promise<void>{

  const truthy  = () => {/**/}
  const falsy = () => {
    source()
  }

  // @ts-ignore: @to-fix
  await undefined_( data.flag?.[ '--bare' ], await resolvers( truthy, falsy ) )
}
