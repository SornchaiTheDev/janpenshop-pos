import { atom } from 'recoil'

export const menusState = atom({
  key: 'menusState',
  default: {
    isLoginModalOpen : false,
    isAddToStockModalOpen : false,
  }
})
