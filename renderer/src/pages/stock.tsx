import { useMemo, useState, useCallback, useEffect } from 'react'
import Sidebar from '@/Layout/Sidebar'
import Table from 'renderer/src/components/Table'
import type { Data } from '@interface/Table'
import { fakeData } from '@/utils'
import { Column } from 'react-table'
import AddItem from 'renderer/src/components/AddItem'
import type { Action } from '@interface/Action'
import { BsPlusLg } from 'react-icons/bs'
import { FiTrash2 } from 'react-icons/fi'
import { trpc } from '@/utils/trpc'
import { Prisma, Tag } from '@prisma/client'

import { useRecoilState, useRecoilValue } from 'recoil'
import { menusState } from '@/store/menusStore'
import { tableStore } from '@/store/tableStore'
interface Props {
  data: Data[]
}

type Stocks = Prisma.StocksGetPayload<{ include: { tags: true } }>

function Stock() {
  const [showAddItem, setShowAddItem] = useState(false)
  const [menus, setMenus] = useRecoilState(menusState)
  const [data, setData] = useState<Stocks[]>([])
  const [totalPage, setTotalPage] = useState(0)

  const stockData = trpc.stock.getItem.useQuery()

  const columns: Column<Stocks>[] = useMemo(
    () => [
      {
        Header: 'บาร์โค้ด',
        accessor: 'barcode',
      },
      {
        Header: 'ชื่อสินค้า',
        accessor: 'name',
      },
      {
        Header: 'ประเภท',
        accessor: 'tags',
        Cell: (props) => (
          <div className="flex flex-wrap justify-center gap-1">
            {props.row.values.tags.map((tag: Tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 text-xs font-medium text-white rounded-lg bg-sky-500"
              >
                {tag.name}
              </span>
            ))}
          </div>
        ),
      },
      {
        Header: 'ราคาขาย',
        accessor: 'price',
      },
      // {
      //   Header: 'ราคาปลีก',
      //   accessor: 'retailPrice',
      // },
      // {
      //   Header: 'ราคาส่ง',
      //   accessor: 'wholesalePrice',
      // },
      // {
      //   Header: 'ราคาทุน',
      //   accessor: 'cost',
      // },
      // {
      //   Header: 'จัดการ',
      //   accessor: 'actions',
      //   Cell: (props) => (
      //     <button
      //       className="p-2 text-sm text-red-500 bg-red-200 rounded-lg"
      //       onClick={() => handleDelete(props.row.values.barcode)}
      //     >
      //       <FiTrash2 />
      //     </button>
      //   ),
      // },
    ],
    []
  )

  const handleDelete = (barcode: string) => {
    // if (data) {
    //   setData(data.filter((item) => item.barcode !== barcode))
    // }
    // wait for backend
  }

  const actions: Action[] = [
    {
      icon: <BsPlusLg />,
      onClick: () =>
        setMenus((prev) => ({ ...prev, isAddToStockModalOpen: true })),
      title: 'เพิ่มสินค้า',
    },
  ]

  // const handleFetchData = useCallback(
  //   async (pageIndex: number, pageSize: number) => {
  //     setData(items)
  //     setTotalPage(totalPage)
  //   },
  //   []
  // )

  return (
    <>
      {menus.isAddToStockModalOpen && <AddItem />}
      <Sidebar title="จัดการสินค้า">
        <Table
          pageCount={totalPage}
          columns={columns}
          pageSize={16}
          data={stockData.data ? stockData.data : []}
          actions={actions}
        />
      </Sidebar>
    </>
  )
}

export default Stock

// export async function getServerSideProps() {
//   // const data = await trpc.stock.listWithPagination.useQuery({
//   //   page: 1,
//   //   pageSize: 16,
//   // })
//   // return {
//   //   props: {
//   //     data,
//   //   },
//   // }
// }
