import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authUser } from '../../api/userApi';
import TodoPage from '../../pages/ToDoPage/TodoPage';

const Dashboard = (props) => {
    const [todo, setTodos] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(!props.user) {
            const token = localStorage.getItem('token');
            if(token) {
                authUser(token)
                .then(userData => {
                    props.sendUser(userData.data);
                }).catch(error => {
                    return navigate('/');
                })
            } else {
                navigate('/');
            }
        } else {
            setTodos(true); // это означает, что user есть и можно загружать todo list
        }
    }, [props.user])
    
    return (
        <>
            {todo ? <TodoPage /> : null}
        </>
    );
}

export default Dashboard;
