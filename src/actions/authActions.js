import instance from "../utils/api";
import decodeJWT from "../utils/jwt";



export const checkForToken = (receivedToken) => {
    if (receivedToken) {
        instance.defaults.headers.common.Authorization = `Bearer ${receivedToken}`
        localStorage.setItem("token", receivedToken);
        const decodedToken = decodeJWT(receivedToken);
        return decodedToken
    }
    return null;
}

export function loginUser(email, password) {
    return async (dispatch) => {
        try {
            const res = await instance.post(`/auth/login`, { email, password });
            const receivedToken = res.data;
            const token = checkForToken(receivedToken)
            dispatch({ type: "auth/loginSuccess", payload: token });
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };
}

export const signUpUser = ({ formData }) => {
    return async (dispatch) => {
        try {

            const res = await instance.post('/auth/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const receivedToken = res.data;
            const token = checkForToken(receivedToken)
            console.log("🚀 ~ return ~ receivedToken:", receivedToken)
            dispatch({ type: 'auth/signupSuccess', payload: token });
        } catch (error) {
            console.error('Error signing up:', error);
        }

    };
};


export function logoutUser() {
    return async (dispatch) => {
        try {
            localStorage.removeItem('token')
            dispatch({ type: "auth/logout" });
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
}
