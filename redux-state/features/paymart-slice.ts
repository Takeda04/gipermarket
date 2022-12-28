import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface PaymartProp {
  phone?: null | string;
  hash?: null | string;
  step?: number;
  buyerId?: null | string;
  user?: boolean;
  contractId?: null | string;
  acsessToken?: null | string;
  stepprNumber?: number;
  order?: boolean;
  card?: {
    number: null | string;
    exp: null | string;
  }
}

const initialState: PaymartProp = {
  phone: null,
  hash: null,
  step: 0,
  user: false,
  order: false,
  buyerId: null,
  contractId: null,
  stepprNumber: 0,
  card: {
    number: null,
    exp: null
  }

}
const paymartSlice = createSlice({
  name: 'paymart',
  initialState,
  reducers: {
    addItemPaymart: (state, action: PayloadAction<PaymartProp>) => {
      return { ...state, phone: action.payload.phone, hash: action.payload.hash };
    },
    addPhone: (state, action: PayloadAction<PaymartProp>) => {
      return { ...state, phone: action.payload.phone }
    },
    addHashCode: (state, action: PayloadAction<PaymartProp>) => {
      return { ...state, hash: action.payload.hash }
    },
    addPaymartStatus: (state, action: PayloadAction<PaymartProp>) => {
      return { ...state, step: action.payload.step };
    },
    addBuyerId: (state, action: PayloadAction<PaymartProp>) => {
      return { ...state, buyerId: action.payload.buyerId }
    },
    addAcsessToken: (state, action: PayloadAction<PaymartProp>) => {
      return { ...state, acsessToken: action.payload.acsessToken }
    },
    detailCard: (state, action: PayloadAction<PaymartProp>) => {
      return { ...state, card: action.payload.card }
    },
    changeUser: (state, action: PayloadAction<PaymartProp>) => {
      return { ...state, user: action.payload.user }
    },
    addContractId: (state, action: PayloadAction<PaymartProp>) => {
      return { ...state, contractId: action.payload.contractId }
    },
    specialOrdering: (state, action: PayloadAction<PaymartProp>) => {
      return { ...state, order: action.payload.order }
    },

  },
})

export const { addItemPaymart, addContractId, detailCard, addPhone, addHashCode, addPaymartStatus, addBuyerId, addAcsessToken, changeUser, specialOrdering } = paymartSlice.actions;

export default paymartSlice.reducer;
