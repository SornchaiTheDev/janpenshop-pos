import React, { useCallback, useEffect } from 'react'
import Pagination from './Pagination'
import { useTable } from 'react-table'
import { Column, useSortBy, usePagination } from 'react-table'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { Action } from '@interface/Action'
import { Prisma } from '@prisma/client'

type Stocks = Prisma.StocksGetPayload<{ include: { tags: true } }>

interface Props {
  data: Stocks[]
  pageSize: number
  title?: string
  columns: Column<Stocks>[]
  actions?: Action[]
}

function Table({ data, title, columns, pageSize, actions }: Props) {
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
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize },
    },
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
          pageSize={Math.ceil(data.length / pageSize)}
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
                  if (cell.column.id === 'id') {
                    return <td>{cell.row.index + 1 + pageIndex}</td>
                  }
                  return (
                    <td {...cell.getCellProps()} className="p-2 truncate">
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
