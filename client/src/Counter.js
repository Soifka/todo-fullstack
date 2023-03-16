import { connect } from 'react-redux';
import { incrementAction, decrementAction, setStepAction, toggleThemeAction } from './actions/actionCreator';


const Counter = (props) => {

    const onSetStep = ({target: {value}}) => {
        props.setStep(Number(value));
    }

    const toggleTheme = () => {
        props.toggleTheme();
    }

    console.log(props)

    return (
        <>
            <div style={{backgroundColor: props.themes.isDarkMode ? 'grey' : 'white'}}>
                <h1>{props.counter.counter}</h1>
                <input type="number" name="step" onChange={onSetStep} value={props.counter.step} />
                <button onClick={props.decrement}>Decrem</button>
                <button onClick={props.increment}>Increm</button>
                <button onClick={toggleTheme}>{props.themes.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}</button>
            </div>
        </>
    );
};

/*
connect - это функция, которая принимает 2 аргумента (оба опциональны) 
и подписывает компонент на обновление стейта:

1) mapStateToProps - функция, которая принимает ВЕСЬ стейт, а возвращает только ту часть стейта, 
которая нужна этому конкретному компоненту;

2) mapDispatchToProps - функция, которая принимает dispatch и возвращает объект, 
в котором все action creators обернуты в dispatch
*/

const mapStateToProps = (state) => {
    return state;
};

/* 
mapDispatchToProps в виде функции -->
const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch(createActionIncrement()),
        decrement: () => dispatch(createActionDecrement()),
        setStep: (value) => dispatch(setStepAction(value)),
        toggleTheme: () => dispatch(toggleThemeAction())
    }
}
*/

// mapDispatchToProps в виде объекта (это более кратко) -->
const mapDispatchToProps = {
    increment: incrementAction,
    decrement: decrementAction,
    setStep: setStepAction,
    toggleTheme: toggleThemeAction
}

const WrappedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter); 
/* каррирование функции --> 
трансформация функции следующим образом: func(a, b, c) --> func(a)(b)(c) */

export default WrappedCounter;
