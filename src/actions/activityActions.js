import axios from "axios";

const BASE_URL = "http://localhost:8000"

export function fetchActivities() {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${BASE_URL}/activities`);
            dispatch({ type: "activities/fetch", payload: res.data.allActivities });
        } catch (error) {
            console.error("Error fetching actvities :", error);
        }
    };
}

export function addActivity(token, newActivity) {
    return async (dispatch) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };
            const res = await axios.post(
                `http://localhost:8000/activities/`, newActivity, { headers }
            );
            dispatch({ type: "activities/add", payload: res.data });
        } catch (error) {
            console.error("Error fetching activities:", error);
        }
    };
}

export function getActivityByUser(userId) {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${BASE_URL}/activities/user/${userId}`);
            dispatch({ type: "activities/getByUser", payload: res.data });
        } catch (error) {
            console.error("Error fetching activities:", error);
        }
    };
}
export function getActivityByType(postId, type) {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${BASE_URL}/activities/${postId}/${type}`);
            dispatch({ type: "activities/getByType", payload: res.data.foundActivities });
        } catch (error) {
            console.error("Error fetching activities:", error);
        }
    };
}
export function getActivityByPost(postId) {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${BASE_URL}/activities/${postId}`);
            dispatch({ type: "activities/getByPost", payload: res.data });
        } catch (error) {
            console.error("Error fetching activities:", error);
        }
    };
}

export function deleteActivity(activityId) {
    return async (dispatch) => {
        try {
            await axios.delete(
                `${BASE_URL}/activities/${activityId}`
            );
            dispatch({ type: "activities/delete", payload: activityId });
        } catch (error) {
            console.error("Error fetching activities:", error);
        }
    };
}