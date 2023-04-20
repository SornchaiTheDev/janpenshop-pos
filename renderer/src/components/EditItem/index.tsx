import { useRef, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import Input from '../Inputs/Simple'
import TagInput from '../Inputs/Tag'
import { useSetRecoilState } from 'recoil'
import { menusState } from '@/store/menusStore'
import { useOnClickOutside } from 'usehooks-ts'
import { trpc } from '@/utils/trpc'
import { Stocks } from '@/interface/Stocks'

interface Props {
  item: Stocks
  onConfirm: () => void
}

function EditItem({ item, onConfirm }: Props) {
  const setMenus = useSetRecoilState(menusState)
  const formRef = useRef<HTMLDivElement>(null)

  const [name, setName] = useState<string>(item.name)
  const [retailPrice, setRetailPrice] = useState<string>(
    item.retailPrice.toString()
  )
  const [wholesalePrice, setWholesalePrice] = useState<string>(
    item.wholesalePrice.toString()
  )
  const [tags, setTags] = useState<string[]>(item.tags.map((item) => item.name))

  const editItem = trpc.stock.editItem.useMutation()

  const onClose = () => {
    setMenus((prev) => ({ ...prev, isEditStockModalOpen: false }))
  }

  useOnClickOutside(formRef, onClose)

  const handleEditItem = async () => {
    const barcode = item.barcode
    try {
      const item = {
        barcode,
        name,
        retailPrice: parseFloat(retailPrice),
        wholeSalePrice: parseFloat(wholesalePrice),
        tags,
      }
      console.log(item)
      const res = await editItem.mutateAsync(item)

      if (res) {
        onConfirm()
        onClose()
        console.log(res)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div
        ref={formRef}
        className="w-1/2 p-4 font-medium rounded-lg bg-sky-100"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-2xl text-neutral-800">แก้ไขสินค้า</h4>
          <button onClick={onClose}>
            <IoIosClose size="1.5rem" />
          </button>
        </div>
        {editItem.error && (
          <p className="mt-2 font-light text-red-500">*เกิดข้อผิดพลาด</p>
        )}
        <div className="flex flex-col gap-2 mt-2">
          <Input placeholder="บาร์โค้ด" disabled value={item.barcode} />
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
          </div>

          <TagInput
            initialTags={tags}
            placeholder="ประเภท"
            onChange={setTags}
          />

          <button
            onClick={handleEditItem}
            className="flex items-center justify-center gap-2 p-2 mt-2 font-medium rounded-md bg-sky-300 hover:bg-sky-400 text-sky-700"
          >
            ตกลง
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditItem
