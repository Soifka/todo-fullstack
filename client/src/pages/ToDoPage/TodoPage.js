import React, { useState, useEffect } from 'react';
import ToDoList from '../../components/ToDoList';
import { addNewTask, getTasks } from '../../api/taskApi';
import { useNavigate } from 'react-router-dom';
import AddTaskForm from '../../components/AddTaskForm';


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

    const getAddedTask = (data) => {
        addNewTask({
            authorId: props.user._id,
            ...data
        }).then(({data}) => {
            setTodos([...todos, data]);
        })
    }
    

    return (
        <div>
            <AddTaskForm sendData={getAddedTask} />
            <h1>ToDo List</h1>
            {/* добавить форму для добавления новой задачи */}
            <ToDoList todos={todos} />
        </div>
    );
}

export default TodoPage;
