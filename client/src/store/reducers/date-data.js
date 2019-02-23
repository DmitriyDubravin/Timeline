import AT from 'store/actions-types';

const initialState = {};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case AT.DATE_ADD:
            return payload;
        default:
            return state;
    }
}
