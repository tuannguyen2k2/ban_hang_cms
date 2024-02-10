import dayjs from 'dayjs';
import { DEFAULT_FORMAT_TIME } from '../constants';

export const convertIsoToLocalTime = (date) => {
    return dayjs(date).format(DEFAULT_FORMAT_TIME);
};
