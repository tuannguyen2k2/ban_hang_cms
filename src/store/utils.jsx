import axios from 'axios';
import { call, cancelled } from 'redux-saga/effects';
import { sendRequest } from '../services/api';

function makeAction(actionType) {
    const newAction = (payload) => ({
        type: actionType,
        payload,
    });
    newAction.type = actionType;

    return newAction;
}

export const createSuccessActionType = (type) => `${type}_SUCCESS`;
export const createFailureActionType = (type) => `${type}_FAILURE`;

export function createAction(actionType, options) {
    const rootAction = makeAction(actionType);

    // refactor
    if (options?.success) {
        rootAction.success = makeAction(createSuccessActionType(actionType));
    }

    if (options?.fail) {
        rootAction.fail = makeAction(createFailureActionType(actionType));
    }

    return rootAction;
}

export function* processAction(options, { payload }) {
    const { onError, onCompleted } = payload;
    const cancelTokenSource = axios.CancelToken.source();

    try {
        const response = yield call(sendRequest, options, payload, cancelTokenSource.token);

        if (!response?.data.result) throw response;

        onCompleted?.(response);
    } catch (error) {
        onError?.(error);
    } finally {
        if (yield cancelled()) {
            cancelTokenSource.cancel();
        }
    }
}
