import Item from 'renderer/src/components/Front/Item'
import { ReactNode, useRef, useEffect } from 'react'
import { BiLockAlt } from 'react-icons/bi'
import { BsCashCoin, BsQrCode } from 'react-icons/bs'
import Login from 'renderer/src/components/Login'
import Discount from '@/components/Discount'
import { menusState } from '@/store/menusStore'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import dynamic from 'next/dynamic'
import { Stocks } from '@prisma/client'
import { convertToThousand } from '@/utils'
import ToggleSwitch from '@/components/ToggleSwitch'
import { FiTrash2 } from 'react-icons/fi'
import { TbDiscount } from 'react-icons/tb'
import { sellStore, sellStatsState } from '@/store/sellStore'
import PayWithCash from '@/components/PayWithCash'
import PayWithQRCode from '@/components/PayWithQR'

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
  const sellWindow = useRef<HTMLDivElement>(null)
  const [menuState, setMenuState] = useRecoilState(menusState)
  const setSellStore = useSetRecoilState(sellStore)
  const { items, totalPrice, itemAmount, discount } =
    useRecoilValue(sellStatsState)

  const buttons: Button[] = [
    {
      name: 'เข้าสู่ระบบ',
      icon: <BiLockAlt size="4rem" />,
      onClick: () =>
        setMenuState((prev) => ({ ...prev, isLoginModalOpen: true })),
    },
    {
      name: 'ส่วนลด',
      icon: <TbDiscount size="4rem" />,
      onClick: () =>
        setMenuState((prev) => ({ ...prev, isDiscountModalOpen: true })),
    },
    {
      name: 'เงินสด',
      icon: <BsCashCoin size="4rem" />,
      onClick: () =>
        setMenuState((prev) => ({ ...prev, isPayWithCashModalOpen: true })),
    },
    {
      name: 'คิวอาร์โค้ด',
      icon: <BsQrCode size="4rem" />,
      onClick: () =>
        setMenuState((prev) => ({ ...prev, isPayWithQRCodeOpen: true })),
    },
  ]

  const handleOnScan = (item: Stocks) => {
    if (items.find((i) => i.barcode === item.barcode)) {
      setSellStore((prev) => ({
        ...prev,
        _items: prev._items.map((i) =>
          i.barcode === item.barcode ? { ...i, amount: i.amount + 1 } : i
        ),
      }))
    } else {
      setSellStore((prev) => ({
        ...prev,
        _items: [...prev._items, { ...item, amount: 1 }],
      }))
    }
  }

  const handleOnRemove = (barcode: string) => {
    setSellStore((prev) => ({
      ...prev,
      _items: prev._items.filter((i) => i.barcode !== barcode),
    }))
  }

  const setSellMode = (type: 'retail' | 'wholesale') => {
    setSellStore((prev) => ({
      ...prev,
      sellMode: type,
    }))
  }

  const clearItems = () => {
    setSellStore((prev) => ({ ...prev, items: [] }))
  }

  useEffect(() => {
    if (sellWindow.current) {
      sellWindow.current.scrollTo({
        top: sellWindow.current?.scrollHeight,
      })
    }
  }, [sellWindow, items])

  return (
    <>
      {!menuState.isDiscountModalOpen && (
        <BarcodeReader onComplete={handleOnScan} />
      )}
      {menuState.isLoginModalOpen && <Login />}
      {menuState.isDiscountModalOpen && (
        <Discount
          onDiscount={(discount: number) =>
            setSellStore((prev) => ({ ...prev, discount }))
          }
        />
      )}

      {menuState.isPayWithCashModalOpen && <PayWithCash />}

      {menuState.isPayWithQRCodeOpen && <PayWithQRCode />}
      <div className="grid h-screen grid-cols-12 p-4 px-16 gap-14 bg-neutral-100">
        <div className="flex flex-col h-[calc(100vh-4vh)] col-span-9  p-4 bg-white shadow-md rounded-xl">
          <div className="flex items-center justify-between">
            <ToggleSwitch
              buttons={[
                { name: 'ราคาปลีก', onClick: () => setSellMode('retail') },
                { name: 'ราคาส่ง', onClick: () => setSellMode('wholesale') },
              ]}
            />
            <button
              className="flex items-center gap-4 p-2 text-red-700 bg-red-200 rounded-lg hover:bg-red-300 hover:text-red-800"
              onClick={clearItems}
            >
              ยกเลิกการขาย
              <FiTrash2 />
            </button>
          </div>
          <h2 className="mt-4 text-4xl font-bold">รายการสินค้า</h2>
          <div className="flex-1 pr-4 mt-4 overflow-auto" ref={sellWindow}>
            {items.map(({ barcode, amount, name, price }, index) => (
              <Item
                onRemove={() => handleOnRemove(barcode)}
                amount={amount}
                name={name}
                price={price}
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
                  ({convertToThousand(itemAmount)} ชิ้น)
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
                  {convertToThousand(totalPrice)} บาท
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
