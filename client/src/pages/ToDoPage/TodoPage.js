import React, { useState, useEffect } from 'react';
import ToDoList from '../../components/ToDoList';
import { getTasks } from '../../api/taskApi';
import { useNavigate } from 'react-router-dom';

const TodoPage = (props) => {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(!props.user) {
            return navigate('/');
        }
        getTasks(props.user._id)
        .then(result => {
            setTodos(result.data);
        })
        .catch(error => {
            console.error(error);
        })
    }, []);

    return (
        <div>
            <h1>ToDoList</h1>
            <ToDoList todos={todos} />
        </div>
    );
}

export default TodoPage;
