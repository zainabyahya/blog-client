const initialState = {
    allActivities: [],
    newActivity: {},
    foundActivities: [],
}

const activityReducer = (state = initialState, action) => {
    switch (action.type) {
        case "activities/fetch":
            return {
                ...state, allactivities
                    : action.payload
            };
        case "activities/add":
            return { ...state, foundActivities: [...state.foundActivities, action.payload.newActivity] };
        case "activities/delete":
            return {
                ...state, allactivities
                    : [...state.postList.filter(activity => activity.id !== action.payload)]
            };
        case "activities/getByType":
            return {
                ...state, foundActivities
                    : action.payload
            };
        case "activities/geByPost":
            return {
                ...state, foundActivities
                    : action.payload
            };
        case "activities/getByUser":
            return {
                ...state, foundActivities
                    : action.payload
            };
        default:
            break;
    }
    return state;

}

export default activityReducer;
