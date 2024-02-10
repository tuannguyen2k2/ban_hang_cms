import ReactDOM from 'react-dom';
import React, { useEffect, useMemo } from 'react';
import { Spin } from 'antd';

import styles from './index.module.scss';

const Loading = ({ show }) => {
    const node = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        show && document.body.appendChild(node);

        return () => show && document.body.removeChild(node);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    return ReactDOM.createPortal(
        <div className={styles.loadingContainer}>
            <Spin size='large' />
        </div>,
        node
    );
};

export default Loading;
