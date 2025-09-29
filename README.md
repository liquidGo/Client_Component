# Compo Component Library

一个基于React和TypeScript的现代组件库，使用Vite构建。

## 特性

- 🚀 基于React 19和TypeScript
- 📦 使用Vite进行快速构建
- 🎨 现代化的设计系统
- 📱 响应式设计
- ♿ 无障碍支持
- 🎯 完整的TypeScript类型定义
- 🔧 可定制的主题变量

## 安装

```bash
npm install @compo/component
```

## 快速开始

```tsx
import React from 'react'
import { Button, Input, Card } from '@compo/component'
import '@compo/component/style.css'

function App() {
  return (
    <div>
      <Button variant="primary" size="medium">
        点击我
      </Button>
      
      <Input 
        label="用户名"
        placeholder="请输入用户名"
        required
      />
      
      <Card title="卡片标题" size="medium">
        <p>卡片内容</p>
      </Card>
    </div>
  )
}

export default App
```

## 组件

### Button 按钮

基础按钮组件，支持多种变体和尺寸。

```tsx
<Button variant="primary" size="medium" onClick={handleClick}>
  按钮文本
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'small' | 'medium' | 'large'
- `disabled`: boolean
- `onClick`: (event: React.MouseEvent<HTMLButtonElement>) => void

### Input 输入框

表单输入组件，支持标签、验证和帮助文本。

```tsx
<Input
  label="邮箱"
  type="email"
  placeholder="请输入邮箱"
  error="请输入有效的邮箱地址"
  required
/>
```

**Props:**
- `type`: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
- `size`: 'small' | 'medium' | 'large'
- `label`: string
- `error`: string
- `helpText`: string
- `disabled`: boolean
- `readOnly`: boolean
- `required`: boolean

### Card 卡片

容器组件，用于展示相关内容。

```tsx
<Card 
  title="卡片标题" 
  subtitle="副标题"
  variant="elevated"
  size="medium"
  clickable
  onClick={handleCardClick}
>
  <p>卡片内容</p>
</Card>
```

**Props:**
- `title`: string
- `subtitle`: string
- `variant`: 'default' | 'outlined' | 'elevated'
- `size`: 'small' | 'medium' | 'large'
- `clickable`: boolean
- `onClick`: (event: React.MouseEvent<HTMLDivElement>) => void

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建组件库

```bash
npm run build:lib
```

### 类型检查

```bash
npm run type-check
```

### 代码检查

```bash
npm run lint
```

## 项目结构

```
src/
├── components/          # 组件源码
│   ├── Button/
│   ├── Input/
│   └── Card/
├── styles/             # 全局样式
│   └── index.css
├── index.ts            # 入口文件
└── App.tsx             # 演示应用
```

## 自定义主题

组件库使用CSS变量来定义主题，你可以通过覆盖这些变量来自定义主题：

```css
:root {
  --compo-primary: #your-color;
  --compo-secondary: #your-color;
  --compo-success: #your-color;
  --compo-warning: #your-color;
  --compo-error: #your-color;
  /* 更多变量... */
}
```

## 浏览器支持

- Chrome >= 88
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 许可证

MIT License