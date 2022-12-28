import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from 'utils/storage';

export interface InstalmentsProduct {
  price: number;
  priceInstalment: number;
  instalmentsPrice?: {
    6: number;
    9: number;
    12: number;
  }
  img?: string;
  amount?: number;
  id?: string | undefined;
  name?: string;
  category?: string | number;
}

interface CartState {
  productCount: number;
  totalPrice: number;
  limit: string;
  products: InstalmentsProduct[];
  categoryes: string[];
}

const initialState: CartState = loadState('paymartCart') || {
  productCount: 0,
  totalPrice: 0,
  limit: '12',
  products: [],
  categoryes: [
    'Телефоны и смартфоны',
    'Гаджеты и аксессуары',
    'Кондиционеры',
    'Компьютерная техника',
    'Телевизоры',
    'Аудиотехника и HI-FI',
    'Техника для офиса',
    'Техника для дома',
    'Техника для кухни',
    'Товары для авто',
    'Красота и спорт ',
  ]
}

const paymartCart = createSlice({
  initialState,
  name: 'payartCart',
  reducers: {
    addInstalments: (state, action: PayloadAction<InstalmentsProduct>) => {
      const product: InstalmentsProduct | undefined = state.products.find((item) => (item.id === action.payload.id));
      if (!product) {
        state.productCount += 1;
        for (let i = 0; i < state.categoryes.length; i++) {
          if (state.categoryes[i] === action.payload.category) {
            action.payload.category = i += 1;
          }
          else {
            action.payload.category = 12;
          }
        }
        state.products.push(action.payload);

        return
      }
      if (product) {
        state.products.map((item) => {
          if (item.name === product.name) {
            const price = action.payload.price;
            const instalment = action.payload.priceInstalment;
            if (item.amount && price) {
              item.amount += 1;
              item.price = item.amount * price;
              item.priceInstalment = item.amount * instalment
              state.productCount += 1;
            }


          }
        });
      }
    },
    removeInstalments: (state, action: PayloadAction<InstalmentsProduct>) => {
      state.products.map((item) => {
        if (item.name === action.payload.name && item.amount) {
          const price = action.payload.price;
          const intalments = action.payload.priceInstalment
          item.amount -= 1;
          if (price)
            item.price = item.amount * price;
          item.priceInstalment = item.amount * intalments;
          state.productCount -= 1;
        }
      });
    },
    totalPriceSeting: (state) => {
      state.totalPrice = state.products.reduce((a, b) => {

        return a + b?.priceInstalment

      }, 0)
    },
    checkStatus: (state, action: PayloadAction<{ status: string }>) => {
      state.limit = action.payload.status;
    },
    filterProducts: (state) => {
      state.products = state.products.filter((i) => i.price > 0);
    },
    priceLimitHandler: (state) => {
      state.products.map((i) => {
        const newLimit = state.limit;
        if (i.amount) {
          // @ts-expect-error
          i.priceInstalment = i.instalmentsPrice[newLimit];
          i.priceInstalment = i.amount * i.priceInstalment;
        }


      })
    },
    clearPaymartCart: (state) => {
      state.productCount = 0;
      state.totalPrice = 0;
      state.products = [];
    },
    deleteInstalments: (state, action: PayloadAction<InstalmentsProduct>) => {
      state.products = state.products.filter((item) => item.id !== action.payload.id)
    }
  }
});


export const { addInstalments, deleteInstalments, clearPaymartCart, priceLimitHandler, filterProducts, removeInstalments, totalPriceSeting, checkStatus } = paymartCart.actions;
export default paymartCart.reducer;