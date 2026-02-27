import { access, readdir, rename, stat } from 'node:fs/promises'
import { join } from 'node:path'

const DIR = './src/presets'

async function exists(path) {
  try {
    await access(path)
    return true
  }
  catch {
    return false
  }
}

async function main() {
  const files = await readdir(DIR)

  for (const file of files) {
    const fullPath = join(DIR, file)
    const fileStat = await stat(fullPath)

    if (!fileStat.isFile()) {
      continue
    }

    // use regex to keep it aA-zZ0-9.-_ and replace others with _
    // eslint-disable-next-line regexp/prefer-w
    const encodedName = file.replace(/[^A-Z0-9.\- _]/gi, '_')

    if (encodedName === file) {
      continue
    }

    const newPath = join(DIR, encodedName)

    if (await exists(newPath)) {
      console.warn(`Skipping (target exists): ${file}`)
      continue
    }

    await rename(fullPath, newPath)
    console.log(`Renamed: ${file} -> ${encodedName}`)
  }
}

main().catch(console.error)
