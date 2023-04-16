import { menusState } from '@/store/menusStore'
import React, { useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import { useOnClickOutside } from 'usehooks-ts'
import Button from '../Buttons/Button'
import { trpc } from '@/utils/trpc'
import { Stocks } from '@/interface/Stocks'

interface Props {
  item: Stocks
  onConfirm: () => void
}

function Alert({ item, onConfirm }: Props) {
  const setMenus = useSetRecoilState(menusState)

  const formRef = useRef<HTMLDivElement>(null)
  const deleteItem = trpc.stock.deleteItem.useMutation()

  const onClose = () => {
    setMenus((prev) => ({ ...prev, isAlertModalOpen: false }))
  }

  const hadleOnDelete = async () => {
    try {
      const res = await deleteItem.mutateAsync(item.barcode)

      if (res) {
        onConfirm()
        onClose()
      }
    } catch (err) {
      console.error(err)
    }
  }
  useOnClickOutside(formRef, onClose)

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div ref={formRef} className="w-1/3 p-4 font-medium bg-white rounded-lg">
        <div className="flex flex-col items-center gap-4">
          <h4 className="text-2xl font-bold">ต้องการลบสินค้า?</h4>
          <h5 className="mb-2 text-lg">{item.name}</h5>
          <div className="flex items-center w-full gap-2">
            <Button title="ยืนยัน" type="error" onClick={hadleOnDelete} />
            <Button title="ยกเลิก" type="warning" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Alert
