import { directoryImport } from 'directory-import'

interface Presets {
  [key: string]: any
}

const presets: Presets = {}

directoryImport('./presets', (moduleName, modulePath, moduleData) => {
  presets[moduleName] = moduleData
})

function getPresets(): Presets {
  return presets
}

export { getPresets }
