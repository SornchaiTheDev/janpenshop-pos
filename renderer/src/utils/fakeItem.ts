interface Data {
  order: number
  barcode: string
  name: string
  tag: string
  amount: number
  retailPrice: number
  wholesalePrice: number
  cost: number
}

export const fakeData = (amount: number = 0) => {
  const cosmetics: Data[] = []
  for (let i = 1; i <= amount; i++) {
    const barcode = Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(9, '0')
    const name = `สินค้า ${i}`
    const tag = `Tag ${Math.floor(Math.random() * 10) + 1}`
    const retailPrice = Math.floor(Math.random() * 10000) + 1
    const wholesalePrice = Math.floor(Math.random() * 10000) + 1
    const cost = Math.floor(Math.random() * 1000) + 1

    cosmetics.push({
      order: i,
      barcode: barcode,
      name: name,
      tag: tag,
      amount,
      retailPrice,
      wholesalePrice,
      cost,
    })
  }
  return cosmetics
}
