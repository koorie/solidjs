import {
  bare_cb,
  build_cb,
  init_cb,
  init_description_text,
  init_usage_text
} from '../exports.js'
import { Command } from '@cli-dang/input'

export async function koorie_solidjs_process( parsed: Input.ParsedArgv ) {

  const KoorieSolidJS: Command = new Command( parsed )

  KoorieSolidJS.define( 'init', init_cb as Input.CommandCallBack, {
    description:init_description_text,
    usage: init_usage_text
  } )

  await KoorieSolidJS.flag( [ '--bare' ], {
    short: '--bare',
    cb: bare_cb,
    void: true,
    check: true
  } )

  KoorieSolidJS.define( 'build', build_cb as Input.CommandCallBack )

  await KoorieSolidJS.flag( [ '--config' ], {
    short: '--config',
    void: false,
    check: true,
    type: 'string',
    cb: ( data: string ) => {
      return data
    }
  } )
  await KoorieSolidJS.intercept()
}
