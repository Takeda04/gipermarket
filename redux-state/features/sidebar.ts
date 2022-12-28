import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: false,
};

export const sidebar = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<boolean>) => {
      return { isOpen: action.payload };
    },
  },
});

export const { toggle } = sidebar.actions;
export default sidebar.reducer;
