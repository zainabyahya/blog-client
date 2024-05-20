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
            return { ...state, newPost: action.payload };
        case "posts/delete":
            return { ...state, allPosts: [...state.postList.filter(post => post.id !== action.payload)] };
        case "posts/update":
            return { ...state, allPosts: action.payload };
        case "posts/getById":
            return { ...state, singlePost: action.payload };
        case "posts/getByAuthor":
            return { ...state, foundPosts: action.payload };
        case "posts/geByCategory":
            return { ...state, foundPosts: action.payload };
        default:
            break;
    }
    return state;

}

export default postReducer;
