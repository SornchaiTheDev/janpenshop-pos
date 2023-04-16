import { trpc } from '@/utils/trpc'
import { Stocks } from '@prisma/client'
import { useState, useEffect } from 'react'
import useScanDetection from 'use-scan-detection'

interface Props {
  onComplete: (item: Stocks) => void
}
function barcodeReader({ onComplete }: Props) {
  // TODO
  const [barcode, setBarcode] = useState<String>('')
  const handleOnComplete = (code: String) => {
    setBarcode(code)
    if (data) {
      onComplete(data)
    }
  }

  useScanDetection({ onComplete: handleOnComplete })
  const { data, refetch } = trpc.stock.getItem.useQuery(
    { barcode: barcode.toString() },
    { enabled: false }
  )

  return null
}

export default barcodeReader
