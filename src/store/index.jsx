import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slice/accountSlice';
import appReducer from './slice/appSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        account: accountReducer,
        app: appReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export default store;
