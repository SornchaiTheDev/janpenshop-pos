import { menusState } from '@/store/menusStore'
import { useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { useOnClickOutside } from 'usehooks-ts'
import { trpc } from '@/utils/trpc'
import { IoClose } from 'react-icons/io5'
import { convertToThousand } from '@/utils'

interface Props {
  billId: string
}

function BillViewer({ billId }: Props) {
  const setMenus = useSetRecoilState(menusState)
  const modalRef = useRef<HTMLDivElement>(null)

  const { data, isLoading } = trpc.history.selectHistory.useQuery({ billId })

  const onClose = () => {
    setMenus((prev) => ({ ...prev, isBillModalOpen: false }))
  }

  useOnClickOutside(modalRef, onClose)

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div
        ref={modalRef}
        className="w-1/3 h-[90vh] relative overflow-auto font-medium bg-white rounded-lg p-4"
      >
        <button className="absolute right-4" onClick={onClose}>
          <IoClose size="1.5rem" />
        </button>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <h4 className="text-xl text-center">ร้านจันทร์เพ็ญบิวตี้ช้อป</h4>
            <h4 className="text-center">หมายเลขใบเสร็จ</h4>
            <h4 className="text-xl font-bold text-center">{data!.billId}</h4>
            <div className="flex flex-col flex-1 gap-2 my-2">
              <div className="my-2">
                <hr />
                <div className="flex items-center justify-between w-full my-2">
                  <h4>รายการ</h4>
                  <h4>ราคา</h4>
                </div>
                <hr />
              </div>
              {data!.items.map(({ name, price, amount }) => (
                <div className="flex items-center justify-between w-full">
                  <h4>
                    {name} x {amount}
                  </h4>
                  <h4>{price}</h4>
                </div>
              ))}
              <hr />
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center justify-between">
                  <h6>ราคารวม</h6>
                  <h5 className="font-bold">
                    {convertToThousand(data!.price)}
                    <span className="ml-2 font-normal text-black">บาท</span>
                  </h5>
                </div>
                <hr />
                <div className="flex items-center justify-between">
                  <h6>ส่วนลด</h6>
                  <h5 className="font-bold">
                    {convertToThousand(data!.discount)}
                    <span className="ml-2 font-normal text-black">บาท</span>
                  </h5>
                </div>
                <hr />
                <div className="flex justify-between gap-4">
                  <h5 className="text-lg">ราคาสุทธิ</h5>
                  <h2 className="text-xl font-bold">
                    {convertToThousand(data!.totalPrice)} บาท
                  </h2>
                </div>
              </div>
            </div>
            <hr />
            <h4 className="pt-4 text-center">ขอบคุณที่มาอุดหนุนค่ะ</h4>
          </>
        )}
      </div>
    </div>
  )
}

export default BillViewer
