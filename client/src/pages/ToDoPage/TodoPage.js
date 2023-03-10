import React, { useState, useEffect } from 'react';
import ToDoList from '../../components/ToDoList';
import { addNewTask, getTasks, deleteTask } from '../../api/taskApi';
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

    const delTask = (id) => {
        deleteTask(id)
        .then(({data: deletedTask}) => {
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
