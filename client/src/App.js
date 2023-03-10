import React, { useState, useEffect } from 'react';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route, redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import TodoPage from './pages/ToDoPage/TodoPage';
import history from './BrowserHistory';
import { authUser } from './api/userApi';
import './App.css';


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    if(!user) {
            authUser()
            .then(userData => {
                setUser(userData.data);
            }).catch(error => {
                history.push('/');
            })
        } 
    }, [])

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Home sendUser={setUser} />} />
        <Route path="/tasks/" element={<TodoPage user={user} />} />
      </Routes>
    </HistoryRouter>
  );
};

export default App;
