import { ACTION_TYPES } from "./actions/actionTypes";

const initialState = {
    counter: 0,
    step: 1
  };  

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_TYPES.COUNTER_INCREMENT:
        return {
          ...state,
          counter: state.counter + state.step
        }
      case ACTION_TYPES.COUNTER_DECREMENT:
        return {
          ...state,
          counter: state.counter - state.step
        }
      case ACTION_TYPES.SET_COUNTER_STEP:
        return {
          ...state,
          step: action.value
        }    
      default:
        return state;
    }
  };

  export default reducer;