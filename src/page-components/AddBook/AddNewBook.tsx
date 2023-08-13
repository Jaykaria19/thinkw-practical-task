import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setBookDetails } from '../../store/bookDetails';
import { useNavigate, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
 
const AddNewBook = () => {
  const initialValues = {
    Title: '',
    Author: '',
    Publication_Year: '',
    Genre: '',
  };
  const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    Title: Yup.string().required('Title is required'),
    Author: Yup.string().required('Author is required'),
    Publication_Year: Yup.number()
      .required('Year of publish is required')
      .integer('Year must be an integer')
      .min(1000, 'Year must be at least 1000')
      .max(new Date().getFullYear(), 'Year cannot be in the future'),
    Genre: Yup.string().required('Genre is required'),
  });
  const dispatch = useDispatch();
   const handleSubmit = (values : any) => {        
    dispatch(setBookDetails(values))
    toast.success('Book Added Successfully!', {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigate("/dashboard")
  };

  return (
    <div  className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className='md:text-3xl text-2xl text-black pb-10 font-semibold'>Add New Book</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-5">
              <label htmlFor="Title" className="text-xl">Title</label>
              <Field type="text" id="Title" name="Title" className="border border-black text-black placeholder:text-gray-400 w-full p-2 mt-2 rounded-xl" />
              <ErrorMessage name="Title" component="div"className="text-red-500 error" />
            </div>

            <div className="mb-5">
              <label className="text-xl" htmlFor="Author">Author</label>
              <Field type="text" id="Author" name="Author" className="border border-black text-black placeholder:text-gray-400 w-full p-2 mt-2 rounded-xl"/>
              <ErrorMessage name="Author" component="div"className="text-red-500 error" />
            </div>

            <div className="mb-5">
              <label className="text-xl" htmlFor="Publication_Year">Year of Publish</label>
              <Field type="number" id="Publication_Year" name="Publication_Year" className="border border-black text-black placeholder:text-gray-400 w-full p-2 mt-2 rounded-xl"/>
              <ErrorMessage
                name="Publication_Year"
                component="div"
               className="text-red-500 error"
              />
            </div>

            <div className="mb-5">
              <label className="text-xl" htmlFor="Genre">Genre</label>
              <Field type="text" id="Genre" name="Genre" className="border border-black text-black placeholder:text-gray-400 w-full p-2 mt-2 rounded-xl"/>
              <ErrorMessage name="Genre" component="div"className="text-red-500 error" />
            </div>

            <button type="submit" className='w-full bg-blue-500 text-white py-3 px-5 rounded-xl'>Add Book</button>
          </Form>
        </Formik>
        </div>
    </div>
  )
}

export default AddNewBook