import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PriceInput } from 'graphql/generated.graphql';
import { WritableDraft } from 'immer/dist/internal';
import { loadState } from 'utils/storage';

interface Product {
  id?: string;
  image: string;
  name: string;
  is_saved: boolean;
  category:string | null;
  inDiscount?: boolean | null;
  instalmentsPrice:number;
  variant: string;
  slug?: string;
  price?: {
    amountInSum?: number | null;
  };
}

export interface CartProduct extends Product {
  count: number;
}

interface CartState {
  productsCount: number;
  totalPrice: number;
  currency: string;
  cartProducts: CartProduct[];
}

const initialState: CartState = loadState('cart') || {
  productsCount: 0,
  totalPrice: 0,
  currency: 'Сум',
  cartProducts: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const newCartProduct = state.cartProducts.find(
        (product: WritableDraft<CartProduct>) =>
          product.id === action.payload.id
      );
      if (newCartProduct) {
        const tempCart = state.cartProducts.map((product) => {
          if (product.id === action.payload.id) {
            let newAmount = product.count + 1;
            return { ...product, count: newAmount };
          } else {
            return product;
          }
        });

        return { ...state, cartProducts: tempCart };
      } else {
        const newItem = { ...action.payload, count: 1 };
        return {
          ...state,
          cartProducts: [...state.cartProducts, newItem],
        };
      }
    },
    toggleAmout: (
      state,
      action: PayloadAction<{ id: string; type: string }>
    ) => {
      const wantedItem = state.cartProducts.find(
        (product: WritableDraft<CartProduct>) =>
          product.id === action.payload.id
      );
      if (wantedItem && wantedItem.count >= 1) {
        const tempCart = state.cartProducts.map((product) => {
          if (product.id === action.payload.id) {
            let newAmount =
              action.payload.type === 'increment'
                ? product.count + 1
                : product.count - 1;
            return { ...product, count: newAmount };
          } else {
            return product;
          }
        });

        return {
          ...state,
          cartProducts: tempCart,
        };
      } else {
        return state;
      }
    },
    clearCart: (state) => {
      return { ...state, productsCount: 0, totalAmount: 0, cartProducts: [] };
    },
    calculateSum: (state) => {
      const productSum = state.cartProducts.reduce(
        (prev, curr) => prev + curr.count,
        0
      );

      const productPriceSum = state.cartProducts.reduce(
        (prev, curr) =>
          curr.price && curr.price.amountInSum ? prev + curr.count * curr?.price?.amountInSum : 0,
        0
      );
      return {
        ...state,
        productsCount: productSum,
        totalPrice: productPriceSum,
      };
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const tempCart = state.cartProducts.filter(
        (product) => product.id !== action.payload
      );
      return { ...state, cartProducts: tempCart };
    },
    changeCurrency: (state, action: PayloadAction<string>) => {
      return { ...state, currency: action.payload };
    },
  },
});

export const {
  addToCart,
  toggleAmout,
  clearCart,
  calculateSum,
  removeItem,
  changeCurrency,
} = cartSlice.actions;
export default cartSlice.reducer;
