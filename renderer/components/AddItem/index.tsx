import React from 'react'
import { IoIosClose } from 'react-icons/io'
import Input from '../Inputs/Simple'
import TagInput from '../Inputs/Tag'

function AddItem() {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="w-1/2 p-4 font-medium rounded-lg bg-lime-100">
        <div className="flex items-center justify-between">
          <h4 className="text-2xl text-neutral-800">เพิ่มสินค้า</h4>
          <button onClick={() => {}}>
            <IoIosClose size="1.5rem" />
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <Input placeholder="บาร์โค้ด" value="test" onChange={() => {}} />
          <Input placeholder="ชื่อสินค้า" value="test" onChange={() => {}} />
          <div className="flex flex-wrap gap-2 mt-4">
            <Input
              placeholder="ราคาขายปลีก (ต่อชิ้น)"
              value="test"
              onChange={() => {}}
              className="flex-1"
            />
            <Input
              placeholder="ราคาขายส่ง (ต่อชิ้น)"
              value="test"
              onChange={() => {}}
              className="flex-1"
            />
            <Input
              placeholder="ราคาทุน (ต่อชิ้น)"
              value="test"
              onChange={() => {}}
              className="flex-1"
            />
          </div>
          <Input placeholder="จำนวน" value="test" onChange={() => {}} />

          <TagInput placeholder="ประเภท" value="test" onChange={() => {}} />

          <button className="flex items-center justify-center gap-2 p-2 mt-2 font-medium rounded-md bg-lime-300 hover:bg-lime-400 text-lime-700">
            ตกลง
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddItem
