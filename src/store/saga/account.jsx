import { takeLatest } from 'redux-saga/effects';
import { processAction } from '../utils';
import apiConfig from '../../constants/apiConfig';
import { login, getProfile } from '../slice/accountSlice';

function* loginSaga(payload) {
    yield processAction(apiConfig.auth.signIn, payload);
}

function* getProfileSaga(payload) {
    yield processAction(apiConfig.user.getProfile, payload);
}
function* accountSagas() {
    yield takeLatest(login.type, loginSaga);
    yield takeLatest(getProfile.type, getProfileSaga);
}

export default accountSagas;
