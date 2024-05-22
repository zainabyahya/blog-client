import instance from "../utils/api";


export function fetchCategories() {
    return async (dispatch) => {
        try {
            const res = await instance.get(`/categories`);
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
            const res = await instance.post(
                `/categories`, newCategory, { headers }
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
            const res = await instance.get(`/${categoryId}`);
            dispatch({ type: "categories/getById", payload: res.data });
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
}