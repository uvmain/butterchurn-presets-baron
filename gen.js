import { readdir } from 'node:fs/promises'
import { basename, extname } from 'node:path'

async function main() {
  console.log(`interface Presets {
  [key: string]: any
}

export const presets: Presets = {}

export function getPresets(): Presets {
  return presets
}
`)

  const files = await readdir('./src/presets')

  for (const file of files) {
    if (extname(file) !== '.json') {
      continue
    }

    console.log(`presets['${basename(file, '.json').replaceAll(`'`, `\\'`)}'] = await import('./presets/${file.replaceAll(`'`, `\\'`)}')`)
  }
}

main().catch(console.error)
