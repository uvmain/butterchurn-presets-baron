import { readdir } from 'node:fs/promises'
import { basename, extname } from 'node:path'

async function main() {
  console.log(`interface Presets {
  [key: string]: any
}

interface PresetPaths {
  [key: string]: string
}

export const presets: Presets = {}

interface GetPresetOptions {
  name?: string
  random?: boolean
  count?: number
}

const presetPaths: PresetPaths = {`)

  const files = await readdir('./src/presets')

  for (const file of files) {
    if (extname(file) !== '.json') {
      continue
    }

    console.log(`  '${basename(file, '.json')}': './presets/${file}',`)
  }

  console.log(`}

export async function getPresets(options?: GetPresetOptions): Promise<Presets> {
  const { name, random } = options || {}
  let count: number | undefined = options?.count
  if (count !== undefined && (typeof count !== 'number' || count < 1)) {
    throw new Error('Invalid count')
  }
  else if (count !== undefined && count > Object.keys(presetPaths).length) {
    count = Object.keys(presetPaths).length
  }

  if (name) {
    const presetData = await import(presetPaths[name])
    return { [name]: presetData }
  }

  const presetNames = Object.keys(presetPaths)

  if (random) {
    const shuffled = [...presetNames].sort(() => Math.random() - 0.5)
    const selectedNames = count ? shuffled.slice(0, count) : shuffled
    const result: Presets = {}
    for (const name of selectedNames) {
      result[name] = await import(presetPaths[name])
    }
    return result
  }
  else {
    const result: Presets = {}
    for (const name of count ? presetNames.slice(0, count) : presetNames) {
      result[name] = await import(presetPaths[name])
    }
    return result
  }
}`)
}

main().catch(console.error)
