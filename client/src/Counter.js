import React, { useReducer, useState } from 'react';
import { connect } from 'react-redux';


const Counter = (props) => {

    const increment = () => {
        const action = {
            type: 'COUNTER_PLUS'
        }
        props.dispatch(action);
    };

    const decrement = () => {
        const action = {
            type: 'COUNTER_MINUS'
        }
        props.dispatch(action);
    };

    console.log(props)

    return (
        <>
            <h1>{props.counter}</h1>
            <button onClick={decrement}>Decrem</button>
            <button onClick={increment}>Increm</button>
        </>
    );
};

/*
connect - это функция, которая принимает 2 аргумента (оба опциональны) 
и подписывает компонент на обновление стейта:

1) mapStateToProps - функция, которая принимает ВЕСЬ стейт, а возвращает только ту часть стейта, 
которая нужна этому конкретному компоненту;

2) mapDispatchToProps
*/

const mapStateToProps = (state) => {
    return state;
};

const WrappedCounter = connect(mapStateToProps)(Counter); 
/* каррирование функции --> 
трансформация функции func(a, b, c) --> func(a)(b)(c) */

export default WrappedCounter;
