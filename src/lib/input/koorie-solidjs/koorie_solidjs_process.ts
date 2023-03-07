import {
  bare_cb,
  build_cb,
  init_cb,
  init_description_text,
  init_usage_text
} from '../exports'
import { Command } from '@cli-dang/input'

export async function koorie_solidjs_process( parsed ) {

  const KoorieSolidJS = new Command()

  KoorieSolidJS.define( '--version', async (): Promise<void> => {
    const version = await ( await import( `${process.cwd()}/package.json`, { assert: { type: 'json' } } ) ).default.version
    process.stdout.write( `${version}\n` )
  } )

  KoorieSolidJS.define( 'init', init_cb as CommandCallBack, {
    description:init_description_text,
    usage: init_usage_text
  } )

  await KoorieSolidJS.flag( [ '--bare' ], {
    short: '--bare',
    cb: bare_cb as FlagsCallBack,
    void: true,
    check: true
  } )

  KoorieSolidJS.define( 'build', build_cb as CommandCallBack )

  await KoorieSolidJS.intercept( parsed )
}