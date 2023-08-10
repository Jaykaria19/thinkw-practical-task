import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './page-components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import Register from './pages/register';
import AddBook from './pages/add-book';
import store from './store/store';
import { Provider } from 'react-redux';
import BookList from './page-components/Dashboard/BookList';
import { RootState } from './store/userSlice';

const PrivateRoute = ({ element, ...rest }:any) => {
  const storedEmail = localStorage.getItem('userEmail');
  const storedPassword = localStorage.getItem('userPassword');
  return storedEmail && storedPassword ? element : <Navigate to="/" />;
};


function App() {
  return (
    <>
    <ToastContainer />
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
         <Route path="/dashboard" element={<PrivateRoute element={<BookList />} />} />
        <Route path='/add-book' element={<AddBook />}/>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
