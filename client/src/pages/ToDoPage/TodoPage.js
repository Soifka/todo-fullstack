import React, { useEffect } from 'react';
import ToDoList from '../../components/ToDoList';
import AddTaskForm from '../../components/AddTaskForm';
import { getTasksRequest, createTaskRequest, deleteTaskRequest, logoutRequest } from '../../actions/actionCreator';
import { connect } from 'react-redux';


const TodoPage = (props) => {
    
    useEffect(() => {
        props.getTasksRequest();
    }, []);

    const getAddedTask = (data) => {
        props.createTaskRequest({
            //status: 'new',
            ...data
        })
    }

    const delTask = (id) => {
        props.deleteTaskRequest(id);
    }

    const logoutHandler = () => {
        props.logoutRequest();
    }

    return (
        <div>
            <button onClick={logoutHandler}>Logout</button>
            {/* форма для добавления новой задачи */}
            <AddTaskForm sendData={getAddedTask} />
            <h1>ToDo List</h1>
            <ToDoList todos={props.tasks} delCallback={delTask} />
        </div>
    );
}

const mapStateToProps = ({tasks}) => ({tasks});

const mapDispatchToProps = {
    getTasksRequest,
    createTaskRequest,
    deleteTaskRequest,
    logoutRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
