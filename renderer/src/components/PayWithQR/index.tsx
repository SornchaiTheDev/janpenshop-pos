import { useRef } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { menusState } from '@/store/menusStore'
import { sellStatsState, sellStore } from '@/store/sellStore'
import { useOnClickOutside } from 'usehooks-ts'
import Button from '../Buttons/Button'
import { QRCodeSVG } from 'qrcode.react'
import generatePayload from 'promptpay-qr'
import { convertToThousand } from '@/utils/convertToThousand'
import Image from 'next/image'

function PayWithQRCode() {
  const modalRef = useRef<HTMLDivElement>(null)
  const setMenus = useSetRecoilState(menusState)
  const setSellStore = useSetRecoilState(sellStore)
  const { totalPrice } = useRecoilValue(sellStatsState)
  const PROMPT_PAY_ACC = '0817637549'

  const onClose = () => {
    setMenus((prev) => ({ ...prev, isPayWithQRCodeOpen: false }))
  }

  const onSuccess = () => {
    setSellStore({
      _items: [],
      discount: 0,
      money: 0,
      sellMode: 'retail',
    })
    onClose()
  }

  useOnClickOutside(modalRef, onClose)
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div
        ref={modalRef}
        className="flex flex-col w-1/3 gap-4 p-6 bg-white rounded-lg"
      >
        <Image src="/images/prompt-pay-logo.svg" width={'100%'} height={50} />
        <QRCodeSVG
          className="w-full"
          height={300}
          value={generatePayload(PROMPT_PAY_ACC, { amount: totalPrice })}
        />
        <div>
          <h5 className="text-center">
            จำนวนเงิน{' '}
            <span className="text-xl font-bold text-sky-500">
              {convertToThousand(totalPrice)}
            </span>{' '}
            บาท
          </h5>
          <h5 className="text-center">
            ชื่อบัญชี : <span className="text-xl font-bold">ศรชัย สมสกุล</span>
          </h5>
        </div>
        <div className="flex gap-2">
          <Button
            type="success"
            title="ชำระเงินเรียบร้อย"
            onClick={onSuccess}
          />
          <Button type="error" title="ยกเลิก" onClick={onClose} />
        </div>
      </div>
    </div>
  )
}

export default PayWithQRCode
