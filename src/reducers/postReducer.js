const initialState = {
    allPosts: [],
    singlePost: {},
    newPost: {},
    foundPosts: [],
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case "posts/fetch":
            return { ...state, allPosts: action.payload };
        case "posts/add":
            return {
                ...state,
                allPosts: [...state.allPosts, action.payload.newPost]
            };
        case "posts/delete":
            return {
                ...state,
                allPosts: state.allPosts.filter(post => post._id !== action.payload)
            }
        case "posts/update":
            return { ...state, allPosts: action.payload };
        case "posts/getById":
            return {
                ...state,
                singlePost: action.payload

            };
        case "posts/getByAuthor":
            return { ...state, allPosts: action.payload };
        case "posts/getByCategory":
            return { ...state, allPosts: action.payload };

        // return {
        //     ...state,
        //     foundPosts: action.payload.foundPosts
        // };
        default:
            break;
    }
    return state;

}

export default postReducer;
