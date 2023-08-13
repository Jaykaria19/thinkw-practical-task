import React from 'react'
import EditBookList from '../page-components/Dashboard/EditBookList'
import { useParams } from 'react-router-dom';

const EditBook = () => {
  const params = useParams();
  return (
    <div><EditBookList/></div>
  )
}

export default EditBook