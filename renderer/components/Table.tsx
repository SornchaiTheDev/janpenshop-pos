import React from "react";
import { useTable } from "react-table";
import { Column, useSortBy } from "react-table";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

import { fakeData } from "@/utils";

interface Data {
  order: number;
  barcode: string;
  item_name: string;
  item_tag: string;
  item_amount: number;
}

function Table() {
  const data: Data[] = React.useMemo(() => fakeData(100), []);

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
        accessor: "item_name",
      },
      {
        Header: "ประเภท",
        accessor: "item_tag",
      },
      {
        Header: "จำนวนคงเหลือ",
        accessor: "item_amount",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()} className="w-full mt-10 text-center">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <button className="flex items-center justify-center w-full text-zinc-700">
                  <h4 className="font-bold whitespace-break-spaces">
                    {column.render("Header")}
                  </h4>
                  <span className="w-2">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <AiOutlineSortDescending />
                      ) : (
                        <AiOutlineSortAscending />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </button>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className="p-2">
                    {cell.column.id === "item_tag" ? (
                      <div className="px-4 mx-auto text-sm align-middle bg-green-500 rounded-full w-fit h-fit">
                        {cell.render("Cell")}
                      </div>
                    ) : (
                      cell.render("Cell")
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
