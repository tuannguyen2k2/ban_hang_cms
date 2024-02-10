import { ConfigProvider } from 'antd';
import AppRoutes from './routes/routes';

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: 'Mulish',
                },
            }}
        >
            <AppRoutes />
        </ConfigProvider>
    );
}

export default App;
