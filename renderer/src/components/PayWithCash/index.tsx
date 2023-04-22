import { menusState } from '@/store/menusStore'
import { useRef, useState } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { useOnClickOutside } from 'usehooks-ts'
import Pay from './Pay'
import Change from './Change'
import { sellStore, sellStatsState } from '@/store/sellStore'
import { trpc } from '@/utils/trpc'

function PayWithCash() {
  const [step, setStep] = useState<'pay' | 'change'>('pay')
  const setMenus = useSetRecoilState(menusState)
  const { items, totalPrice, discount } = useRecoilValue(sellStatsState)
  const setSellStore = useSetRecoilState(sellStore)
  const modalRef = useRef<HTMLDivElement>(null)

  const addHistory = trpc.history.addHistory.useMutation()

  const onClose = async () => {
    if (step === 'change') {
      try {
        const historyData = items.map(({ name, barcode, price, amount }) => ({
          name,
          barcode,
          price,
          amount,
        }))

        await addHistory.mutateAsync({
          billId: Date.now().toString(),
          items: historyData,
          totalPrice,
          discount,
        })

        setSellStore({
          _items: [],
          discount: 0,
          money: 0,
          sellMode: 'retail',
        })
      } catch (e) {}
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
