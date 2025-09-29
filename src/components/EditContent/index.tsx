import React, { useState, useContext, createContext } from 'react';
import type { ReactNode } from 'react';
import { Button, Input, Select, InputNumber } from 'antd';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

/* ================== 类型定义 ================== */
interface EditContextValue {
  isEditing: boolean;
  value: any;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: any) => void;
  disabled?: boolean;
  loading?: boolean;
}

interface EditContentProps {
  value?: any;
  onSave?: (value: any) => void;
  onCancel?: (value: any) => void;
  onClick?: (value: any) => void;
  disabled?: boolean;
  loading?: boolean;
  autoSave?: boolean;
  saveDelay?: number;
  children: (props: { isEditing: boolean; value: any; disabled: boolean; loading: boolean }) => ReactNode;
}

interface EditableTextProps {
  placeholder?: string;
  maxLength?: number;
  showCount?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
}

interface EditableSelectProps {
  options: Array<{ label: string; value: any; disabled?: boolean }>;
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
  mode?: 'multiple' | 'tags';
}

interface EditableNumberProps {
  min?: number;
  max?: number;
  precision?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
  formatter?: (value: number | string | undefined) => string;
  parser?: (value: string | undefined) => number;
}

interface EditableTextAreaProps {
  placeholder?: string;
  maxLength?: number;
  showCount?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  rows?: number;
  autoSize?: boolean | { minRows: number; maxRows: number };
}

/* ================== Context ================== */
const EditContext = createContext<EditContextValue | null>(null);

const useEditContext = () => {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error('EditContent子组件必须在EditContent容器内使用');
  }
  return context;
};

