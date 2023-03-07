import { entry_point } from '@cli-dang/input'
import { koorie_solidjs_process } from './input/koorie-solidjs/koorie_solidjs_process'

export async function koorie_solidjs(){
  await entry_point( process.argv, koorie_solidjs_process )
}