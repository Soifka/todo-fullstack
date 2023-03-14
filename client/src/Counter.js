import React, { useReducer, useState } from 'react';

/*
const Counter = () => {
    const [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter(counter + 1);
    };

    const decrement = () => {
        setCounter(counter - 1);
    };

    return (
        <>
            <h1>{counter}</h1>
            <button onClick={increment}>Increm</button>
            <button onClick={decrement}>Decrem</button>
        </>
    );
}
*/


    function reducer(state, action) {
        switch (action.type) {
            case 'COUNTER_PLUS':
                return {counter: state.counter + 1};
            case 'COUNTER_MINUS':
                return {counter: state.counter - 1};
            default:
                return state;
        }
    }

const Counter = () => {
    const initialState = {counter: 0};
    const [state, dispatch] = useReducer(reducer, initialState);
    //const [state, dispatch] = useReducer(reducer, {counter: 0});

    const increment = () => {
        const action = {
            type: 'COUNTER_PLUS'
        }
        dispatch(action);
    };

    const decrement = () => {
        const action = {
            type: 'COUNTER_MINUS'
        }
        dispatch(action);
    };

    return (
        <>
            <h1>{state.counter}</h1>
            <button onClick={decrement}>Decrem</button>
            <button onClick={increment}>Increm</button>
        </>
    );
}


export default Counter;
