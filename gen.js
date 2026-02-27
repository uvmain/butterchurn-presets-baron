import { readdir } from 'node:fs/promises'
import { basename, extname } from 'node:path'

async function main() {
  console.log(`interface Presets {
  [key: string]: any
}

export const presets: Presets = {}

interface GetPresetOptions {
  name?: string
  random?: boolean
  count?: number
}

export function getPresets(options: GetPresetOptions): Presets {
  const { name, random, count } = options
  if (name) {
    return { [name]: presets[name] }
  }

  if (random) {
    const array = Object.entries(presets)
    let currentIndex = array.length
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }
    if (count && count < array.length) {
      return array
        .slice(0, count)
        .reduce((acc: Presets, [key, value]) => {
          acc[key] = value
          return acc
        }, {})
    }
    else {
      return array.reduce((acc: Presets, [key, value]) => {
        acc[key] = value
        return acc
      }, {})
    }
  }
  else {
    if (count && count < Object.keys(presets).length) {
      return Object.entries(presets)
        .slice(0, count)
        .reduce((acc: Presets, [key, value]) => {
          acc[key] = value
          return acc
        }, {})
    }
    else {
      return presets
    }
  }
}
`)

  const files = await readdir('./src/presets')

  for (const file of files) {
    if (extname(file) !== '.json') {
      continue
    }

    console.log(`presets['${basename(file, '.json')}'] = await import('./presets/${file}')`)
  }
}

main().catch(console.error)
