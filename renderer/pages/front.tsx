import Item from '@/components/Front/Item'
import React from 'react'
import { BiLockAlt } from 'react-icons/bi'
import { BsHandbag, BsCashCoin, BsQrCode } from 'react-icons/bs'
import Login from '@/components/Login'

function Front() {
  const [isLoginedOpen, setIsLoginedOpen] = React.useState(false)
  return (
    <>
      {isLoginedOpen && <Login />}
      <div className="grid h-screen grid-cols-12 bg-sky-50">
        <div className="flex flex-col max-h-screen col-span-4 gap-2 p-4 bg-white">
          <h2 className="mt-10 text-4xl font-bold">รายการสินค้า</h2>
          <div className="flex flex-col flex-1 gap-2 mt-4 overflow-auto">
            <Item />
            <Item />
            <Item />
          </div>
          <div className="flex flex-col gap-4 my-4">
            <div className="flex items-center justify-between">
              <h6>
                ราคารวม <span className="text-neutral-400">(3 รายการ)</span>
              </h6>
              <h5 className="font-bold">60 บาท</h5>
            </div>
            <hr />
            <div className="flex items-center justify-between">
              <h6>ส่วนลด</h6>
              <h5 className="font-bold">0 บาท</h5>
            </div>
            <hr />
            <div>
              <h5 className="text-lg">ราคาสุทธิ</h5>
              <h2 className="text-6xl font-bold">60 บาท</h2>
            </div>
          </div>
        </div>
        <div className="col-span-8 p-10">
          <div>
            <h5 className="text-3xl font-bold">แอดมิน</h5>
            <button
              onClick={() => setIsLoginedOpen(true)}
              className="flex flex-col items-center justify-center w-40 h-40 gap-4 p-4 mt-4 font-bold text-white rounded-lg bg-sky-500 hover:bg-sky-600"
            >
              <BiLockAlt size="1.5rem" />
              เข้าสู่ระบบ
            </button>
          </div>
          <div className="mt-10">
            <h5 className="text-3xl font-bold">จัดการสินค้า</h5>
            <button className="flex flex-col items-center justify-center w-40 h-40 gap-4 p-4 mt-4 font-bold text-white rounded-lg bg-sky-500 hover:bg-sky-600">
              <BsHandbag size="1.5rem" />
              เพิ่มสินค้าหน้าร้าน
            </button>
          </div>
          <div className="mt-10">
            <h5 className="text-3xl font-bold">วิธีชำระเงิน</h5>
            <div className="flex gap-6 ">
              <button className="flex flex-col items-center justify-center w-40 h-40 gap-4 p-4 mt-4 font-bold text-white rounded-lg bg-sky-500 hover:bg-sky-600">
                <BsCashCoin size="1.5rem" />
                เงินสด
              </button>
              <button className="flex flex-col items-center justify-center w-40 h-40 gap-4 p-4 mt-4 font-bold text-white rounded-lg bg-sky-500 hover:bg-sky-600">
                <BsQrCode size="1.5rem" />
                คิวอาร์โค้ด
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Front
