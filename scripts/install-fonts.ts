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
      error instanceof Error ? error.message : error,
    )
    process.exit(1)
  }
}

// Execute the function
installNotoSansFont().catch(console.error)
