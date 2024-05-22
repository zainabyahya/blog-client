import instance from "../utils/api";

export function fetchPosts() {
    return async (dispatch) => {
        try {
            const res = await instance.get(`/posts`);
            dispatch({ type: "posts/fetch", payload: res.data.allPosts });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
}

export function updatePost(updatedPost) {
    return async (dispatch) => {
        try {

            const res = await instance.put(
                `/posts/${updatedPost._id}`, updatedPost
            );
            dispatch({ type: "posts/update", payload: res.data });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
}

export function deletePost(postId) {
    return async (dispatch) => {
        try {
            await instance.delete(
                `/posts/${postId}`
            );
            dispatch({ type: "posts/delete", payload: postId });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
}
export function addPost(newPost) {
    return async (dispatch) => {
        try {
            const res = await instance.post(
                `/posts`, newPost
            );
            dispatch({ type: "posts/add", payload: res.data });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
}

export function getPostByCategory(categoryId) {
    return async (dispatch) => {
        try {
            const res = await instance.get(`/posts/category/${categoryId}`);
            dispatch({ type: "posts/getByCategory", payload: res.data.foundPosts });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
}
export function getPostByAuthor(authorId) {
    return async (dispatch) => {
        try {
            const res = await instance.get(`/posts/author/${authorId}`);
            dispatch({ type: "posts/getByAuthor", payload: res.data.foundPosts });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
}
export function getPostById(postId) {
    return async (dispatch) => {
        try {
            const res = await instance.get(`/posts/${postId}`);
            dispatch({ type: "posts/getById", payload: res.data });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
}