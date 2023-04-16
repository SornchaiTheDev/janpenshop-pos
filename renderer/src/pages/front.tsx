import Item from 'renderer/src/components/Front/Item'
import { ReactNode, useState } from 'react'
import { BiLockAlt } from 'react-icons/bi'
import { BsCashCoin, BsQrCode } from 'react-icons/bs'
import Login from 'renderer/src/components/Login'
import { menusState } from '@/store/menusStore'
import { useRecoilState } from 'recoil'
import dynamic from 'next/dynamic'
import { Stocks } from '@prisma/client'
import { convertToThousand } from '@/utils'

const BarcodeReader = dynamic(
  () => import('@/components/Common/barcodeReader'),
  { ssr: false }
)
interface Button {
  name: string
  icon: ReactNode
  onClick: () => void
}

type Item = Stocks & { amount: number }
function Front() {
  const [menuState, setMenuState] = useRecoilState(menusState)
  const [items, setItems] = useState<Item[]>([])

  const totalPrice = items.reduce(
    (acc, item) => acc + item.amount * item.retailPrice,
    0
  )
  const discount = 0
  const totalDiscount = totalPrice - discount
  const itemsAmount = items.reduce((acc, item) => acc + item.amount, 0)

  const buttons: Button[] = [
    {
      name: 'เข้าสู่ระบบ',
      icon: <BiLockAlt size="4rem" />,
      onClick: () =>
        setMenuState((prev) => ({ ...prev, isLoginModalOpen: true })),
    },
    { name: 'เงินสด', icon: <BsCashCoin size="4rem" />, onClick: () => {} },
    { name: 'คิวอาร์โค้ด', icon: <BsQrCode size="4rem" />, onClick: () => {} },
  ]

  const handleOnScan = (item: Stocks) => {
    if (items.find((i) => i.barcode === item.barcode)) {
      setItems((prev) =>
        prev.map((i) =>
          i.barcode === item.barcode ? { ...i, amount: i.amount + 1 } : i
        )
      )
    } else {
      setItems((prev) => [...prev, { ...item, amount: 1 }])
    }
  }

  return (
    <>
      <BarcodeReader onComplete={handleOnScan} />
      {menuState.isLoginModalOpen && <Login />}
      <div className="grid h-screen grid-cols-12 p-4 px-16 gap-14 bg-neutral-100">
        <div className="flex flex-col h-[calc(100vh-4vh)] col-span-9  p-4 bg-white shadow-md rounded-xl">
          <h2 className="mt-2 text-4xl font-bold">รายการสินค้า</h2>
          <div className="flex-1 mt-4 overflow-auto">
            {items.map(({ name, retailPrice, amount }, index) => (
              <Item
                amount={amount}
                name={name}
                price={retailPrice}
                key={index}
                isEven={index % 2 === 0}
              />
            ))}
          </div>

          <div className="flex items-start justify-between gap-2 mb-2 border-t-2">
            <div className="flex items-center justify-between gap-4 mt-2">
              <h6>
                จำนวนสินค้ารวม{' '}
                <span className="text-lg font-bold text-neutral-600">
                  ({convertToThousand(itemsAmount)} ชิ้น)
                </span>
              </h6>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center justify-between">
                <h6>ราคารวม</h6>
                <h5 className="font-bold text-sky-500">
                  {convertToThousand(totalPrice)}{' '}
                  <span className="ml-2 font-normal text-black">บาท</span>
                </h5>
              </div>
              <hr />
              <div className="flex items-center justify-between gap-[90px]">
                <h6>ส่วนลด</h6>
                <h5 className="font-bold text-sky-500">
                  {convertToThousand(discount)}{' '}
                  <span className="ml-2 font-normal text-black">บาท</span>
                </h5>
              </div>
              <hr />
              <div className="flex items-end gap-4">
                <h5 className="text-lg">ราคาสุทธิ</h5>
                <h2 className="text-5xl font-bold text-sky-500">
                  {convertToThousand(totalDiscount)} บาท
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col col-span-3 gap-4 py-4">
          {buttons.map(({ name, icon, onClick }) => (
            <button
              key={name}
              onClick={onClick}
              className="flex flex-col items-center justify-center h-full gap-4 p-4 font-bold text-white rounded-lg bg-sky-500 hover:bg-sky-600"
            >
              {icon}
              {name}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default Front
