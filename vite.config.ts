import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLibrary = mode === 'library'
  
  if (isLibrary) {
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'CompoComponent',
          fileName: 'index',
          formats: ['es']
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM'
            }
          }
        },
        cssCodeSplit: false,
        sourcemap: true
      }
    }
  }
  
  return {
    plugins: [react()],
    build: {
      outDir: 'dist-demo',
      sourcemap: true
    }
  }
})
