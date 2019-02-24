import AT from 'store/actions-types';

const initialState = {
    name: undefined,
    token: undefined,
    isAuthorized: undefined
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case AT.USER_ADD:
            return payload;
        default:
            return state;
    }
}
