import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { loadState } from 'utils/storage';

interface Product {
  id?: string;
  image: string;
  name: string;
  variant: string;
  slug?: string;
  discount?: {
    amountInSum?: number | null;
  };
  price?: {
    amountInSum?: number | null;
  };
  category?: string;
  instalmentsPrice: string;
}
interface CartState {
  productsCount: number;
  currency: string;
  likeList: Product[];
}

const initialState: CartState = loadState('likes') || {
  productsCount: 0,
  currency: 'Сум',
  likeList: [],
};

export const likeSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    like: (state, action: PayloadAction<Product>) => {
      if (!state.likeList.map(like => like.id).includes(action.payload.id)) {
        const data = { likeList: [...state.likeList, action.payload] };
        return { ...state, productsCount: state.productsCount + 1, ...data };
      }
      return state;
    },
    dislike: (state, action: PayloadAction<string>) => {
      const temp = state.likeList.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        productsCount: state.productsCount - 1,
        likeList: temp,
      };
    },
  },
});

export const { like, dislike } = likeSlice.actions;
export default likeSlice.reducer;
