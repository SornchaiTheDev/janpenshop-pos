import { atom } from 'recoil'

export const menusState = atom({
  key: 'menusState',
  default: {
    isLoginModalOpen: false,
    isAddToStockModalOpen: false,
    isEditStockModalOpen: false,
    isAlertModalOpen: false,
    isDiscountModalOpen: false,
    isPayWithCashModalOpen: false,
    isPayWithQRCodeOpen: false,
    isBillModalOpen: false,
  },
})
