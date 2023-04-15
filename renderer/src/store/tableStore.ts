import { atom } from 'recoil'

export const tableStore = atom({
  key: 'tableStore',
  default: {
    page: 0,
  },
})
