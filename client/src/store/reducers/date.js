import AT from 'store/actions-types';

const initialState = {
    year: null,
    month: null,
    day: null
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case AT.DATE_ADD:
            return payload;
        default:
            return state;
    }
}
