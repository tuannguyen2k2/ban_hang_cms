import { all } from 'redux-saga/effects';
import accountSaga from './account';
const sagas = [accountSaga()];

function* rootSaga() {
    yield all(sagas);
}

export default rootSaga;
