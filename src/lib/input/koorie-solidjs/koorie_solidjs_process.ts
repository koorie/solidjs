import {
  build_cb,
  init_cb,
  init_description_text,
  init_usage_text,
  watch_cb
} from '../exports.js'
import { Command } from '@cli-dang/input'

export async function koorie_solidjs_process( parsed: Input.ParsedArgv ) {

  const KoorieSolidJS: Command = new Command( parsed )

  /**** INIT COMMAND ****/
  KoorieSolidJS.define( 'init', init_cb as Input.CommandCallBack, {
    description:init_description_text,
    usage: init_usage_text
  } )

  /**** BUILD COMMAND ****/
  KoorieSolidJS.define( 'build', build_cb as Input.CommandCallBack )

  /**** --PRODUCTION FLAG ****/
  await KoorieSolidJS.flag( [ '--production' ], {
    short: '--production',
    void: false,
    check: true,
    type: 'string',
    cb: () => {
      return true
    }
  } )

  /**** --WATCH COMMAND FLAG ****/
  KoorieSolidJS.define( '--watch',
    watch_cb as Input.CommandCallBack, {
      description: 'Watch for changes and rebuild as needed',
      usage: 'ks --watch'
    } )

  await KoorieSolidJS.intercept()
}
