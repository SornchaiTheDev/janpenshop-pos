import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Statistic from 'renderer/src/components/Common/Statistic'
import { BiHome } from 'react-icons/bi'
import { BsHandbag } from 'react-icons/bs'
import { RiSettings4Line } from 'react-icons/ri'
import { TbDoorExit } from 'react-icons/tb'
import { fakeData } from '@/utils'
import type { Data } from '@interface/Table'
import Table from 'renderer/src/components/Table'
import Sidebar from '@/Layout/Sidebar'
import { Column } from 'react-table'

interface Props {
  data: Data[]
}

function Home({ data }: Props) {
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
    <Sidebar title="แดชบอร์ด">
      <div className="flex flex-wrap gap-4">
        <Statistic title="ยอดขาย (วันนี้)" unit="baht" value={123456} />
        <Statistic
          title="จำนวนสินค้าที่ขายได้ (วันนี้)"
          unit="piece"
          value={246}
        />
        <Statistic title="กำไร (วันนี้)" unit="baht" value={32125} />
      </div>

      {/* <Table
        title="จำนวนสินค้าคงเหลือ"
        pageSize={12}
        columns={columns}
        data={data}
      /> */}
    </Sidebar>
  )
}

export default Home

export async function getServerSideProps() {
  const data = fakeData(10000)

  return {
    props: {
      data,
    },
  }
}
