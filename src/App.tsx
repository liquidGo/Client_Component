import { useState } from 'react'
import { EditContent } from './index'
import { DatePicker, Switch, Rate, Card, Collapse } from 'antd'
import dayjs from 'dayjs'
import './App.css'

function App() {
  const [userInfo, setUserInfo] = useState({
    name: '张三' as string,
    email: 'zhangsan@example.com' as string,
    age: 25 as number,
    city: 'beijing' as string,
    bio: '这是一个个人简介，可以点击编辑' as string,
    salary: 15000 as number,
    skills: ['react', 'typescript'] as string[],
    isActive: true as boolean,
    rating: 4.5 as number,
    joinDate: dayjs('2023-01-01') as any // eslint-disable-line @typescript-eslint/no-explicit-any
  })

  const cityOptions = [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
    { label: '深圳', value: 'shenzhen' },
    { label: '杭州', value: 'hangzhou' }
  ]

  const skillOptions = [
    { label: 'React', value: 'react' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Node.js', value: 'nodejs' },
    { label: 'Python', value: 'python' }
  ]

  return (
    <div className="app">
      <header className="app-header">
        <h1>Jinyouyu UI 组件演示</h1>
        <p>一个基于Compound + Render Props模式的可编辑内容组件库</p>
      </header>

      <main className="app-main">
        <Collapse
          items={[
            {
              key: '1',
              label: 'EditContent 组件功能演示',
              children: (
                <div>
                  {/* 基础功能演示 */}
                  <div className="demo-section">
                    <h3>基础功能演示</h3>
                    <div className="demo-grid">
                      <Card title="文本编辑" size="small">
                        <EditContent
                          value={userInfo.name}
                          onSave={(value) => setUserInfo(prev => ({ ...prev, name: value as string }))}
                        >
                          {() => (
                            <EditContent.Text
                              placeholder="请输入姓名"
                              maxLength={20}
                              showCount
                            />
                          )}
                        </EditContent>
                      </Card>

                      <Card title="邮箱编辑" size="small">
                        <EditContent
                          value={userInfo.email}
                          onSave={(value) => setUserInfo(prev => ({ ...prev, email: value as string }))}
                        >
                          {() => (
                            <EditContent.Text
                              placeholder="请输入邮箱"
                            />
                          )}
                        </EditContent>
                      </Card>

                      <Card title="年龄编辑" size="small">
                        <EditContent
                          value={userInfo.age}
                          onSave={(value) => setUserInfo(prev => ({ ...prev, age: value as number }))}
                        >
                          {() => (
                            <EditContent.Number
                              min={18}
                              max={100}
                              placeholder="请输入年龄"
                            />
                          )}
                        </EditContent>
                      </Card>

                      <Card title="城市选择" size="small">
                        <EditContent
                          value={userInfo.city}
                          onSave={(value) => setUserInfo(prev => ({ ...prev, city: value as string }))}
                        >
                          {() => (
                            <EditContent.Select
                              options={cityOptions}
                              placeholder="请选择城市"
                              allowClear
                            />
                          )}
                        </EditContent>
                      </Card>
                    </div>
                  </div>

                  {/* 高级功能演示 */}
                  <div className="demo-section">
                    <h3>高级功能演示</h3>
                    <div className="demo-grid">
                      <Card title="多行文本编辑" size="small">
                        <EditContent
                          value={userInfo.bio}
                          onSave={(value) => setUserInfo(prev => ({ ...prev, bio: value as string }))}
                        >
                          {() => (
                            <EditContent.TextArea
                              placeholder="请输入个人简介"
                              maxLength={200}
                              showCount
                              autoSize={{ minRows: 3, maxRows: 6 }}
                            />
                          )}
                        </EditContent>
                      </Card>

                      <Card title="薪资编辑（格式化）" size="small">
                        <EditContent
                          value={userInfo.salary}
                          onSave={(value) => setUserInfo(prev => ({ ...prev, salary: value as number }))}
                        >
                          {() => (
                            <EditContent.Number
                              min={0}
                              max={1000000}
                              precision={0}
                              placeholder="请输入薪资"
                              formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              parser={(value) => parseFloat(value!.replace(/¥\s?|(,*)/g, ''))}
                            />
                          )}
                        </EditContent>
                      </Card>

                      <Card title="多选技能" size="small">
                        <EditContent
                          value={userInfo.skills}
                          onSave={(value) => setUserInfo(prev => ({ ...prev, skills: value as string[] }))}
                        >
                          {() => (
                            <EditContent.Select
                              options={skillOptions}
                              placeholder="请选择技能"
                              mode="multiple"
                              allowClear
                            />
                          )}
                        </EditContent>
                      </Card>

                      <Card title="自动保存" size="small">
                        <EditContent
                          value="自动保存文本"
                          autoSave
                          saveDelay={2000}
                          onSave={(value) => console.log('自动保存:', value as string)}
                        >
                          {() => (
                            <EditContent.Text
                              placeholder="输入后2秒自动保存"
                            />
                          )}
                        </EditContent>
                      </Card>
                    </div>
                  </div>

                  {/* 自定义组件演示 */}
                  <div className="demo-section">
                    <h3>自定义组件演示</h3>
                    <div className="demo-grid">
                      <Card title="日期选择" size="small">
                        <EditContent
                          value={userInfo.joinDate}
                          onSave={(value) => setUserInfo(prev => ({ ...prev, joinDate: value as any }))} // eslint-disable-line @typescript-eslint/no-explicit-any
                        >
                          {() => (
                            <EditContent.Custom
                              renderDisplay={(value) => (value as any)?.format('YYYY-MM-DD') || '选择日期'} // eslint-disable-line @typescript-eslint/no-explicit-any
                              renderEdit={(value, onChange) => (
                                <DatePicker
                                  value={value}
                                  onChange={onChange}
                                  style={{ minWidth: 200 }}
                                  format="YYYY-MM-DD"
                                />
                              )}
                            />
                          )}
                        </EditContent>
                      </Card>

                      <Card title="开关状态" size="small">
                        <EditContent
                          value={userInfo.isActive}
                          onSave={(value) => setUserInfo(prev => ({ ...prev, isActive: value as boolean }))}
                        >
                          {() => (
                            <EditContent.Custom
                              renderDisplay={(value) => (value as boolean) ? '激活' : '未激活'}
                              renderEdit={(value, onChange) => (
                                <Switch
                                  checked={value as boolean}
                                  onChange={onChange}
                                />
                              )}
                            />
                          )}
                        </EditContent>
                      </Card>

                      <Card title="评分编辑" size="small">
                        <EditContent
                          value={userInfo.rating}
                          onSave={(value) => setUserInfo(prev => ({ ...prev, rating: value as number }))}
                        >
                          {() => (
                            <EditContent.Custom
                              renderDisplay={(value) => `${value as number} 星`}
                              renderEdit={(value, onChange) => (
                                <Rate
                                  value={value as number}
                                  onChange={onChange}
                                  allowHalf
                                />
                              )}
                            />
                          )}
                        </EditContent>
                      </Card>

                      <Card title="加载状态" size="small">
                        <EditContent
                          value="加载状态演示"
                          loading
                          onSave={async (value) => {
                            await new Promise(resolve => setTimeout(resolve, 2000));
                            console.log('保存:', value as string);
                          }}
                        >
                          {({ loading }) => (
                            <EditContent.Text
                              placeholder="点击保存会显示加载状态"
                              disabled={loading}
                            />
                          )}
                        </EditContent>
                      </Card>
                    </div>
                  </div>

                  {/* 禁用状态演示 */}
                  <div className="demo-section">
                    <h3>禁用状态演示</h3>
                    <div className="demo-grid">
                      <Card title="禁用编辑" size="small">
                        <EditContent
                          value="禁用状态"
                          disabled
                          onSave={(value) => console.log('保存:', value as string)}
                        >
                          {({ disabled }) => (
                            <EditContent.Text
                              placeholder="禁用状态"
                              disabled={disabled}
                            />
                          )}
                        </EditContent>
                      </Card>
                    </div>
                  </div>

                  {/* 当前数据展示 */}
                  <div className="demo-section">
                    <h3>当前数据</h3>
                    <pre className="data-display">
                      {JSON.stringify(userInfo, null, 2)}
                    </pre>
                  </div>
                </div>
              )
            }
          ]}
          defaultActiveKey={['1']}
        />
      </main>
    </div>
  )
}

export default App