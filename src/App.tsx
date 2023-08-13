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
import Dashboard from './pages/dashboard';
import EditBook from './pages/edit-book';

const PrivateRoute = ({ element, ...rest }:any) => {
  const users = useSelector((state:any) => state.userSlice.users);
  return users.length > 0  ? element : <Navigate to="/" /> 
};


function App() {
  return (
    <>
    <ToastContainer autoClose={1000}/>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path='/add-book' element={<PrivateRoute element={<AddBook/>}/>} />
        <Route path='/edit-book/:id' element={<PrivateRoute element={<EditBook/>}/>}/>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
