import { useEffect, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import Input from '../Inputs/Simple'
import TagInput from '../Inputs/Tag'

interface Props {
  onClose: () => void
}

function AddItem({ onClose }: Props) {
  const [barcode, setBarcode] = useState<string>('123456789')
  const [name, setName] = useState<string>('Banana')
  const [retailPrice, setRetailPrice] = useState<string>('1.99')
  const [wholesalePrice, setWholesalePrice] = useState<string>('0.99')
  const [cost, setCost] = useState<string>('0.50')
  const [tags, setTags] = useState<string[]>(['Fruit', 'Food'])
  const [stockAmount, setStockAmount] = useState<string>('10')

  const handleAddItem = () => {
    const item = {
      barcode,
      name,
      retailPrice,
      wholesalePrice,
      cost,
      tags,
      stockAmount,
    }
    onClose()
  }

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="w-1/2 p-4 font-medium rounded-lg bg-sky-100">
        <div className="flex items-center justify-between">
          <h4 className="text-2xl text-neutral-800">เพิ่มสินค้า</h4>
          <button onClick={onClose}>
            <IoIosClose size="1.5rem" />
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <Input placeholder="บาร์โค้ด" value={barcode} onChange={setBarcode} />
          <Input placeholder="ชื่อสินค้า" value={name} onChange={setName} />
          <div className="flex flex-wrap gap-2 mt-4">
            <Input
              placeholder="ราคาขายปลีก (ต่อชิ้น)"
              value={retailPrice}
              onChange={setRetailPrice}
              className="flex-1"
            />
            <Input
              placeholder="ราคาขายส่ง (ต่อชิ้น)"
              value={wholesalePrice}
              onChange={setWholesalePrice}
              className="flex-1"
            />
            <Input
              placeholder="ราคาทุน (ต่อชิ้น)"
              value={cost}
              onChange={setCost}
              className="flex-1"
            />
          </div>
          <Input
            placeholder="จำนวน"
            value={stockAmount}
            onChange={setStockAmount}
          />

          <TagInput placeholder="ประเภท" onChange={setTags} />

          <button onClick={handleAddItem} className="flex items-center justify-center gap-2 p-2 mt-2 font-medium rounded-md bg-sky-300 hover:bg-sky-400 text-sky-700">
            ตกลง
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddItem
