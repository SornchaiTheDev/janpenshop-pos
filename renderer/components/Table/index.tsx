import React, { useEffect } from 'react'
import Pagination from './Pagination'
import { useTable } from 'react-table'
import { Column, useSortBy, usePagination } from 'react-table'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import type { Data } from '@/types/interface/Table'
import { Action } from '@/types/interface/Action'

interface Props {
  data: Data[]
  pageSize: number
  title?: string
  columns: Column[]
  actions?: Action[]
}

function Table({ title, columns, data, pageSize, actions }: Props) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    []
  )
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex },
    gotoPage,
    pageOptions,
  } = useTable(
    { columns, data, initialState: { pageSize } },
    useSortBy,
    usePagination
  )

  return (
    <div className="h-full border rounded-lg shadow-lg bg-sky-100 border-sky-500">
      <div className="flex items-center justify-between p-2 border-b border-sky-500">
        <div>
          {title != null && <h4 className="text-xl">{title}</h4>}
          <div className="flex items-center gap-2">
            {actions &&
              actions.map(({ title, icon, onClick }) => (
                <button
                  key={title}
                  onClick={onClick}
                  className="flex items-center gap-2 p-2 mt-2 font-medium rounded-md bg-sky-300 text-sky-700"
                >
                  {icon} {title}
                </button>
              ))}
          </div>
        </div>
        <Pagination
          currentPage={pageIndex}
          pageSize={pageOptions.length}
          canNextPage={canNextPage}
          canPrevPage={canPreviousPage}
          prevPage={previousPage}
          nextPage={nextPage}
          gotoPage={gotoPage}
        />
      </div>

      <table {...getTableProps()} className="w-full mt-4 table-fixed">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="relative">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <span>{column.render('Header')}</span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <AiOutlineSortDescending className="absolute inline -translate-y-1/2 top-1/2" />
                    ) : (
                      <AiOutlineSortAscending className="absolute inline -translate-y-1/2 top-1/2" />
                    )
                  ) : (
                    ''
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr className="text-center" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      key={cell.row.id}
                      {...cell.getCellProps()}
                      className="p-2 truncate"
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
