import { ACTION_TYPES } from './actionTypes';

export const incrementAction = () => {
    return ({
        type: ACTION_TYPES.COUNTER_INCREMENT
    })
}

export const decrementAction = () => {
    return ({
        type: ACTION_TYPES.COUNTER_DECREMENT
    })
}

export const setStepAction = (value) => {
    return ({
        type:  ACTION_TYPES.SET_COUNTER_STEP,
        value // эта запись = value: value
    })
}
