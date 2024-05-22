
const initialState = {
    isAuthenticated: false,
    currentToken: null,
    user: null,
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "auth/loginSuccess":
            return {
                ...state,
                isAuthenticated: true,
                currentToken: action.payload,
                user: action.payload,

            };
        case "auth/getUser":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case 'auth/signupSuccess':
            return {
                ...state,
                isAuthenticated: true,
                currentToken: action.payload,
                user: action.payload,

            };
        case "auth/logout":
            localStorage.removeItem('token');

            return {
                ...state,
                user: null, // Clear the user state on logout
                isAuthenticated: false,
                currentToken: null,
            };
        default:
            return state;
    }
};



export default authReducer;