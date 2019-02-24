import AT from './actions-types';

let actions = {};
for (const key in AT) {
    const actionType = AT[key];
    const actionName = AT[key].split('_').map((name, index) => {
        return index !== 0
            ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
            : name.toLowerCase();
    }).join('');
    actions[actionName] = payload => ({type: actionType, payload});
};

export default actions;
