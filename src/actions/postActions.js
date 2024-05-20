import axios from "axios";

const BASE_URL = "http://localhost:8000"
export function fetchPosts() {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${BASE_URL}/posts`);
            dispatch({ type: "posts/fetch", payload: res.data.allPosts });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
}

export function updatePost(updatedPost, token) {
    return async (dispatch) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };
            const res = await axios.put(
                `${BASE_URL}/posts/${updatedPost._id}`, updatedPost, { headers }
            );
            dispatch({ type: "posts/update", payload: res.data });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
}

export function deletePost(postId, token) {
    return async (dispatch) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };
            await axios.delete(
                `${BASE_URL}/posts/${postId}`, { headers }
            );
            dispatch({ type: "posts/delete", payload: postId });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
}
export function addPost(token, newPost) {
    return async (dispatch) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };
            const res = await axios.post(
                `http://localhost:8000/posts`, newPost, { headers }
            );
            dispatch({ type: "posts/add", payload: res.data });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
}

export function getPostByCategory(categoryId) {
    console.log("🚀 ~ getPostByCategory ~ categoryId:", categoryId)
    return async (dispatch) => {
        try {
            const res = await axios.get(`${BASE_URL}/posts/category/${categoryId}`);
            console.log("🚀 ~ return ~ res.data:", res.data)
            dispatch({ type: "posts/getByCategory", payload: res.data.foundPosts });
            console.log("-------------------------------🚀 ~ return ~ res.data:", res.data)
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
}
export function getPostByAuthor(authorId) {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${BASE_URL}/posts/author/${authorId}`);
            dispatch({ type: "posts/getByAuthor", payload: res.data });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
}
export function getPostById(postId) {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${BASE_URL}/posts/${postId}`);
            dispatch({ type: "posts/getById", payload: res.data });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
}