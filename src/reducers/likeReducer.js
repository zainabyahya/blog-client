const initialState = {
    allLikes: [],
    postById: null,
}

const likeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "likes/fetch":
            return {
                ...state,
                allLikes: action.payload,
            };
        case "likes/handle":
            return {
                ...state,
                postById: action.payload,
            };
        case "likes/delete":
            return {
                ...state,
                allLikes: state.allLikes.map(like =>
                    like._id === action.payload.likeId
                        ? { ...like, users: like.users.filter(user => user !== action.payload.user) }
                        : like
                ),
                postById: action.payload
            };
        default:
            return state;
    }
}

export default likeReducer;
