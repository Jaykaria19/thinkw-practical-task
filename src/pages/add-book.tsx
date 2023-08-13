import React from 'react'
import AddNewBook from '../page-components/AddBook/AddNewBook'
import {Route, Link, Routes, useParams} from 'react-router-dom';

const AddBook = () => {
  const params = useParams();
  return (
   <>
    <AddNewBook/>
   </>
  )
}

export default AddBook