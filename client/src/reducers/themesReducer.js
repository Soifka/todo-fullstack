import { ACTION_TYPES } from "../actions/actionTypes";

const initialState = {
    isDarkMode: false
}

const themesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.TOGGLE_THEME: 
            return {
                ...state,
                isDarkMode: !state.isDarkMode
            }
        default:
            return state;
    }
}

export default themesReducer;