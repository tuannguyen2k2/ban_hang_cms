import { Header } from 'antd/es/layout/layout';
import styles from './AppHeader.module.scss';
import logo from '/logo.png';
const AppHeader = () => {
    return (
        <Header style={{ background: 'white' }}>
            <div className={styles.logo}>
                <img style={{ width: '60px' }} src={logo} alt='Logo' />
            </div>
            <div className={styles.brand}>MẠNH PHÁT</div>
        </Header>
    );
};

export default AppHeader;
