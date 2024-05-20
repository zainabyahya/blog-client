const initialState = {
    allCategories: [],
    singleCategory: {},
    newCategory: {},
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "categories/fetch":
            return { ...state, allCategories: action.payload };
        case "categories/add":
            return { ...state, newCategory: action.payload };
        case "categories/getById":
            return { ...state, singleCategory: action.payload };
        default:
            break;
    }
    return state;

}

export default categoryReducer;
