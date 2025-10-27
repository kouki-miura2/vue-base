[README TOP](./README.md)

# Step5 : WebFont

Instruction for setup WebFont after step4.

## 1. Add Node types

```sh
pnpm add -D @types/node
```

## 2. Edit package.json

Before

```json
{
  "name": "foo",
  "version": "0.0.1",
  "scripts": {
    "build": "run-p type-check build-only",
    "build-only": "vite build",
    "dev": "vite",
    "type-check": "vue-tsc --build"
  },
  "packageManager": "pnpm@10.14.0",
  "devDependencies": {
    "@types/node": "^24.9.1",
    "@vitejs/plugin-vue": "^6.0.1",
    "@vue/tsconfig": "^0.8.1",
    "npm-run-all2": "^8.0.4",
    "typescript": "^5.9.2",
    "unplugin-vue-router": "^0.16.0",
    "vite": "^7.1.2",
    "vue-tsc": "^3.1.2"
  },
  "dependencies": {
    "@mdi/font": "^7.4.47",
    "vue": "^3.5.22",
    "vue-router": "^4.6.3",
    "vuetify": "^3.10.7"
  }
}
```

After

```json
{
  "name": "foo",
  "version": "0.0.1",
  "scripts": {
    "install-fonts": "node --experimental-strip-types scripts/install-fonts.ts",
    "prebuild": "pnpm install-fonts",
    "build": "run-p type-check build-only",
    "build-only": "vite build",
    "predev": "pnpm install-fonts",
    "dev": "vite",
    "type-check": "vue-tsc --build"
  },
  "packageManager": "pnpm@10.14.0",
  "devDependencies": {
    "@types/node": "^24.9.1",
    "@vitejs/plugin-vue": "^6.0.1",
    "@vue/tsconfig": "^0.8.1",
    "npm-run-all2": "^8.0.4",
    "typescript": "^5.9.2",
    "unplugin-vue-router": "^0.16.0",
    "vite": "^7.1.2",
    "vue-tsc": "^3.1.2"
  },
  "dependencies": {
    "@mdi/font": "^7.4.47",
    "vue": "^3.5.22",
    "vue-router": "^4.6.3",
    "vuetify": "^3.10.7"
  }
}
```

## 3. Add & Edit files

| No. | Add/Edit | File                           | Description                          |
| --: | -------- | ------------------------------ | ------------------------------------ |
|   1 | Add      | scripts/install-fonts.ts       | The script called when dev or build. |
|   2 | Add      | src/assets/fonts/noto-sans.css | CSS of Noto sans font.               |
|   3 | Edit     | src/assets/main.css            | Use NotoSans font.                   |

### scripts/install-fonts.ts

```ts
import { existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { execSync } from 'child_process'

const FONTS_DIR = join(process.cwd(), 'src', 'assets', 'fonts')
const NOTO_SANS_DIR = join(FONTS_DIR, 'noto-sans')
const FONT_FILE = join(NOTO_SANS_DIR, 'NotoSans-Regular.ttf')
const FONT_URL =
  'https://github.com/googlefonts/noto-fonts/raw/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf'

async function installNotoSansFont(): Promise<void> {
  if (existsSync(FONT_FILE)) {
    console.log('✓ Noto Sans font already installed.')
    return
  }

  console.log('📦 Installing Noto Sans font...')

  try {
    // Create directory if it doesn't exist
    if (!existsSync(NOTO_SANS_DIR)) {
      mkdirSync(NOTO_SANS_DIR, { recursive: true })
    }

    // Download font using curl with proper options
    const command = `curl -L -A "Mozilla/5.0" -o "${FONT_FILE}" "${FONT_URL}"`
    execSync(command, {
      stdio: 'inherit',
      cwd: process.cwd(),
    })

    // Verify download
    if (!existsSync(FONT_FILE)) {
      throw new Error('Font file was not created')
    }

    console.log('✓ Noto Sans font installed successfully.')
  } catch (error) {
    console.error(
      '❌ Failed to install Noto Sans font:',
      error instanceof Error ? error.message : error
    )
    process.exit(1)
  }
}

// Execute the function
installNotoSansFont().catch(console.error)
```

src/assets/fonts/noto-sans.css

```css
@font-face {
  font-family: 'Noto Sans';
  src: url('./noto-sans/NotoSans-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

src/assets/main.css

Before

```css
body {
  font-family: sans-serif;
  font-size: 1em;
}
```

After

```css
@import './fonts/noto-sans.css';

body {
  font-family: 'Noto Sans';
  font-size: 1em;
}
```

## 4. Start vite server

```sh
pnpm dev
```

Script start installing Noto Sans font before start vite server.  
And then installed font in ./src/assets/fonts/noto-sans.

terminal output is...

```sh
📦 Installing Noto Sans font...
```

## 5. Stop vite server & build

Input Ctrl+C for stop vite server.  
Build command output modules to dist dir.  
If you watn to deploy to a directory other than /, you neet to set the base property in vite.config.ts before build.

e.g. case deploy to /myapp

vite.config.ts

```ts
...
  base: '/myapp',
...
```

Build

```sh
pnmm build
```

Script start installing Noto Sans font before start build.  
But when aleready installed font, terminal ouput is...

```sh
✓ Noto Sans font already installed.
```
