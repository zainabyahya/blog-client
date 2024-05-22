import instance from "../utils/api";


export function getUsers() {
    return async (dispatch) => {
        try {
            const res = await instance.get(`/users`);
            dispatch({ type: "users/fetch", payload: res.data.allUsers });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
}

export function getUserById(userId) {
    return async (dispatch) => {
        try {
            const res = await instance.get(`/users/${userId}`);
            dispatch({ type: "users/getById", payload: res.data.foundUser });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
}


export function updateUser(updatedUser) {
    return async (dispatch) => {
        try {
            const res = await instance.put(
                `/users/${updatedUser._id}`, updatedUser
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
            await instance.delete(
                `/users/${userId}`
            );
            dispatch({ type: "users/delete", payload: userId });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
}