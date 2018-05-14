export default (state = [], actions) => {
    switch (actions.type) {
        case 'addresult':
            return [...state.slice(0), actions.data];
        case 'clearresult':
            return [];
        default:
            return state;
    }
}