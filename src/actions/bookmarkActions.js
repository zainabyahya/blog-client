import instance from "../utils/api";


export function fetchBookmarks() {
    return async (dispatch) => {
        try {
            const res = await instance.get(`/bookmark`);
            dispatch({ type: "bookmarks/fetch", payload: res.data.allBookmarks });
        } catch (error) {
            console.error("Error fetching bookmarks :", error);
        }
    };
}


export function fetchBookmarksByUser(userId) {
    return async (dispatch) => {
        try {
            const res = await instance.get(`/bookmark/${userId}`);
            dispatch({ type: "bookmarks/fetchByUser", payload: res.data.userBookmarks });
        } catch (error) {
            console.error("Error fetching bookmarks :", error);
        }
    };
}

export function handleBookrmark(newBookmark) {
    return async (dispatch) => {
        try {
            const res = await instance.post(
                `/bookmark`, newBookmark
            );
            console.log("🚀 ~ return ~ res:", res.data)
            dispatch({ type: "bookmarks/handleBookmark", payload: res.data });
        } catch (error) {
            console.error("Error fetching bookmarks:", error);
        }
    };
}


