import { Button, Form } from 'antd';
import Title from 'antd/es/typography/Title';
import styles from './signIn.module.scss';
import locales from '../../locales';
import InputTextField from '../../components/form/InputTextField';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import useFetch from '../../hooks/useFetch';
import apiConfig from '../../constants/apiConfig';
import { setCacheAccessToken } from '../../services/userService';
import { setData } from '../../utils/localStorage';
import { storageKeys } from '../../constants';
import useNotification from '../../hooks/useNotification';
import useFetchAction from '../../hooks/useFetchAction';
import { getProfile } from '../../store/slice/accountSlice';
export const SignInPage = () => {
    const { execute, loading } = useFetch(apiConfig.auth.signIn);
    const { execute: executeGetProfile } = useFetchAction(getProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });
    const notification = useNotification();
    const onFinish = (values) => {
        execute({
            data: values,
            onCompleted: (res) => {
                setCacheAccessToken(res?.data?.access_token);
                setData(storageKeys.USER_ROLE, res?.data?.role);
                executeGetProfile();
            },
            onError: (error) => {
                console.log(error);
                notification({ type: 'error', message: locales.signInFailed });
            },
        });
    };

    return (
        <div className={styles.signInPage}>
            <div className={styles.signInForm}>
                <Title level={3}>{locales.signIn.toUpperCase()}</Title>
                <Form name='login-form' onFinish={onFinish} layout='vertical'>
                    <InputTextField
                        name='username'
                        fieldProps={{ prefix: <UserOutlined /> }}
                        placeholder={locales.usernamePlaceHolder}
                        size='large'
                        required
                    />
                    <InputTextField
                        name='password'
                        fieldProps={{ prefix: <LockOutlined /> }}
                        placeholder={locales.passwordPlaceHolder}
                        size='large'
                        required
                        type='password'
                    />

                    <Button type='primary' size='large' loading={loading} htmlType='submit' style={{ width: '100%' }}>
                        {locales.signIn}
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default SignInPage;
