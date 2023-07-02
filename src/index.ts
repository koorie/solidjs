#!/usr/bin/env -S node --experimental-import-meta-resolve --no-warnings
import { koorie_solidjs } from './lib/entry_point.js'

process.title = 'koorie-solidjs'

await koorie_solidjs()
