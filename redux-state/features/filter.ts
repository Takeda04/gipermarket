import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderDirection } from 'graphql/generated.graphql';

type direction = OrderDirection;
interface attribute {
  slug: string;
  values: string[];
}

export interface FilterState {
  price: {
    lte: number;
    gte: number;
  };
  sort?: {
    direction: direction;
  };
  attributes?: attribute[];
}

const initialState: FilterState = {
  price: {
    lte: 10000,
    gte: 0,
  },
  attributes: []
};

export const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changePrice: (
      state,
      action: PayloadAction<{ type: 'lte' | 'gte'; value: number }>
    ) => {
      return {
        ...state,
        price: { ...state.price, [action.payload.type]: action.payload.value },
      };
    },
    sort: (state, action: PayloadAction<{direction: direction}>) => {
      return {
        ...state,
        sort: {
          direction: action.payload.direction,
        },
      };
    },
    filterAttributes: (state, action: PayloadAction<attribute>) => {
      const isExists = state.attributes?.find(
        (attr) => attr.slug === action.payload.slug
      )?.slug;
      if (!isExists && state.attributes?.length !== undefined) {
        return {
          ...state,
          attributes: [...state.attributes, action.payload],
        };
      }
      return {
        ...state,
        attributes: state.attributes?.map((attr) => {
          if (attr.slug === isExists) {
            const valueOrder = attr.values.indexOf(action.payload.values[0]);
            if(valueOrder > -1) {
              return {
                ...attr,
                values: attr.values.filter(
                  (val) => val !== action.payload.values[0]
                ),
              };
            }
            return { ...attr, values: [...attr.values, action.payload.values[0]]  };
          }
          return attr;
        }),
      };
    },
    clearFilters: (state) => {
      return {...state, attributes: [], sort: undefined}
    }
  },
});

export const { changePrice, sort, filterAttributes, clearFilters } = filter.actions;
export default filter.reducer;
