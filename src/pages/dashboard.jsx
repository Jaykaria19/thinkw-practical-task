import React from 'react'
import BookList from '../page-components/Dashboard/BookList'
import { Link } from 'react-router-dom'
  
const Dashboard = () => {
  return (
    <div className='container'>
        <div className='text-end mt-5'>
        <Link to={"/add-book"}>
          <button className='px-4 py-2 rounded text-white bg-blue-500'>
            Add Book
          </button>
        </Link>
        </div>
        <BookList/>
    </div>
  )
}

export default Dashboard