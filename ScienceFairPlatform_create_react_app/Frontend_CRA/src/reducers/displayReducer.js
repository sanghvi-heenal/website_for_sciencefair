const reducer = (state = {
    showComponent: false
}, action) => {
    switch(action.type) {
        case 'DISPLAY_FORM':
            state = {
                ...state,
                showComponent: !state.showComponent
            };
            console.log('reducer: ', state, state.showComponent)
            return state;
            
        default:
            return state;
    }
}

export default reducer;