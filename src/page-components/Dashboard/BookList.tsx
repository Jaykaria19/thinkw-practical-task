import React, { useState } from 'react'


import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useSelector } from 'react-redux'

type Book = {
  Title: string
  Author: string
  Publication_Year: number
  
  Genre: string
  progress: number
}
const data = [
  {
      "Title": "Devon",
      "Author": "Heller",
      "Publication_Year": 26,
      "progress": 46,
      "Genre": "fiction"
  },
  {
      "Title": "Nikko",
      "Author": "Dibbert",
      "Publication_Year": 21,
      "progress": 92,
      "Genre": "fiction"
  },
  {
      "Title": "Betty",
      "Author": "Oberbrunner",
      "Publication_Year": 12,
      "progress": 13,
      "Genre": "rom-com"
  },
  {
      "Title": "Nikolas",
      "Author": "Adams",
      "Publication_Year": 0,
      "progress": 27,
      "Genre": "biography"
  },
  {
      "Title": "Stephany",
      "Author": "Schaefer",
      "Publication_Year": 0,
      "progress": 16,
      "Genre": "fiction"
  },
  {
      "Title": "Cecilia",
      "Author": "Mann",
      "Publication_Year": 26,
      "progress": 0,
      "Genre": "rom-com"
  },
  {
      "Title": "Ruthe",
      "Author": "Kub",
      "Publication_Year": 10,
      "progress": 66,
      "Genre": "fiction"
  },
  {
      "Title": "Julien",
      "Author": "Zemlak",
      "Publication_Year": 5,
      "progress": 36,
      "Genre": "rom-com"
  },
  {
      "Title": "Alta",
      "Author": "Rippin",
      "Publication_Year": 39,
      "progress": 63,
      "Genre": "rom-com"
  },
  {
      "Title": "Paige",
      "Author": "Pacocha",
      "Publication_Year": 13,
      "progress": 6,
      "Genre": "fiction"
  },
  {
      "Title": "Serena",
      "Author": "Daniel",
      "Publication_Year": 18,
      "progress": 49,
      "Genre": "biography"
  },
  {
      "Title": "Durward",
      "Author": "Luettgen",
      "Publication_Year": 16,      "progress": 14,
      "Genre": "rom-com"
  },
  {
      "Title": "Osbaldo",
      "Author": "Ryan",
      "Publication_Year": 10,
      "progress": 99,
      "Genre": "biography"
  },
  {
      "Title": "Jeremy",
      "Author": "Mohr",
      "Publication_Year": 20,
      "progress": 74,
      "Genre": "rom-com"
  },
  {
      "Title": "Summer",
      "Author": "Ferry",
      "Publication_Year": 25,
      "progress": 81,
      "Genre": "biography"
  },
  {
      "Title": "Jarod",
      "Author": "Anderson",
      "Publication_Year": 28,
      "progress": 87,
      "Genre": "fiction"
  },
  {
      "Title": "Sabryna",
      "Author": "Fay",
      "Publication_Year": 5,
      "progress": 5,
      "Genre": "rom-com"
  },
  {
      "Title": "Otto",
      "Author": "Jast",
      "Publication_Year": 4,      "progress": 37,
      "Genre": "biography"
  },
  {
      "Title": "Domenica",
      "Author": "Gorczany",
      "Publication_Year": 26,
      "progress": 41,
      "Genre": "fiction"
  },
  {
      "Title": "Deborah",
      "Author": "Baumbach",
      "Publication_Year": 15,
      "progress": 35,
      "Genre": "biography"
  }
]
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
 
]
const BookList = () => {

  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ])

  const rerender = React.useReducer(() => ({}), {})[1]

  // Create the table and pass your options
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // Manage your own state
  const [state, setState] = React.useState(table.initialState)

  // Override the state managers for the table to your own
  table.setOptions(prev => ({
    ...prev,
    state,
    onStateChange: setState,
    debugTable: state.pagination.pageIndex > 2,
  }))
  return (
  <>
    <div className='flex justify-center items-center mx-auto h-screen'>
      <div className="p-2 border border-black rounded">
        <table className='my-2'>
          <thead >
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
        <div className="flex justify-start px-2 mt-2 items-center gap-2">
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="border rounded p-1"
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
        </div>
          <span className="flex items-center justify-start px-2 mt-2 gap-1">
            Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="border border-gray-950 px-4 py-2 w-1/2 bg-gray-300 rounded"
            />
          </span>
          <div className='mt-2 flex justify-start px-2 items-center'>
            <select
            className='w-1/2 py-2 px-4 border border-gray-950 rounded bg-gray-300'
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