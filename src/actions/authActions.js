import axios from "axios";

const BASE_URL = "http://localhost:8000";

export function loginUser(email, password) {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
            const token = res.data;
            localStorage.setItem("token", token);

            dispatch({ type: "auth/loginSuccess", payload: token });
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };
}

// reducers/authReducer.js

export const signUpUser = ({ formData }) => {
    return async (dispatch) => {
        try {

            const res = await axios.post('http://localhost:8000/auth/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const token = res.data;

            localStorage.setItem('token', token);


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
