import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), svgr()]
})
