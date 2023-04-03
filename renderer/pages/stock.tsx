import { useMemo } from 'react'
import Sidebar from '@/HOC/Sidebar'
import Table from '@/components/Table'
import type { Data } from '@/types/tableData'
import { fakeData } from '@/utils'
import { Column } from 'react-table'
import AddItem from '@/components/AddItem'

interface Props {
  data: Data[]
}

function Stock({ data }: Props) {
  const columns: Column[] = useMemo(
    () => [
      {
        Header: 'ลำดับ',
        accessor: 'order', // accessor is the "key" in the data
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
        Header: 'จำนวนคงเหลือ',
        accessor: 'amount',
      },
    ],
    []
  )
  return (
    <>
      {false && <AddItem />}
      <Sidebar title="จัดการสินค้า">
        <Table columns={columns} pageSize={16} data={data} />
      </Sidebar>
    </>
  )
}

export default Stock

export async function getServerSideProps() {
  const data = fakeData(10000)

  return {
    props: {
      data,
    },
  }
}
