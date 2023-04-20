import { menusState } from '@/store/menusStore'
import { useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { useOnClickOutside } from 'usehooks-ts'
import Pay from './Pay'
import Change from './Change'
import { sellStore } from '@/store/sellStore'

function PayWithCash() {
  const [step, setStep] = useState<'pay' | 'change'>('pay')
  const setMenus = useSetRecoilState(menusState)
  const setSellStore = useSetRecoilState(sellStore)
  const modalRef = useRef<HTMLDivElement>(null)

  const onClose = () => {
    if (step === 'change') {
      setSellStore({
        _items: [],
        discount: 0,
        money: 0,
        sellMode: 'retail',
      })
    }
    setMenus((prev) => ({ ...prev, isPayWithCashModalOpen: false }))
  }

  useOnClickOutside(modalRef, onClose)

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div ref={modalRef} className="w-1/3 p-4 bg-white rounded-lg">
        {step === 'pay' && (
          <Pay goToStepChange={() => setStep('change')} onCancel={onClose} />
        )}
        {step === 'change' && <Change onClose={onClose} />}
      </div>
    </div>
  )
}

export default PayWithCash
