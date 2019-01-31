
export default [
    null,
    (dispatch, { closePopup }) => ({
        redirect() {
            closePopup();
        }
    })
];
