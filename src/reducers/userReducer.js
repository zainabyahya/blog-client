const initialState = {
    allUsers: [],
    singleUser: {},

}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "users/fetch":
            return { ...state, allUsers: action.payload };
        case "users/delete":
            return { ...state, allUsers: [...state.allUsers.filter(user => user._id !== action.payload)] };
        case "users/update":
            return { ...state, allUsers: action.payload };
        case "users/getById":
            return { ...state, singleUser: action.payload };
        default:
            break;
    }
    return state;
}

export default userReducer;

