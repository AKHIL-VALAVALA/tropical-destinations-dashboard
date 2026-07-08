import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import esbuild from 'esbuild'

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

      return {
        code: result.code,
        map: null,
      }
    },
  }
}

export default defineConfig({
  base: '/tropical-destinations-dashboard/',

  plugins: [jsxInJsFiles(), react()],

  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
