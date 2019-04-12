const reducer2 = (state = {
    value1 : '' , 
    value2 : '' ,
    email : '',
    uname : '' ,
    password : ''
}, action) => {
    switch(action.type) {
         case 'FIRST_LAST_NAME' :
            state = {
                ...state , 
                  [action.name] : action.payload
            };
            return state;
        case 'EMAIL' :
            state = {
                ...state , 
                email: action.payload
            };
            return state; 
        case 'SNAME' :
            state = {
                ...state,
                sname : action.payload
            }
            return state;
            case 'PASSWORD' :
            state = {
                ...state,
                password : action.payload
            }
            return state;
        default:
            return state;
    }
}

export default reducer2;

