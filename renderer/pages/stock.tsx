import { useMemo } from 'react'
import Sidebar from '@/HOC/Sidebar'
import Table from '@/components/Table'
import type { Data } from '@/types/tableData'
import { fakeData } from '@/utils'
import { Column } from 'react-table'
import Input from '@/components/Inputs/Simple'
import clsx from 'clsx'
import TagInput from '@/components/Inputs/Tag'
import { IoIosClose } from 'react-icons/io'

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
      <div className="absolute top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/20">
        <div className="w-1/2 p-4 font-medium bg-white rounded-lg">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl text-neutral-800">เพิ่มสินค้า</h4>
            <button onClick={() => {}}>
              <IoIosClose size="1.5rem" />
            </button>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <Input placeholder="บาร์โค้ด" value="test" onChange={() => {}} />
            <Input placeholder="ชื่อสินค้า" value="test" onChange={() => {}} />
            <div className="flex flex-wrap gap-2 mt-4">
              <Input
                placeholder="ราคาขายปลีก (ต่อชิ้น)"
                value="test"
                onChange={() => {}}
                className="flex-1"
              />
              <Input
                placeholder="ราคาขายส่ง (ต่อชิ้น)"
                value="test"
                onChange={() => {}}
                className="flex-1"
              />
              <Input
                placeholder="ราคาทุน (ต่อชิ้น)"
                value="test"
                onChange={() => {}}
                className="flex-1"
              />
            </div>
            <Input placeholder="จำนวน" value="test" onChange={() => {}} />

            <TagInput placeholder="ประเภท" value="test" onChange={() => {}} />

            <button className="flex items-center justify-center gap-2 p-2 mt-2 font-medium rounded-md bg-lime-300 hover:bg-lime-400 text-lime-700">
              ตกลง
            </button>
          </div>
        </div>
      </div>
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
