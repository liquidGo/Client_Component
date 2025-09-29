import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

/**
 * Vite 配置文件 - 支持多模式构建
 * 
 * 构建模式说明：
 * - library: 构建组件库 (npm run build:lib)
 * - demo: 构建演示应用 (npm run build:demo)
 * - default: 开发模式 (npm run dev)
 */
export default defineConfig(({ mode }) => {
  // 判断构建模式
  const isLibrary = mode === 'library'  // 组件库构建模式
  const isDemo = mode === 'demo'        // 演示应用构建模式
  
  // ==================== 组件库构建模式 ====================
  // 命令: npm run build:lib
  // 输出: dist/ 目录 (用于发布到npm)
  if (isLibrary) {
    return {
      plugins: [react()],
      build: {
        // 库构建配置
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),  // 入口文件
          name: 'JinyouyuUI',                        // 全局变量名
          fileName: 'index',                         // 输出文件名
          formats: ['es']                           // 只输出ES模块格式
        },
        rollupOptions: {
          // 外部依赖 - 不打包到组件库中
          external: ['react', 'react-dom', 'antd', 'dayjs', '@ant-design/icons'],
          output: {
            // 全局变量映射 (用于script标签引入)
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'antd': 'antd',
              'dayjs': 'dayjs',
              '@ant-design/icons': 'icons'
            }
          }
        },
        cssCodeSplit: false,  // CSS不分割，打包成单个文件
        sourcemap: true       // 生成sourcemap文件
      }
    }
  }
  
  // ==================== 演示应用构建模式 ====================
  // 命令: npm run build:demo
  // 输出: dist-demo/ 目录 (可预览的HTML页面)
  if (isDemo) {
    return {
      plugins: [react()],
      base: './',                    // 🔑 关键：使用相对路径，解决白屏问题
      build: {
        outDir: 'dist-demo',         // 输出目录
        sourcemap: true,            // 生成sourcemap
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html')  // 从HTML文件开始构建
          }
        }
      },
      css: {
        preprocessorOptions: {
          less: {
            javascriptEnabled: true,  // 启用Less的JavaScript功能
          },
        },
      },
    }
  }
  
  // ==================== 默认构建模式 (开发模式) ====================
  // 命令: npm run dev
  // 用途: 开发调试，热重载
  return {
    plugins: [react()],
    build: {
      outDir: 'dist-demo',    // 默认输出目录
      sourcemap: true         // 生成sourcemap
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,  // 开发时也支持Less
        },
      },
    },
  }
})
