import { notification } from 'antd';

export default function useNotification({ placement = 'topRight', duration = 2 } = {}) {
    return ({ type = 'success', message, title, onClose }) => {
        notification[type]({
            message: title,
            description: message,
            placement,
            duration,
            onClose,
        });
    };
}
