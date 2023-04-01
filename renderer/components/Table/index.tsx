import React, { useEffect } from "react";
import Pagination from "./Pagination";
import { useTable } from "react-table";
import { Column, useSortBy, usePagination } from "react-table";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import type { Data } from "@/types/tableData";

interface Props {
  data: Data[];
  pageSize: number;
}

function Table({ data, pageSize }: Props) {
  const columns: Column[] = React.useMemo(
    () => [
      {
        Header: "ลำดับ",
        accessor: "order", // accessor is the "key" in the data
      },
      {
        Header: "บาร์โค้ด",
        accessor: "barcode",
      },
      {
        Header: "ชื่อสินค้า",
        accessor: "name",
      },
      {
        Header: "ประเภท",
        accessor: "tag",
      },
      {
        Header: "จำนวนคงเหลือ",
        accessor: "amount",
      },
    ],
    []
  );

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
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
  );

  return (
    <div className="h-full bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between p-2 pb-0 border-b">
        <h4 className="text-xl">จำนวนสินค้าคงเหลือ</h4>
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

      <table {...getTableProps()} className="w-full mt-4">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="relative">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <span>{column.render("Header")}</span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <AiOutlineSortDescending className="absolute inline -translate-y-1/2 top-1/2" />
                    ) : (
                      <AiOutlineSortAscending className="absolute inline -translate-y-1/2 top-1/2" />
                    )
                  ) : (
                    ""
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                className="text-center border-b border-neutral-100"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="p-2">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
