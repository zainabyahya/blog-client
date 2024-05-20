import axios from "axios";

const BASE_URL = "http://localhost:8000";

export function getUsers() {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${BASE_URL}/users`);
            dispatch({ type: "users/fetch", payload: res.data.allUsers });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
}

export function getUserById(userId) {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${BASE_URL}/users/${userId}`);
            dispatch({ type: "users/getById", payload: res.data });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
}


export function updateUser(updatedUser) {
    return async (dispatch) => {
        try {
            const res = await axios.put(
                `${BASE_URL}/users/${updatedUser._id}`, updatedUser
            );
            dispatch({ type: "users/update", payload: res.data });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
}

export function deleteUser(userId) {
    return async (dispatch) => {
        try {
            await axios.delete(
                `${BASE_URL}/users/${userId}`
            );
            dispatch({ type: "users/delete", payload: userId });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
}