/* ================== 主容器组件 ================== */
const EditContentRoot: React.FC<EditContentProps> = ({ 
  value: initialValue, 
  onSave, 
  onCancel: onCancelProp,
  onClick, 
  disabled = false,
  loading = false,
  autoSave = false,
  saveDelay = 1000,
  children 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [tempValue, setTempValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  // 自动保存定时器
  const [saveTimer, setSaveTimer] = useState<number | null>(null);

  const handleEdit = () => {
    if (disabled || loading) return;
    setTempValue(value);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (disabled || loading) return;
    
    setIsLoading(true);
    try {
      setValue(tempValue);
      setIsEditing(false);
      await onSave?.(tempValue);
    } catch (error) {
      console.error('保存失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (disabled || loading) return;
    setTempValue(value);
    setIsEditing(false);
    onCancelProp?.(value);
  };

  const handleChange = (newValue: any) => {
    if (disabled || loading) return;
    setTempValue(newValue);
    
    // 自动保存逻辑
    if (autoSave) {
      if (saveTimer) {
        clearTimeout(saveTimer);
      }
      const timer = setTimeout(() => {
        handleSave();
      }, saveDelay);
      setSaveTimer(timer);
    }
  };

  const handleClick = () => {
    if (disabled || loading) return;
    onClick?.(value);
  };

  // 清理定时器
  React.useEffect(() => {
    return () => {
      if (saveTimer) {
        clearTimeout(saveTimer);
      }
    };
  }, [saveTimer]);

  const contextValue: EditContextValue = {
    isEditing,
    value: isEditing ? tempValue : value,
    onEdit: handleEdit,
    onSave: handleSave,
    onCancel: handleCancel,
    onChange: handleChange,
    disabled: disabled || loading,
    loading: isLoading,
  };

  return (
    <EditContext.Provider value={contextValue}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div 
          onClick={handleClick}
          style={{ 
            cursor: disabled || loading ? 'not-allowed' : 'pointer',
            opacity: disabled || loading ? 0.6 : 1,
            flex: 1
          }}
        >
          {children({ 
            isEditing, 
            value: isEditing ? tempValue : value, 
            disabled: disabled || loading,
            loading: isLoading
          })}
        </div>
        <EditContent.Actions />
      </div>
    </EditContext.Provider>
  );
};

/* ================== 操作按钮组件 ================== */
const Actions: React.FC = () => {
  const { isEditing, onEdit, onSave, onCancel, disabled, loading } = useEditContext();

  if (isEditing) {
    return (
      <>
        <Button
          type="text"
          size="small"
          icon={<CheckOutlined />}
          onClick={onSave}
          loading={loading}
          disabled={disabled}
          style={{ color: '#52c41a' }}
        />
        <Button
          type="text"
          size="small"
          icon={<CloseOutlined />}
          onClick={onCancel}
          disabled={disabled || loading}
          style={{ color: '#ff4d4f' }}
        />
      </>
    );
  }

  return (
    <Button
      type="text"
      size="small"
      icon={<EditOutlined />}
      onClick={onEdit}
      disabled={disabled}
      style={{ color: '#1890ff' }}
    />
  );
};

/* ================== 文本编辑组件 ================== */
const EditableText: React.FC<EditableTextProps> = ({ 
  placeholder, 
  maxLength, 
  showCount, 
  allowClear, 
  disabled: propDisabled 
}) => {
  const { isEditing, value, onChange, disabled: contextDisabled } = useEditContext();
  const disabled = propDisabled || contextDisabled;

  if (isEditing) {
    return (
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        showCount={showCount}
        allowClear={allowClear}
        disabled={disabled}
        autoFocus
        style={{ minWidth: 120 }}
      />
    );
  }

  return (
    <span style={{ 
      minHeight: 22, 
      display: 'inline-block', 
      lineHeight: '22px',
      opacity: disabled ? 0.6 : 1
    }}>
      {value || placeholder || '点击编辑'}
    </span>
  );
};

/* ================== 选择器编辑组件 ================== */
const EditableSelect: React.FC<EditableSelectProps> = ({ 
  options, 
  placeholder, 
  allowClear, 
  disabled: propDisabled,
  mode 
}) => {
  const { isEditing, value, onChange, disabled: contextDisabled } = useEditContext();
  const disabled = propDisabled || contextDisabled;

  if (isEditing) {
    return (
      <Select
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        allowClear={allowClear}
        disabled={disabled}
        mode={mode}
        style={{ minWidth: 120 }}
        autoFocus
      />
    );
  }

  const selectedOption = options.find(opt => opt.value === value);
  return (
    <span style={{ 
      minHeight: 22, 
      display: 'inline-block', 
      lineHeight: '22px',
      opacity: disabled ? 0.6 : 1
    }}>
      {selectedOption?.label || placeholder || '点击选择'}
    </span>
  );
};

/* ================== 数字编辑组件 ================== */
const EditableNumber: React.FC<EditableNumberProps> = ({ 
  min, 
  max, 
  precision, 
  step,
  placeholder, 
  disabled: propDisabled,
  formatter,
  parser
}) => {
  const { isEditing, value, onChange, disabled: contextDisabled } = useEditContext();
  const disabled = propDisabled || contextDisabled;

  if (isEditing) {
    return (
      <InputNumber
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        precision={precision}
        step={step}
        placeholder={placeholder}
        disabled={disabled}
        formatter={formatter}
        parser={parser}
        style={{ minWidth: 120 }}
        autoFocus
      />
    );
  }

  return (
    <span style={{ 
      minHeight: 22, 
      display: 'inline-block', 
      lineHeight: '22px',
      opacity: disabled ? 0.6 : 1
    }}>
      {value !== undefined && value !== null ? value : placeholder || '点击编辑'}
    </span>
  );
};

/* ================== 文本域编辑组件 ================== */
const EditableTextArea: React.FC<EditableTextAreaProps> = ({ 
  placeholder, 
  maxLength, 
  showCount, 
  allowClear, 
  disabled: propDisabled,
  rows,
  autoSize
}) => {
  const { isEditing, value, onChange, disabled: contextDisabled } = useEditContext();
  const disabled = propDisabled || contextDisabled;

  if (isEditing) {
    return (
      <Input.TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        showCount={showCount}
        allowClear={allowClear}
        disabled={disabled}
        rows={rows}
        autoSize={autoSize}
        style={{ minWidth: 200 }}
        autoFocus
      />
    );
  }

  return (
    <span style={{ 
      minHeight: 22, 
      display: 'inline-block', 
      lineHeight: '22px',
      opacity: disabled ? 0.6 : 1,
      whiteSpace: 'pre-wrap'
    }}>
      {value || placeholder || '点击编辑'}
    </span>
  );
};

/* ================== 显示组件 ================== */
const Display: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isEditing } = useEditContext();
  
  if (isEditing) {
    return null;
  }
  
  return (
    <span style={{ minHeight: 22, display: 'inline-block', lineHeight: '22px' }}>
      {children}
    </span>
  );
};

/* ================== 自定义编辑组件 ================== */
const Custom: React.FC<{
  renderDisplay: (value: any) => ReactNode;
  renderEdit: (value: any, onChange: (value: any) => void) => ReactNode;
}> = ({ renderDisplay, renderEdit }) => {
  const { isEditing, value, onChange } = useEditContext();

  if (isEditing) {
    return <>{renderEdit(value, onChange)}</>;
  }

  return (
    <span style={{ minHeight: 22, display: 'inline-block', lineHeight: '22px' }}>
      {renderDisplay(value)}
    </span>
  );
};

/* ================== 复合组件 ================== */
type EditContentCompound = React.FC<EditContentProps> & {
  Actions: React.FC;
  Text: React.FC<EditableTextProps>;
  TextArea: React.FC<EditableTextAreaProps>;
  Select: React.FC<EditableSelectProps>;
  Number: React.FC<EditableNumberProps>;
  Display: React.FC<{ children: ReactNode }>;
  Custom: React.FC<{
    renderDisplay: (value: any) => ReactNode;
    renderEdit: (value: any, onChange: (value: any) => void) => ReactNode;
  }>;
};

const EditContent = EditContentRoot as EditContentCompound;
EditContent.Actions = Actions;
EditContent.Text = EditableText;
EditContent.TextArea = EditableTextArea;
EditContent.Select = EditableSelect;
EditContent.Number = EditableNumber;
EditContent.Display = Display;
EditContent.Custom = Custom;

export default EditContent;

/* ================== 使用示例 ================== */
/*
// 1. 基础文本编辑
<EditContent value="初始文本" onSave={(value) => console.log('保存:', value)}>
  {({ isEditing, value }) => (
    isEditing ? <EditContent.Text placeholder="请输入文本" /> : <EditContent.Display>{value}</EditContent.Display>
  )}
</EditContent>

// 2. 带字符计数的文本编辑
<EditContent value="初始文本" onSave={(value) => console.log('保存:', value)}>
  {({ isEditing, value }) => (
    isEditing ? (
      <EditContent.Text 
        placeholder="请输入文本" 
        maxLength={100} 
        showCount 
        allowClear 
      />
    ) : (
      <EditContent.Display>{value}</EditContent.Display>
    )
  )}
</EditContent>

// 3. 文本域编辑
<EditContent value="多行文本内容" onSave={(value) => console.log('保存:', value)}>
  {({ isEditing, value }) => (
    isEditing ? (
      <EditContent.TextArea 
        placeholder="请输入多行文本" 
        maxLength={500} 
        showCount 
        autoSize={{ minRows: 2, maxRows: 6 }}
      />
    ) : (
      <EditContent.Display>{value}</EditContent.Display>
    )
  )}
</EditContent>

// 4. 选择器编辑
<EditContent value="option1" onSave={(value) => console.log('保存:', value)}>
  {({ isEditing }) => (
    isEditing ? (
      <EditContent.Select 
        options={[
          { label: '选项1', value: 'option1' },
          { label: '选项2', value: 'option2' },
          { label: '选项3', value: 'option3', disabled: true }
        ]} 
        placeholder="请选择" 
        allowClear
      />
    ) : (
      <EditContent.Display>当前选择</EditContent.Display>
    )
  )}
</EditContent>

// 5. 多选选择器
<EditContent value={['option1', 'option2']} onSave={(value) => console.log('保存:', value)}>
  {({ isEditing, value }) => (
    isEditing ? (
      <EditContent.Select 
        options={[
          { label: '选项1', value: 'option1' },
          { label: '选项2', value: 'option2' },
          { label: '选项3', value: 'option3' }
        ]} 
        placeholder="请选择多个选项" 
        mode="multiple"
        allowClear
      />
    ) : (
      <EditContent.Display>{Array.isArray(value) ? value.join(', ') : value}</EditContent.Display>
    )
  )}
</EditContent>

// 6. 数字编辑
<EditContent value={100} onSave={(value) => console.log('保存:', value)}>
  {({ isEditing, value }) => (
    isEditing ? (
      <EditContent.Number 
        min={0} 
        max={1000} 
        precision={2} 
        step={0.1}
        placeholder="请输入数字" 
        formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={(value) => value!.replace(/¥\s?|(,*)/g, '')}
      />
    ) : (
      <EditContent.Display>¥ {value}</EditContent.Display>
    )
  )}
</EditContent>

// 7. 禁用状态
<EditContent 
  value="禁用状态" 
  disabled 
  onSave={(value) => console.log('保存:', value)}
>
  {({ isEditing, value, disabled }) => (
    <EditContent.Text 
      placeholder="禁用状态" 
      disabled={disabled}
    />
  )}
</EditContent>

// 8. 自动保存
<EditContent 
  value="自动保存文本" 
  autoSave 
  saveDelay={2000}
  onSave={(value) => console.log('自动保存:', value)}
>
  {({ isEditing, value }) => (
    <EditContent.Text 
      placeholder="输入后2秒自动保存" 
    />
  )}
</EditContent>

// 9. 加载状态
<EditContent 
  value="加载状态" 
  loading 
  onSave={async (value) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('保存:', value);
  }}
>
  {({ isEditing, value, loading }) => (
    <EditContent.Text 
      placeholder="点击保存会显示加载状态" 
      disabled={loading}
    />
  )}
</EditContent>

// 10. 自定义编辑组件
<EditContent value={dayjs()} onSave={(value) => console.log('保存:', value)}>
  {({ isEditing, value }) => (
    <EditContent.Custom
      renderDisplay={(value) => value?.format('YYYY-MM-DD') || '选择日期'}
      renderEdit={(value, onChange) => (
        <DatePicker value={value} onChange={onChange} format="YYYY-MM-DD" />
      )}
    />
  )}
</EditContent>

// 11. 复杂表单组合
<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <label>用户名：</label>
    <EditContent value="张三" onSave={(value) => console.log('用户名:', value)}>
      {({ isEditing, value }) => (
        <EditContent.Text 
          placeholder="请输入用户名" 
          maxLength={20}
          showCount
        />
      )}
    </EditContent>
  </div>
  
  <div>
    <label>邮箱：</label>
    <EditContent value="zhangsan@example.com" onSave={(value) => console.log('邮箱:', value)}>
      {({ isEditing, value }) => (
        <EditContent.Text 
          placeholder="请输入邮箱" 
          type="email"
        />
      )}
    </EditContent>
  </div>
  
  <div>
    <label>年龄：</label>
    <EditContent value={25} onSave={(value) => console.log('年龄:', value)}>
      {({ isEditing, value }) => (
        <EditContent.Number 
          min={18} 
          max={100} 
          placeholder="请输入年龄" 
        />
      )}
    </EditContent>
  </div>
  
  <div>
    <label>城市：</label>
    <EditContent value="beijing" onSave={(value) => console.log('城市:', value)}>
      {({ isEditing, value }) => (
        <EditContent.Select 
          options={[
            { label: '北京', value: 'beijing' },
            { label: '上海', value: 'shanghai' },
            { label: '广州', value: 'guangzhou' },
            { label: '深圳', value: 'shenzhen' }
          ]} 
          placeholder="请选择城市" 
        />
      )}
    </EditContent>
  </div>
  
  <div>
    <label>个人简介：</label>
    <EditContent value="这是一个个人简介" onSave={(value) => console.log('简介:', value)}>
      {({ isEditing, value }) => (
        <EditContent.TextArea 
          placeholder="请输入个人简介" 
          maxLength={200}
          showCount
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
      )}
    </EditContent>
  </div>
</div>
*/