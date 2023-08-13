import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
 import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../../store/userSlice';

interface RegisterFormValues {
  email: string;
  password: string;
}

const UserRegister = () => {



  const users = useSelector((state:any) => state?.user?.user);
  const isLoggedIn = useSelector((state:any) => state?.user?.isLoggedIn);

  const initialValues: RegisterFormValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .required('Required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one special character, one digit, and be at least 6 characters long'
      ),
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values: RegisterFormValues) => {    
    toast.success('You are registered successfully!', {
      position: toast.POSITION.TOP_RIGHT,
    });
     dispatch(setUser(values)); // Dispatch the addUser action
   };

  // const handleLogout = () => {
  //   dispatch(clearUser());
  // };


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="md:text-3xl text-2xl text-black pb-10 font-semibold">Create Your Account</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <div className="mb-5">
              <label htmlFor="email" className="text-xl">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="border border-black text-black placeholder:text-gray-400 w-full p-2 mt-2 rounded-xl"
              />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="text-xl pb-3">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="*******"
                className="border border-black text-black placeholder:text-gray-400 w-full p-2 mt-2 rounded-xl"
              />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
            <button type="submit" className="bg-blue-500 px-5 py-3 rounded-xl text-white w-full">
              Register
            </button>

            <div className='flex justify-between items-center mt-5'>
              <p>Have you already register</p>
              <Link to={"/"} className='text-blue-500'>
                Login
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default UserRegister;
