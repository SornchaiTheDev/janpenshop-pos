import { useRecoilValue } from 'recoil'
import { sellStatsState } from '@/store/sellStore'
import Button from '../Buttons/Button'
import { convertToThousand } from '@/utils/convertToThousand'

interface Props {
  onClose: () => void
}

function Change({ onClose }: Props) {
  const { change } = useRecoilValue(sellStatsState)

  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-2xl font-medium text-center">เงินทอน</h4>
      <h2 className="text-6xl font-bold text-center text-sky-500">
        {convertToThousand(change)} บาท
      </h2>
      <Button type="success" title="ปิดหน้าต่างนี้" onClick={onClose} />
    </div>
  )
}

export default Change
