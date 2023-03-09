import React, { useState, useEffect } from 'react';
import ToDoList from '../../components/ToDoList';
import { addNewTask, getTasks } from '../../api/taskApi';
import AddTaskForm from '../../components/AddTaskForm';


const TodoPage = (props) => {
    const [todos, setTodos] = useState([]);
    
    useEffect(() => {
        getTasks()
        .then(result => {
            setTodos(result.data);
        })
        .catch(error => {
            console.error(error);
        })
    }, []);

    const getAddedTask = (data) => {
        addNewTask(data)
        .then(({data}) => {
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
