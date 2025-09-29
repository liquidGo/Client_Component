# React组件库搭建文档

本文档详细记录了如何使用Vite搭建一个现代化的React组件库的完整过程。

## 环境准备

```bash
# 检查Node.js版本（需要20.19+或22.12+）
node --version
```

```bash
# 如果版本过低，使用nvm安装并切换Node.js版本
nvm install 20.19.5
```

```bash
# 切换到Node.js 20.19.5
nvm use 20.19.5
```

## 项目初始化

```bash
# 使用Vite创建React TypeScript项目
npm create vite@latest . -- --template react-ts
```

```bash
# 安装项目依赖
npm install
```

## 配置组件库构建

```bash
# 安装Less预处理器
npm install --save-dev less
```

```bash
# 安装Node.js类型定义
npm install --save-dev @types/node
```

## 项目结构创建

```bash
# 创建组件目录
mkdir src\components
```

```bash
# 创建样式目录
mkdir src\styles
```

## 开发环境测试

```bash
# 启动开发服务器
npm run dev
```

```bash
# 类型检查
npm run type-check
```

```bash
# 代码检查
npm run lint
```

## 构建测试

```bash
# 构建演示应用
npm run build
```

```bash
# 构建组件库
npm run build:lib
```

```bash
# 预览构建结果
npm run preview
```

## 文件结构

```
src/
├── components/          # 组件源码
│   ├── Button.tsx      # Button组件
│   ├── Button.less     # Button样式
│   ├── Input.tsx       # Input组件
│   ├── Input.less      # Input样式
│   ├── Card.tsx        # Card组件
│   └── Card.less       # Card样式
├── styles/             # 全局样式
│   └── index.less      # 全局Less文件
├── index.ts            # 组件库入口
├── App.tsx             # 演示应用
├── App.css             # 演示应用样式
└── main.tsx            # 应用入口
```

## 关键配置文件

### package.json
- 配置组件库的入口文件和导出
- 设置构建脚本
- 定义依赖关系

### vite.config.ts
- 配置Vite构建选项
- 支持组件库和演示应用两种构建模式
- 配置外部依赖和打包选项

### tsconfig.json
- TypeScript编译配置
- 类型检查设置

## 组件开发流程

1. **创建组件文件**：在`src/components/`目录下创建`.tsx`文件
2. **创建样式文件**：创建对应的`.less`文件
3. **定义接口**：使用TypeScript定义组件Props接口
4. **实现组件**：编写React组件逻辑
5. **编写样式**：使用Less编写组件样式
6. **导出组件**：在`src/index.ts`中导出组件和类型
7. **测试组件**：在`src/App.tsx`中添加演示代码

## 样式系统

- 使用Less预处理器
- 定义全局变量和混入
- 支持主题定制
- 响应式设计
- 无障碍支持

## 构建输出

- **演示应用**：`dist-demo/`目录
- **组件库**：`dist/`目录
  - `index.js`：组件库主文件
  - `index.css`：样式文件
  - `index.d.ts`：TypeScript类型定义

## 发布准备

```bash
# 构建组件库
npm run build:lib
```

```bash
# 检查构建结果
ls dist/
```

```bash
# 发布到npm（需要先登录）
npm publish
```

## 开发建议

1. **组件设计**：遵循单一职责原则，保持组件简单
2. **类型安全**：充分利用TypeScript的类型系统
3. **样式规范**：使用Less变量和混入保持样式一致性
4. **文档完善**：为每个组件编写详细的JSDoc注释
5. **测试覆盖**：编写单元测试和集成测试
6. **版本管理**：使用语义化版本控制

## 常见问题

### Node.js版本问题
- 确保使用Node.js 20.19+或22.12+
- 使用nvm管理Node.js版本

### 构建失败
- 检查TypeScript类型错误
- 确保所有依赖已正确安装
- 检查Vite配置是否正确

### 样式问题
- 确保Less文件正确导入
- 检查CSS变量定义
- 验证样式优先级

## 扩展功能

- 添加Storybook进行组件文档化
- 集成Jest进行单元测试
- 添加ESLint和Prettier进行代码规范
- 配置CI/CD自动化流程
- 添加国际化支持
