const initialState = {
    allBookmarks: [],
    userBookmarks: {},
    newBookmark: {},
}

const bookmarkReducer = (state = initialState, action) => {
    switch (action.type) {
        case "bookmarks/fetch":
            return {
                ...state, allBookmarks
                    : action.payload
            };
        case "bookmarks/fetchByUser":
            return {
                ...state, userBookmarks
                    : action.payload
            };
        case "bookmarks/handleBookmark":
            // return { ...state, allBookmarks: [...state.allBookmarks, action.payload.newBookmark] };
            return {
                ...state, userBookmarks
                    : action.payload
            };
        case "bookmarks/delete":
            return {
                ...state,
                allBookmarks: state.allBookmarks.map(bookmark =>
                    bookmark._id === action.payload.bookmarkId
                        ? { ...bookmark, posts: bookmark.posts.filter(post => post !== action.payload.postId) }
                        : bookmark
                )
            };
        default:
            break;
    }
    return state;
}

export default bookmarkReducer;
