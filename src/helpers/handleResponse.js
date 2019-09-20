import { STATUS_FAILED } from '../actions/types';

export const checkForErrors = response => {
    const { status } = response.data;

    if (!status) {
        const { message } = response.data;
        return message ? message : 'Request Could not be made. Please try again later';
    }

    if (status === STATUS_FAILED) {
        const { message } = response.data.response;
        return message ? message : 'Request Could not be made. Please try again later'
    }

    return;
}
