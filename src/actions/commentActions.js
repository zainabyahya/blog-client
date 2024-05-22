import instance from "../utils/api";


export function fetchComments() {
    return async (dispatch) => {
        try {
            const res = await instance.get(`/comments`);
            dispatch({ type: "comments/fetch", payload: res.data.allComments });
        } catch (error) {
            console.error("Error fetching comments :", error);
        }
    };
}

export function addComment(token, newComment) {
    return async (dispatch) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };
            const res = await instance.post(
                `/comments`, newComment, { headers }
            );
            dispatch({ type: "comments/add", payload: res.data });
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };
}

export function getCommentsByPost(postId) {
    return async (dispatch) => {
        try {
            const res = await instance.get(`/comments/post/${postId}`);
            dispatch({ type: "comments/getByPost", payload: res.data.foundComments });
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };
}

export function deleteComment(commentId) {
    return async (dispatch) => {
        try {
            await instance.delete(
                `/comments/${commentId}`
            );
            dispatch({ type: "comments/delete", payload: commentId });
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };
}