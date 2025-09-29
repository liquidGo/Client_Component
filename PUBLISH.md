# 发布指南

## 发布到npm的步骤

### 1. 准备工作

确保你已经：
- [ ] 注册了npm账号
- [ ] 在本地登录npm (`npm login`)
- [ ] 更新了package.json中的版本号
- [ ] 更新了README.md
- [ ] 确保所有测试通过
- [ ] https://registry.npmjs.org/ 
- [ ] https://registry.npmmirror.com/

### 2. 构建组件库

```bash
# 运行类型检查和代码检查
npm run prebuild

# 构建组件库
npm run build:lib
```

### 3. 检查构建输出

确保dist目录包含：
- `index.js` - 主入口文件
- `index.d.ts` - TypeScript声明文件
- `index.css` - 样式文件
- `components/` - 组件声明文件

### 4. 发布到npm

```bash
# 发布到npm
npm publish

# 如果是私有包或测试包
npm publish --access public
```

### 5. 验证发布

```bash
# 创建测试项目
mkdir test-compo
cd test-compo
npm init -y

# 安装你的包
npm install @jinyouyu/ui

# 测试导入
node -e "console.log(require('@jinyouyu/ui'))"
```

## 使用方式

发布后，其他项目可以通过以下方式使用：

```bash
npm install @jinyouyu/ui
```

```tsx
import { EditContent } from '@jinyouyu/ui'
import '@jinyouyu/ui/style.css'

function App() {
  return (
    <EditContent value="文本" onSave={setValue}>
      {() => <EditContent.Text placeholder="请输入" />}
    </EditContent>
  )
}
```

## 版本管理

- 使用语义化版本控制 (SemVer)
- 主版本号：不兼容的API修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

```bash
# 更新版本
npm version patch  # 0.0.1 -> 0.0.2
npm version minor  # 0.0.1 -> 0.1.0
npm version major  # 0.0.1 -> 1.0.0
```

## 注意事项

1. **包名唯一性**: 确保包名在npm上是唯一的
2. **作用域包**: 使用@jinyouyu/ui这样的作用域包名
3. **依赖管理**: 将运行时依赖设为peerDependencies
4. **文件包含**: 使用.npmignore控制发布内容
5. **类型声明**: 确保包含TypeScript声明文件
6. **样式文件**: 确保样式文件被正确包含和导出
