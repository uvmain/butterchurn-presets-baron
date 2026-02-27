# butterchurn-presets-baron

A collection of [Butterchurn](https://github.com/jberg/butterchurn) / MilkDrop preset JSON files, distributed as an npm package.

## Installation

```sh
npm install butterchurn-presets-baron
```

## Usage

```js
const presets = require('butterchurn-presets-baron');

// presets is an object where keys are preset names and values are preset objects
// e.g. butterchurn.loadPreset(presets['My Preset Name'], 0.0);
```

## Adding Presets

Place `.json` preset files in the `presets/` directory and add an entry to `index.js`:

```js
presets["My Preset Name"] = require("./presets/my-preset-name.json");
```