import { notification } from 'antd';

export const useNotification = () => {
  function showNotification({
    key = 'success',
    message,
    placement = 'bottomLeft',
  }: {
    key?: 'success' | 'error' | 'info';
    message: string;
    placement?: 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft';
  }) {
    return notification[key]({
      message: message,
      placement: placement,
    });
  }

  return { showNotification };
};
