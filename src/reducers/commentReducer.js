const initialState = {
    allComments: [],
    newComment: {},
    foundComments: [],
}

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case "comments/fetch":
            return {
                ...state,
                allComments: action.payload
            };
        case "comments/add":
            return {
                ...state,
                foundComments: [...state.foundComments, action.payload.newComment]
            };
        case "comments/delete":
            return {
                ...state,
                allComments: state.allComments.filter(comment => comment.id !== action.payload)
            };
        case "comments/getByPost":
            return {
                ...state,
                foundComments: action.payload
            };
        default:
            return state;
    }
}

export default commentReducer;
