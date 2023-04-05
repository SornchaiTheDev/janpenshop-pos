import React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import clsx from 'clsx'

interface Props {
  isEven: boolean
}

function Item({ isEven }: Props) {
  return (
    <div
      className={clsx(
        'flex items-center justify-between p-1',
        isEven && 'bg-neutral-100'
      )}
    >
      <div className="flex items-center gap-2">
        <h3 className="text-lg">ยาสระผมห๊อมหอม</h3>
        <span className="font-bold">x 1</span>
      </div>
      <div className="flex gap-4">
        <h3>20 <span className='ml-2'>บาท</span></h3>
        <button onClick={() => {}}>
          <FiTrash2 />
        </button>
      </div>
    </div>
  )
}

export default Item
