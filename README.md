# Jinyouyu UI Component Library

一个基于React和TypeScript的现代组件库，使用Vite构建，采用Compound + Render Props设计模式。

## 特性

- 🚀 基于React 19和TypeScript
- 📦 使用Vite进行快速构建
- 🎨 基于Ant Design的现代化设计系统
- 📱 响应式设计
- ♿ 无障碍支持
- 🎯 完整的TypeScript类型定义
- 🔧 可定制的主题变量
- 🧩 Compound + Render Props设计模式
- ✏️ 强大的可编辑内容组件

## 安装

```bash
npm install @jinyouyu/ui
```

## 在线演示

安装后，您可以查看 `dist-demo/index.html` 文件来预览所有组件的演示效果。

## 快速开始

```tsx
import React from 'react'
import { EditContent } from '@jinyouyu/ui'
import '@jinyouyu/ui/style.css'

function App() {
  const [value, setValue] = React.useState('初始文本')

  return (
    <div>
      <EditContent 
        value={value} 
        onSave={(newValue) => setValue(newValue)}
      >
        {() => (
          <EditContent.Text 
            placeholder="请输入文本" 
            maxLength={100}
            showCount
          />
        )}
      </EditContent>
    </div>
  )
}

export default App
```

## 组件

### EditContent 可编辑内容组件

基于Compound + Render Props模式的可编辑内容组件，支持多种编辑类型和交互方式。

#### 基础用法

```tsx
<EditContent 
  value={value} 
  onSave={(newValue) => setValue(newValue)}
>
  {() => (
    <EditContent.Text 
      placeholder="请输入文本" 
      maxLength={100}
      showCount
    />
  )}
</EditContent>
```

#### 支持的编辑类型

**1. 文本编辑**
```tsx
<EditContent value={text} onSave={setText}>
  {() => (
    <EditContent.Text 
      placeholder="请输入文本"
      maxLength={100}
      showCount
      type="email" // 支持 text, email, password, url, tel
    />
  )}
</EditContent>
```

**2. 多行文本编辑**
```tsx
<EditContent value={bio} onSave={setBio}>
  {() => (
    <EditContent.TextArea 
      placeholder="请输入个人简介"
      maxLength={200}
      showCount
      autoSize={{ minRows: 3, maxRows: 6 }}
    />
  )}
</EditContent>
```

**3. 数字编辑**
```tsx
<EditContent value={age} onSave={setAge}>
  {() => (
    <EditContent.Number 
      min={18}
      max={100}
      placeholder="请输入年龄"
      precision={0}
    />
  )}
</EditContent>
```

**4. 选择器编辑**
```tsx
<EditContent value={city} onSave={setCity}>
  {() => (
    <EditContent.Select 
      options={cityOptions}
      placeholder="请选择城市"
      allowClear
    />
  )}
</EditContent>
```

**5. 多选编辑**
```tsx
<EditContent value={skills} onSave={setSkills}>
  {() => (
    <EditContent.Select 
      options={skillOptions}
      placeholder="请选择技能"
      mode="multiple"
      allowClear
    />
  )}
</EditContent>
```

**6. 自定义编辑组件**
```tsx
<EditContent value={date} onSave={setDate}>
  {() => (
    <EditContent.Custom
      renderDisplay={(value) => value?.format('YYYY-MM-DD') || '选择日期'}
      renderEdit={(value, onChange) => (
        <DatePicker 
          value={value} 
          onChange={onChange}
          format="YYYY-MM-DD"
        />
      )}
    />
  )}
</EditContent>
```

#### 高级功能

**自动保存**
```tsx
<EditContent 
  value={text} 
  onSave={setText}
  autoSave
  saveDelay={2000} // 2秒后自动保存
>
  {() => <EditContent.Text placeholder="输入后自动保存" />}
</EditContent>
```

**加载状态**
```tsx
<EditContent 
  value={text} 
  onSave={async (value) => {
    await saveToServer(value)
  }}
>
  {({ loading }) => (
    <EditContent.Text 
      placeholder="点击保存会显示加载状态"
      disabled={loading}
    />
  )}
</EditContent>
```

**禁用状态**
```tsx
<EditContent 
  value={text} 
  onSave={setText}
  disabled
>
  {({ disabled }) => (
    <EditContent.Text 
      placeholder="禁用状态"
      disabled={disabled}
    />
  )}
</EditContent>
```

#### Props

**EditContent 主组件:**
- `value`: any - 当前值
- `onSave`: (value: any) => void - 保存回调
- `onCancel`: (value: any) => void - 取消回调
- `disabled`: boolean - 是否禁用
- `loading`: boolean - 是否加载中
- `autoSave`: boolean - 是否自动保存
- `saveDelay`: number - 自动保存延迟时间（毫秒）

**EditContent.Text:**
- `placeholder`: string - 占位符
- `maxLength`: number - 最大长度
- `showCount`: boolean - 是否显示字符计数
- `type`: 'text' | 'email' | 'password' | 'url' | 'tel' - 输入类型

**EditContent.TextArea:**
- `placeholder`: string - 占位符
- `maxLength`: number - 最大长度
- `showCount`: boolean - 是否显示字符计数
- `autoSize`: boolean | { minRows: number; maxRows: number } - 自适应高度

**EditContent.Number:**
- `min`: number - 最小值
- `max`: number - 最大值
- `precision`: number - 精度
- `step`: number - 步长
- `formatter`: (value) => string - 格式化函数
- `parser`: (value) => number - 解析函数

**EditContent.Select:**
- `options`: Array<{label: string; value: any}> - 选项数组
- `placeholder`: string - 占位符
- `allowClear`: boolean - 是否允许清除
- `mode`: 'multiple' | 'tags' - 多选模式

**EditContent.Custom:**
- `renderDisplay`: (value) => ReactNode - 显示状态渲染函数
- `renderEdit`: (value, onChange) => ReactNode - 编辑状态渲染函数

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
│   └── EditContent/    # 可编辑内容组件
│       └── index.tsx   # 主组件文件
├── styles/             # 全局样式
│   └── index.less      # Less样式文件
├── index.ts            # 入口文件
├── App.tsx             # 演示应用
└── App.css             # 演示应用样式
```

## 设计模式

### Compound + Render Props 模式

EditContent组件采用了Compound + Render Props设计模式，提供了高度的灵活性和可扩展性：

- **Compound模式**: 通过子组件组合来构建复杂的UI结构
- **Render Props模式**: 通过函数作为子组件来共享状态和逻辑
- **Context API**: 在组件树中共享状态，避免prop drilling

### 优势

- 🧩 **高度可组合**: 可以灵活组合不同的子组件
- 🔄 **状态共享**: 通过Context自动共享编辑状态
- 🎯 **类型安全**: 完整的TypeScript类型支持
- 🎨 **样式隔离**: 每个子组件都有独立的样式
- 🔧 **易于扩展**: 可以轻松添加新的编辑类型

## 浏览器支持

- Chrome >= 88
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 许可证

MIT License