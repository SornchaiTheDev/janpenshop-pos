import { useMemo, useState } from 'react'
import Sidebar from '@/HOC/Sidebar'
import Table from '@/components/Table'
import type { Data } from '@/types/interface/Table'
import { fakeData } from '@/utils'
import { Column } from 'react-table'
import AddItem from '@/components/AddItem'
import type { Action } from '@/types/interface/Action'
import { BsPlusLg } from 'react-icons/bs'
import { FiTrash2 } from 'react-icons/fi'

interface Props {
  data: Data[]
}

function Stock({ data }: Props) {
  const [showAddItem, setShowAddItem] = useState(false)
  const [_data, setData] = useState(data)

  const columns: Column[] = useMemo(
    () => [
      {
        Header: 'ลำดับ',
        accessor: 'order',
      },
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
        accessor: 'tag',
      },
      {
        Header: 'ราคาปลีก (ต่อชิ้น)',
        accessor: 'retailPrice',
      },
      {
        Header: 'ราคาส่ง (ต่อชิ้น)',
        accessor: 'wholesalePrice',
      },
      {
        Header: 'ราคาทุน',
        accessor: 'cost',
      },
      {
        Header: 'จัดการ',
        accessor: 'actions',
        Cell: (props) => (
          <button
            className="p-2 text-sm text-red-500 bg-red-200 rounded-lg"
            onClick={() => handleDelete(props.row.values.barcode)}
          >
            <FiTrash2 />
          </button>
        ),
      },
    ],
    [_data]
  )

  const handleDelete = (barcode: string) => {
    setData(_data.filter((item) => item.barcode !== barcode))
    // wait for backend
  }

  const actions: Action[] = [
    {
      icon: <BsPlusLg />,
      onClick: () => setShowAddItem(true),
      title: 'เพิ่มสินค้า',
    },
  ]
  return (
    <>
      {showAddItem && <AddItem onClose={() => setShowAddItem(false)} />}
      <Sidebar title="จัดการสินค้า">
        <Table columns={columns} pageSize={16} data={_data} actions={actions} />
      </Sidebar>
    </>
  )
}

export default Stock

export async function getServerSideProps() {
  // wait for backend
  const data = fakeData(10)

  return {
    props: {
      data,
    },
  }
}
