import Sidebar from '@/Layout/Sidebar'
import Table from 'renderer/src/components/Table'
import type { Data } from '@interface/Table'
import AddItem from 'renderer/src/components/AddItem'
import type { Action } from '@interface/Action'
import { BsPlusLg } from 'react-icons/bs'
import { trpc } from '@/utils/trpc'
import { useRecoilState } from 'recoil'
import { menusState } from '@/store/menusStore'
import { Prisma, Tag } from '@prisma/client'
import { FiEdit3, FiTrash2 } from 'react-icons/fi'
import { Column } from 'react-table'
import RemoveItem from '@/components/RemoveItem'
import { useState } from 'react'
import EditItem from '@/components/EditItem'
import { Stocks } from '@/interface/Stocks'
import Input from '@/components/Inputs/Simple'
interface Props {
  data: Data[]
}

function Stock() {
  const [menus, setMenus] = useRecoilState(menusState)
  const [search, setSearch] = useState<string>('')
  const [selectedItem, setSelectedItem] = useState<Stocks | null>(null)

  const stockData = trpc.stock.getAllItems.useQuery()

  const actions: Action[] = [
    {
      icon: <BsPlusLg />,
      onClick: () =>
        setMenus((prev) => ({ ...prev, isAddToStockModalOpen: true })),
      title: 'เพิ่มสินค้า',
    },
  ]

  const columns: Column<Stocks>[] = [
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
      Header: 'ราคาขายปลีก (ต่อชิ้น)',
      accessor: 'retailPrice',
    },
    {
      Header: 'ราคาขายส่ง (ต่อชิ้น)',
      accessor: 'wholesalePrice',
    },
    {
      Header: 'แก้ไข/ลบ',
      Cell: (props) => (
        <>
          <button
            className="p-2 mr-2 text-sm text-yellow-500 bg-yellow-200 rounded-lg"
            onClick={() =>
              handleSelectItem({
                ...(props.row.values as Stocks),
                type: 'edit',
              })
            }
          >
            <FiEdit3 />
          </button>
          <button
            className="p-2 text-sm text-red-500 bg-red-200 rounded-lg"
            onClick={() =>
              handleSelectItem({
                ...(props.row.values as Stocks),
                type: 'delete',
              })
            }
          >
            <FiTrash2 />
          </button>
        </>
      ),
    },
  ]

  const filterData = (data: Stocks[]) => {
    if (!search) return data
    return data.filter((item) => {
      const regex = new RegExp(search, 'gi')
      return item.name.match(regex) || item.barcode.match(regex)
    })
  }

  const handleSelectItem = (item: Stocks & { type: string }) => {
    setSelectedItem(item)
    if (item.type === 'edit')
      return setMenus((prev) => ({ ...prev, isEditStockModalOpen: true }))
    setMenus((prev) => ({ ...prev, isAlertModalOpen: true }))
  }

  const refetch = () => {
    stockData.refetch()
  }

  return (
    <>
      {menus.isEditStockModalOpen && (
        <EditItem onConfirm={refetch} item={selectedItem!} />
      )}
      {menus.isAlertModalOpen && (
        <RemoveItem onConfirm={refetch} item={selectedItem!} />
      )}
      {menus.isAddToStockModalOpen && <AddItem onConfirm={refetch} />}
      <Sidebar title="จัดการสินค้า">
        <Input
          value={search}
          placeholder="ค้นหาสินค้า"
          onChange={(value) => setSearch(value)}
        />
        <Table
          columns={columns}
          pageSize={16}
          data={stockData.data ? filterData(stockData.data) : []}
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
