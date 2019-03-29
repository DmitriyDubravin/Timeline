import AT from 'store/actions-types';

const initialState = [];

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case AT.USERS_ADD:
            return payload.data;
        default:
            return state;
    }
}
