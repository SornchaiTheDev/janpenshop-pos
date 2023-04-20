import { menusState } from '@/store/menusStore'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { useOnClickOutside } from 'usehooks-ts'
import Input from '../Inputs/Simple'
import Button from '../Buttons/Button'

interface Props {
  onDiscount: (discount: number) => void
}

function Discount({ onDiscount }: Props) {
  const [discount, setDiscount] = useState<string>('')
  const setMenus = useSetRecoilState(menusState)
  const modalRef = useRef<HTMLFormElement>(null)

  const onClose = () => {
    setMenus((prev) => ({ ...prev, isDiscountModalOpen: false }))
  }

  const handleOnDiscount = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (discount !== '') {
      onDiscount(parseInt(discount))
    } else {
      onDiscount(0)
    }
    onClose()
  }

  useOnClickOutside(modalRef, onClose)

  const handleOnChange = (value: string) => {
    const num = parseInt(value)
    if (num >= 0) {
      setDiscount(value)
    } else {
      setDiscount('')
    }
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <form
        onSubmit={handleOnDiscount}
        ref={modalRef}
        className="flex flex-col w-1/3 gap-4 p-4 font-medium bg-white rounded-lg"
      >
        <h4 className="text-2xl text-center">ส่วนลด</h4>
        <Input
          type="number"
          autofocus
          value={discount}
          onChange={handleOnChange}
        />
        <div className="flex gap-2">
          <Button title="ตกลง" type="success" />
          <Button title="ยกเลิก" type="error" onClick={onClose} />
        </div>
      </form>
    </div>
  )
}

export default Discount
