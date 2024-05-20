import axios from "axios";

const BASE_URL = "http://localhost:8000"

export function fetchCategories() {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${BASE_URL}/categories`);
            dispatch({ type: "categories/fetch", payload: res.data.allCategories });
        } catch (error) {
            console.error("Error fetching categories :", error);
        }
    };
}

export function addCategory(token, newCategory) {
    return async (dispatch) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };
            const res = await axios.post(
                `http://localhost:8000/categories`, newCategory, { headers }
            );
            dispatch({ type: "categories/add", payload: res.data });
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
}

export function getCategoryById(categoryId) {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${BASE_URL}/${categoryId}`);
            dispatch({ type: "categories/getById", payload: res.data });
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
}