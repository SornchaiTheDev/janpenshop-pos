import { atom, selector } from 'recoil'
import type { Item } from '@/interface/Item'

interface SellStore {
  _items: Item[]
  discount: number
  money: number
  sellMode: 'retail' | 'wholesale'
}

export const sellStore = atom<SellStore>({
  key: 'sellStore',
  default: {
    _items: [],
    discount: 0,
    money: 0,
    sellMode: 'retail',
  },
})

export const sellStatsState = selector({
  key: 'sellStatsState',
  get: ({ get }) => {
    const { _items, discount, money, sellMode } = get(sellStore)

    const getPrice = (item: Item) => {
      if (sellMode === 'retail') {
        return item.retailPrice
      } else {
        return item.wholesalePrice
      }
    }

    const price = _items.reduce(
      (acc, item) => acc + item.amount * getPrice(item),
      0
    )

    const items = _items.map((item) => ({
      ...item,
      price: getPrice(item),
    }))

    const totalPrice = price - discount
    const change = money - totalPrice

    const itemAmount = _items.reduce((acc, item) => acc + item.amount, 0)

    return {
      items,
      discount,
      price,
      totalPrice,
      itemAmount,
      change,
    }
  },
})
