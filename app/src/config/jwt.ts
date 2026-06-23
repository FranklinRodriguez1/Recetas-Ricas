import fs from 'fs'
import path from 'path'

function readEnvFile(filePath: string) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const lines = content.split(/\r?\n/)
    for (const line of lines) {
      const m = line.match(/^\s*JWT_SECRET\s*=\s*(.+)\s*$/)
      if (m) return m[1].trim()
    }
  } catch {}
  return null
}

export function getJwtSecret(): string {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET
  // Try project root .env then app/.env
  const rootEnv = path.resolve(process.cwd(), '.env')
  const appEnv = path.resolve(process.cwd(), 'app', '.env')
  const fromRoot = readEnvFile(rootEnv)
  if (fromRoot) return fromRoot
  const fromApp = readEnvFile(appEnv)
  if (fromApp) return fromApp
  return 'change_this_secret'
}

export default { getJwtSecret }
