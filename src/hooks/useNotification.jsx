import { notification } from 'antd';
import locales from '../locales';

export default function useNotification({ placement = 'topRight', duration = 2 } = {}) {
    return ({ type = 'success', message, title, onClose }) => {
        notification[type]({
            message: title,
            description: message || locales.errorSystem,
            placement,
            duration,
            onClose,
        });
    };
}
