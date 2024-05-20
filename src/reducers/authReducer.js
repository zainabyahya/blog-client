
const initialState = {
    isAuthenticated: false,
    currentToken: null,
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "auth/loginSuccess":
            return {
                ...state,
                isAuthenticated: true,
                currentToken: action.payload,
            };
        case 'auth/signupSuccess':
            return {
                ...state,
                isAuthenticated: true,
                currentToken: action.payload,
            };
        case "auth/logout":
            localStorage.removeItem('token');

            return {
                ...state,
                isAuthenticated: false,
                currentToken: null,
            };
        default:
            return state;
    }
};



export default authReducer;