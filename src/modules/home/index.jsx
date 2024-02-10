import { Navigate } from 'react-router-dom';
import routes from '../../routes';

const HomePage = () => {
    return <Navigate to={routes.categoryListPage.path} />;
};

export default HomePage;
