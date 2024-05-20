import axios from "axios";

const BASE_URL = "http://localhost:8000"

export function fetchComments() {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${BASE_URL}/comments`);
            dispatch({ type: "comments/fetch", payload: res.data.allComments });
        } catch (error) {
            console.error("Error fetching comments :", error);
        }
    };
}

export function addComment(token, newComment) {
    console.log("🚀 ~ addComment ~ token:", token)
    console.log("🚀 ~ addComment ~ newComment:", newComment)
    return async (dispatch) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };
            const res = await axios.post(
                `http://localhost:8000/comments`, newComment, { headers }
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
            const res = await axios.get(`${BASE_URL}/comments/post/${postId}`);
            dispatch({ type: "comments/getByPost", payload: res.data.foundComments });
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };
}

export function deleteComment(commentId) {
    return async (dispatch) => {
        try {
            await axios.delete(
                `${BASE_URL}/comments/${commentId}`
            );
            dispatch({ type: "comments/delete", payload: commentId });
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };
}