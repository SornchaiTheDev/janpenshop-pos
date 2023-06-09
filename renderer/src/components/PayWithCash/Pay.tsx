import { FormEvent, useState } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { sellStore, sellStatsState } from '@/store/sellStore'
import Input from '../Inputs/Simple'
import Button from '../Buttons/Button'

interface Props {
  goToStepChange: () => void
  onCancel: () => void
}

function Pay({ goToStepChange, onCancel }: Props) {
  const { totalPrice } = useRecoilValue(sellStatsState)
  const setSellStore = useSetRecoilState(sellStore)
  const [money, setMoney] = useState<string>('')

  const handleOnDiscount = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let _money = parseInt(money)
    if (isNaN(_money)) {
      _money = 0
    }
    if (_money < totalPrice) return
    setSellStore((prev) => ({ ...prev, money: _money }))
    goToStepChange()
  }

  const handleOnChange = (value: string) => {
    const num = parseInt(value)
    if (num >= 0) {
      setMoney(value)
    } else {
      setMoney('')
    }
  }
  return (
    <form onSubmit={handleOnDiscount} className="flex flex-col gap-4">
      <h4 className="text-2xl font-medium text-center">รับเงินมา</h4>
      <Input type="number" autofocus value={money} onChange={handleOnChange} />
      <div className="flex gap-2">
        <Button title="ตกลง" type="success" />
        <Button title="ยกเลิก" type="error" onClick={onCancel} />
      </div>
    </form>
  )
}

export default Pay
