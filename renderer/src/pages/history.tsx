import Sidebar from '@/Layout/Sidebar'
import Table from 'renderer/src/components/Table'
import { trpc } from '@/utils/trpc'
import { useRecoilState } from 'recoil'
import { menusState } from '@/store/menusStore'
import { Column } from 'react-table'
import { useState } from 'react'
import { FilterHistory, History } from '@/interface/History'
import Input from '@/components/Inputs/Simple'
import { AiOutlineEye } from 'react-icons/ai'
import BillViewer from '@/components/BillViewer'

function HistoryPage() {
  const [menus, setMenus] = useRecoilState(menusState)
  const [search, setSearch] = useState<string>('')
  const [selectedBill, setSelectedBill] = useState<string>('')

  const { data: historyData } = trpc.history.getHistory.useQuery()

  const columns: Column<History>[] = [
    {
      Header: 'หมายเลขใบเสร็จ',
      accessor: 'billId',
    },
    {
      Header: 'ยอดขาย',
      accessor: 'totalPrice',
    },

    {
      Header: 'ดูรายละเอียด',
      Cell: (props) => (
        <button
          className="p-2 mr-2 text-sm text-yellow-500 bg-yellow-200 rounded-lg"
          onClick={() => handleSelectItem(props.row.values.billId)}
        >
          <AiOutlineEye />
        </button>
      ),
    },
  ]

  const filterData = (data: FilterHistory[]) => {
    if (!search) return data
    return data.filter((item) => {
      const regex = new RegExp(search, 'gi')
      return item.billId.match(regex)
    })
  }

  const handleSelectItem = (billId: string) => {
    setSelectedBill(billId)
    return setMenus((prev) => ({ ...prev, isBillModalOpen: true }))
  }

  return (
    <>
      {menus.isBillModalOpen && <BillViewer billId={selectedBill} />}
      <Sidebar title="ประวัติการขาย">
        <Input
          value={search}
          placeholder="ค้นหาใบเสร็จ"
          onChange={(value) => setSearch(value)}
        />
        <Table
          columns={columns}
          pageSize={16}
          data={historyData ? filterData(historyData) : []}
        />
      </Sidebar>
    </>
  )
}

export default HistoryPage

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
