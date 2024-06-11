// import instance from "../utils/api";
// import decodeJWT from "../utils/jwt";



// export const checkForToken = (receivedToken) => {
//     if (receivedToken) {
//         instance.defaults.headers.common.Authorization = `Bearer ${receivedToken}`
//         localStorage.setItem("token", receivedToken);
//         const decodedToken = decodeJWT(receivedToken);
//         return decodedToken
//     }
//     return null;
// }

// export function loginUser(email, password) {
//     return async (dispatch) => {
//         try {
//             const res = await instance.post(`/auth/login`, { email, password });
//             const receivedToken = res.data;
//             const token = checkForToken(receivedToken)
//             dispatch({ type: "auth/loginSuccess", payload: token });
//         } catch (error) {
//             console.error("Error logging in:", error);
//         }
//     };
// }

// export const signUpUser = ({ formData }) => {
//     return async (dispatch) => {
//         try {

//             const res = await instance.post('/auth/signup', formData);
//             const receivedToken = res.data;
//             const token = checkForToken(receivedToken)
//             dispatch({ type: 'auth/signupSuccess', payload: token });
//         } catch (error) {
//             console.error('Error signing up:', error);
//         }

//     };
// };


// export function logoutUser() {
//     return async (dispatch) => {
//         try {
//             localStorage.removeItem('token')
//             dispatch({ type: "auth/logout" });
//         } catch (error) {
//             console.error("Error logging out:", error);
//         }
//     };
// }
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from "../utils/api";
import decodeJWT from "../utils/jwt";

const initialState = {
    isAuthenticated: false,
    currentToken: null,
    user: null,
    loading: false,
    error: null,
};

export const checkForToken = (receivedToken) => {
    if (receivedToken) {
        instance.defaults.headers.common.Authorization = `Bearer ${receivedToken}`
        localStorage.setItem("token", receivedToken);
        const decodedToken = decodeJWT(receivedToken);
        return decodedToken
    }
    return null;
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await instance.post(`/auth/login`, { email, password });
            const receivedToken = res.data;
            const token = checkForToken(receivedToken);
            return token;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const signUpUser = createAsyncThunk(
    'auth/signUpUser',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await instance.post('/auth/signup', formData);
            const receivedToken = res.data;
            const token = checkForToken(receivedToken);
            return token;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem('token');
            return null;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.currentToken = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.currentToken = action.payload;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.currentToken = null;
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
