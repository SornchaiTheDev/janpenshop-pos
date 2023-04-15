import { useRef, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import Input from '../Inputs/Simple'
import TagInput from '../Inputs/Tag'
import { useRecoilState } from 'recoil'
import { menusState } from '@/store/menusStore'
import { useOnClickOutside } from 'usehooks-ts'
import { trpc } from '@/utils/trpc'

function AddItem() {
  const [menus, setMenus] = useRecoilState(menusState)
  const formRef = useRef<HTMLDivElement>(null)

  const [barcode, setBarcode] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [retailPrice, setRetailPrice] = useState<string>('')
  const [wholesalePrice, setWholesalePrice] = useState<string>('')
  const [cost, setCost] = useState<string>('')
  const [tags, setTags] = useState<string[]>([''])
  const [stockAmount, setStockAmount] = useState<string>('')

  const addItem = trpc.stock.addItem.useMutation()

  const onClose = () => {
    setMenus((prev) => ({ ...prev, isAddToStockModalOpen: false }))
  }

  useOnClickOutside(formRef, onClose)

  const handleAddItem = async () => {
    try {
      const item = {
        barcode,
        name,
        price: parseFloat(retailPrice),
        tags,
      }

      const res = await addItem.mutateAsync(item)

      if (res) {
        onClose()
        console.log(res)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div
        ref={formRef}
        className="w-1/2 p-4 font-medium rounded-lg bg-sky-100"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-2xl text-neutral-800">เพิ่มสินค้า</h4>
          <button onClick={onClose}>
            <IoIosClose size="1.5rem" />
          </button>
        </div>
        {addItem.error && (
          <p className="mt-2 font-light text-red-500">*มีสินค้านี้อยู่แล้ว!</p>
        )}
        <div className="flex flex-col gap-2 mt-2">
          <Input placeholder="บาร์โค้ด" value={barcode} onChange={setBarcode} />
          <Input placeholder="ชื่อสินค้า" value={name} onChange={setName} />
          <div className="flex flex-wrap gap-2 mt-4">
            <Input
              placeholder="ราคาขาย (ต่อชิ้น)"
              value={retailPrice}
              onChange={setRetailPrice}
              className="flex-1"
            />
          </div>

          <TagInput placeholder="ประเภท" onChange={setTags} />

          <button
            onClick={handleAddItem}
            className="flex items-center justify-center gap-2 p-2 mt-2 font-medium rounded-md bg-sky-300 hover:bg-sky-400 text-sky-700"
          >
            ตกลง
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddItem
