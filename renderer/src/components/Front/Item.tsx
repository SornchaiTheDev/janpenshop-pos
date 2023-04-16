import React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import clsx from 'clsx'
import { convertToThousand } from '@/utils'

interface Props {
  name: string
  amount: number
  price: number
  isEven: boolean
}

function Item({ name, amount, price, isEven }: Props) {
  return (
    <div
      className={clsx(
        'flex items-center justify-between p-1',
        isEven && 'bg-neutral-100'
      )}
    >
      <div className="flex items-center gap-2">
        <h3 className="text-lg">{name}</h3>
        <span className="font-bold">x {convertToThousand(amount)}</span>
        <span className="">(ชิ้นละ {convertToThousand(price)})</span>
      </div>
      <div className="flex gap-4">
        <h3>
          {convertToThousand(price * amount)} <span className="ml-2">บาท</span>
        </h3>
        <button onClick={() => {}}>
          <FiTrash2 />
        </button>
      </div>
    </div>
  )
}

export default Item
