import instance from "../utils/api";


export function fetchLikes() {
    return async (dispatch) => {
        try {
            const res = await instance.get(`/likes`);
            dispatch({ type: "likes/fetch", payload: res.data.allLikes });
        } catch (error) {
            console.error("Error fetching Likes :", error);
        }
    };
}

export function handleLike(newLike) {
    return async (dispatch) => {
        try {
            const res = await instance.post(
                `/likes`, newLike
            );
            dispatch({ type: "likes/add", payload: res.data.updatedPost });
        } catch (error) {
            console.error("Error fetching Likes:", error);
        }
    };
}
