import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addBook } from '../../store/bookSlice';

const AddNewBook = () => {
  const initialValues = {
    title: '',
    author: '',
    yearOfPublish: '',
    genre: '',
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    yearOfPublish: Yup.number()
      .required('Year of publish is required')
      .integer('Year must be an integer')
      .min(1000, 'Year must be at least 1000')
      .max(new Date().getFullYear(), 'Year cannot be in the future'),
    genre: Yup.string().required('Genre is required'),
  });
  const dispatch = useDispatch();
  const handleSubmit = (values : any) => {
    // Handle form submission here
    dispatch(
      addBook({
        id: Date.now().toString(),
        ...values,
      })
    );
    console.log(values);
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
              <label htmlFor="title" className="text-xl">Title</label>
              <Field type="text" id="title" name="title" className="border border-black text-black placeholder:text-gray-400 w-full p-2 mt-2 rounded-xl" />
              <ErrorMessage name="title" component="div"className="text-red-500 error" />
            </div>

            <div className="mb-5">
              <label className="text-xl" htmlFor="author">Author</label>
              <Field type="text" id="author" name="author" className="border border-black text-black placeholder:text-gray-400 w-full p-2 mt-2 rounded-xl"/>
              <ErrorMessage name="author" component="div"className="text-red-500 error" />
            </div>

            <div className="mb-5">
              <label className="text-xl" htmlFor="yearOfPublish">Year of Publish</label>
              <Field type="number" id="yearOfPublish" name="yearOfPublish" className="border border-black text-black placeholder:text-gray-400 w-full p-2 mt-2 rounded-xl"/>
              <ErrorMessage
                name="yearOfPublish"
                component="div"
               className="text-red-500 error"
              />
            </div>

            <div className="mb-5">
              <label className="text-xl" htmlFor="genre">Genre</label>
              <Field type="text" id="genre" name="genre" className="border border-black text-black placeholder:text-gray-400 w-full p-2 mt-2 rounded-xl"/>
              <ErrorMessage name="genre" component="div"className="text-red-500 error" />
            </div>

            <button type="submit" className='w-full bg-blue-500 text-white py-3 px-5 rounded-xl'>Add Book</button>
          </Form>
        </Formik>
        </div>
    </div>
  )
}

export default AddNewBook