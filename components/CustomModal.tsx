"use client";
import React, { useState } from 'react';
import { Modal, ModalProps, Button, ButtonProps, FormInstance } from 'antd';

export interface CustomModalProps extends Omit<ModalProps, 'footer'> {
  /**
   * 自定义标题
   */
  title?: React.ReactNode;
  /**
   * 自定义内容（slot）
   */
  children?: React.ReactNode;
  /**
   * 自定义按钮配置
   * 可以是按钮配置数组，或者自定义 ReactNode
   */
  footer?: React.ReactNode | CustomButtonConfig[];
  /**
   * 是否显示默认的取消和确认按钮
   * 当 footer 为 undefined 时，默认为 true
   */
  showDefaultButtons?: boolean;
  /**
   * 确认按钮的点击回调
   * 如果返回 false 或 Promise<false>，将阻止 Modal 关闭
   */
  onOk?: () => void | Promise<void> | boolean | Promise<boolean>;
  /**
   * 取消按钮的点击回调
   */
  onCancel?: () => void;
  /**
   * 确认按钮的加载状态
   */
  confirmLoading?: boolean;
  /**
   * Form 实例（用于表单场景）
   * 当提供 form 实例时，onOk 会自动触发表单验证
   */
  form?: FormInstance;
  /**
   * 是否在关闭时重置表单
   * 默认 false
   */
  resetOnClose?: boolean;
}

export interface CustomButtonConfig {
  /**
   * 按钮文本
   */
  text: string;
  /**
   * 按钮类型
   */
  type?: ButtonProps['type'];
  /**
   * 按钮点击回调
   */
  onClick?: () => void | Promise<void>;
  /**
   * 按钮是否加载中
   */
  loading?: boolean;
  /**
   * 按钮是否禁用
   */
  disabled?: boolean;
  /**
   * 按钮的其他属性
   */
  props?: Omit<ButtonProps, 'type' | 'onClick' | 'loading' | 'disabled'>;
}

const CustomModal: React.FC<CustomModalProps> = ({
  title,
  children,
  footer,
  showDefaultButtons = true,
  onOk,
  onCancel,
  confirmLoading = false,
  form,
  resetOnClose = false,
  ...restProps
}) => {
  const [internalLoading, setInternalLoading] = useState(false);
  const isLoading = confirmLoading || internalLoading;

  // 处理确认按钮点击
  const handleOk = async () => {
    if (!onOk) return;

    try {
      // 如果有 form 实例，先进行表单验证
      if (form) {
        try {
          await form.validateFields();
        } catch {
          // 表单验证失败，不执行 onOk，也不关闭 Modal
          return;
        }
      }

      setInternalLoading(true);
      const result = await onOk();
      setInternalLoading(false);

      // 如果 onOk 返回 false，不关闭 Modal
      if (result === false) {
        return;
      }

      // 如果提供了 form 且 resetOnClose 为 true，重置表单
      if (form && resetOnClose) {
        form.resetFields();
      }
    } catch {
      setInternalLoading(false);
      // 错误处理：不关闭 Modal
    }
  };

  // 处理取消按钮点击
  const handleCancel = () => {
    // 如果提供了 form 且 resetOnClose 为 true，重置表单
    if (form && resetOnClose) {
      form.resetFields();
    }
    onCancel?.();
  };

  // 渲染自定义按钮
  const renderCustomFooter = (): React.ReactNode => {
    // 如果 footer 是 ReactNode，直接返回
    if (footer && !Array.isArray(footer)) {
      return footer;
    }

    // 如果 footer 是按钮配置数组，渲染按钮
    if (Array.isArray(footer) && footer.length > 0) {
      return (
        <div className="flex justify-end gap-2">
          {footer.map((btn, index) => (
            <Button
              key={index}
              type={btn.type}
              onClick={btn.onClick}
              loading={btn.loading}
              disabled={btn.disabled}
              {...btn.props}
            >
              {btn.text}
            </Button>
          ))}
        </div>
      );
    }

    // 如果 footer 为 undefined 且 showDefaultButtons 为 true，显示默认按钮
    if (showDefaultButtons && footer === undefined) {
      return (
        <div className="flex justify-end gap-2">
          <Button onClick={handleCancel}>取消</Button>
          <Button type="primary" onClick={handleOk} loading={isLoading}>
            确认
          </Button>
        </div>
      );
    }

    // 如果 footer 为 null，不显示任何按钮
    return null;
  };

  return (
    <Modal
      title={title}
      footer={renderCustomFooter()}
      onCancel={handleCancel}
      {...restProps}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
