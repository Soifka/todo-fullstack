import React from 'react';
import ToDoItem from '../ToDoItem';

const ToDoList = (props) => {
    return (
        <div>
            {props.todos.map(todo => <ToDoItem item={todo} key={todo._id} delete={props.delCallback} />)}
        </div>
    );
}

export default ToDoList;
