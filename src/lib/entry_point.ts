import { entry_point } from '@cli-dang/input'
import { koorie_solidjs_process } from './input/koorie-solidjs/koorie_solidjs_process.js'

export async function koorie_solidjs(){
  await entry_point( process.argv, koorie_solidjs_process )
    .catch( error => {
      process.stderr.write( error.message )
      process.exit( 1 )
    } )
}
