import React, {useState} from 'react';
import { BrowserRouter, Routes, Route, redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
//import TodoPage from './pages/ToDoPage/TodoPage';
import Dashboard from './components/Dashboard';
import './App.css';
import history from './BrowserHistory';


function App() {

  const [user, setUser] = useState(null);

  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route path="/" element={<Home sendUser={setUser} />} />
        <Route path="/tasks/" element={<Dashboard user={user} sendUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
