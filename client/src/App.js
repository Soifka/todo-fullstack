import React, { useEffect } from 'react';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import TodoPage from './pages/ToDoPage/TodoPage';
import history from './BrowserHistory';
import { connect } from 'react-redux';
import { authUserRequest } from './actions/actionCreator';
import './App.css';


function App(props) {

  useEffect(() => {
    if(!props.user) {
      props.authUserRequest();
    }
  }, [])

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks/" element={<TodoPage />} />
      </Routes>
    </HistoryRouter>
  );
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = {
  authUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(App);