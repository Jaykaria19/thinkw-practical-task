import React, { useEffect, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBook, setBookDetails } from '../../store/bookDetails'

interface Book {
  Title: string
  Author: string
  Publication_Year: number
  Genre: string
}
const BookList = () => {
  //all book details
  const bookDetails = useSelector((state:any) => state.bookDetails);
  const data = bookDetails
  const dispatch = useDispatch()
  
  //delete function
  const handleDelete = (index:any)=>{
    dispatch(deleteBook(index))
  }
 
  const defaultColumns: ColumnDef<Book>[] = [
    {
      header: 'Book List',
      
      columns: [
        {
          accessorKey: 'Title',
          cell: info => info.getValue(),
        },
        {
          accessorFn: row => row.Author,
          id: 'Author',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'Publication_Year',
          header: () => 'Publication Year', 
        },
        {
          accessorKey: 'Genre',
          header: 'Genre',  
        },
      ],
    },
    {
      header: "Action",
      columns:[
        {
          accessorKey:"Edit/Delete",
          header:'Edit/Delete',
          cell: ({row}:any)=>{
          return (
            <div className='flex justify-center gap-x-10 items-center '>
                  <Link to={`/edit-book/${row.index}`} state={{ data: row.original }} className='text-white rounded-lg bg-blue-500 px-4 py-2'>
                    Edit
                  </Link>
                  <button className='text-white bg-red-500 px-4 py-2 rounded-lg' onClick={()=>handleDelete(row.index)} >Delete</button>
            </div>
          )
          }
        }
      ]
    }
   
  ]
   
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ])

  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    state:{
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const [state, setState] = React.useState(table.initialState)

  table.setOptions(prev => ({
    ...prev,
    state,
    onStateChange: setState,
    debugTable: state.pagination.pageIndex > 2,
  }))
  
  return (
  <>
    <div className='flex justify-center items-center mx-auto mt-10'>
      <div className="p-2 border border-black rounded">
        <table className='my-2'>
          <thead >
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      :
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                      
                      }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className=''>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className='border border-black'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
        <div className="flex justify-center px-2 mt-2 items-center gap-2">
          <button
            className="border border-black rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="border border-black rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="border border-black rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="border border-black rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
          <span className="flex items-center justify-start px-2 gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <span>|</span>
          <span className="flex items-center justify-start gap-1 w-auto">
            Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="border border-gray-950 px-4 py-2 w-16 bg-gray-300 rounded"
            />
          </span>
            <select
            className='w-auto py-2 border border-gray-950 rounded bg-gray-300'
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          
        </div>
     
      </div>
    </div>
  </>
  
  )
}

export default BookList