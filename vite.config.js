import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import esbuild from 'esbuild'

// Custom plugin: lets plain .js files inside src/ contain JSX syntax,
// by running them through esbuild's JSX transform before anything else
// touches them. This is what allows components to live in .js files
// instead of requiring the .jsx extension.
function jsxInJsFiles() {
  return {
    name: 'jsx-in-js-files',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.includes('/src/') || !id.endsWith('.js')) return null
      const result = await esbuild.transform(code, {
        loader: 'jsx',
        jsx: 'automatic',
        jsxImportSource: 'react',
        sourcefile: id,
      })
      return { code: result.code, map: null }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [jsxInJsFiles(), react()],
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
})
