import React from 'react'
import { FiTrash2 } from 'react-icons/fi'

function Item() {
  return (
    <div className="flex items-center justify-between pb-2 border-b">
      <div className="flex items-center gap-2">
        <h3 className="text-lg">ยาสระผมห๊อมหอม</h3>
        <span className="font-bold">x 1</span>
      </div>
      <div className='flex gap-4'>
        <h3>20 บาท</h3>
        <button onClick={() => {}}>
          <FiTrash2 />
        </button>
      </div>
    </div>
  )
}

export default Item
