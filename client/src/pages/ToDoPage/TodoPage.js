import React, { useState, useEffect } from 'react';
import ToDoList from '../../components/ToDoList';
import { addNewTask, getTasks, deleteTask } from '../../api/axiosApi';
import AddTaskForm from '../../components/AddTaskForm';


const TodoPage = (props) => {
    const [todos, setTodos] = useState([]);
    
    useEffect(() => {
        getTasks()
        .then(({data: {data}}) => {
            setTodos(data);
        })
        .catch(error => {
            console.error(error);
        })
    }, []);

    const getAddedTask = (data) => {
        addNewTask(data)
        .then(({data: {data: createdTask}}) => {
            setTodos([...todos, createdTask]);
        })
    }

    const delTask = (id) => {
        deleteTask(id)
        .then(({data: {data: deletedTask}}) => {
            const updatedTasks = todos.filter(todo => todo._id !== deletedTask._id);
            setTodos(updatedTasks);
        })
        .catch(error => {
            console.log(error);
        })
    }
    

    return (
        <div>
            {/* форма для добавления новой задачи */}
            <AddTaskForm sendData={getAddedTask} />
            <h1>ToDo List</h1>
            <ToDoList todos={todos} delCallback={delTask} />
        </div>
    );
}

export default TodoPage;
