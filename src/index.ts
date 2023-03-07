#!/usr/bin/env -S node --experimental-json-modules --experimental-import-meta-resolve --trace-warnings --no-warnings
import { koorie_solidjs } from './lib/entry_point'

process.argv.splice( 0, 2 )
process.title = 'koorie-solidjs'

await koorie_solidjs()