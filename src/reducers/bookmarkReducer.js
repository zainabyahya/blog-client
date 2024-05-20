const initialState = {
    allBookmarks: [],
    newBookmark: {},
}

const bookmarkReducer = (state = initialState, action) => {
    switch (action.type) {
        case "bookmarks/fetch":
            return {
                ...state, allBookmarks
                    : action.payload
            };
        case "bookmarks/add":
            return { ...state, allBookmarks: [...state.allBookmarks, action.payload.newBookmark] };
        case "bookmarks/delete":
            return {
                ...state, allBookmarks
                    : [...state.allBookmarks.filter(bookmark => bookmark.id !== action.payload)]
            };
        default:
            break;
    }
    return state;
}

export default bookmarkReducer;
