import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const codespaceName = env.VITE_CODESPACE_NAME || process.env.CODESPACE_NAME || ''

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_CODESPACE_NAME': JSON.stringify(codespaceName),
    },
  }
})
