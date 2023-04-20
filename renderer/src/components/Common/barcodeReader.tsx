import { trpc } from '@/utils/trpc'
import { Stocks } from '@prisma/client'
import { useState, useEffect } from 'react'
import useScanDetection from 'use-scan-detection'

interface Props {
  onComplete: (item: Stocks) => void
}
function barcodeReader({ onComplete }: Props) {
  const utils = trpc.useContext()

  const handleOnComplete = async (code: String) => {
    const data = await utils.stock.getItem.fetch({ barcode: code.toString() })
    if (data) {
      console.log(data)
      onComplete(data)
    }
  }

  useScanDetection({ onComplete: handleOnComplete })
  return null
}

export default barcodeReader
