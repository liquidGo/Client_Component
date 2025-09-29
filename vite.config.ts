import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLibrary = mode === 'library'
  const isDemo = mode === 'demo'
  
  if (isLibrary) {
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'JinyouyuUI',
          fileName: 'index',
          formats: ['es']
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'antd', 'dayjs', '@ant-design/icons'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'antd': 'antd',
              'dayjs': 'dayjs',
              '@ant-design/icons': 'icons'
            }
          }
        },
        cssCodeSplit: false,
        sourcemap: true
      }
    }
  }
  
  if (isDemo) {
    return {
      plugins: [react()],
      base: './',
      build: {
        outDir: 'dist-demo',
        sourcemap: true,
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html')
          }
        }
      },
      css: {
        preprocessorOptions: {
          less: {
            javascriptEnabled: true,
          },
        },
      },
    }
  }
  
  return {
    plugins: [react()],
    build: {
      outDir: 'dist-demo',
      sourcemap: true
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  }
})
