import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { loadState, saveState } from 'utils/storage';

interface User {
  token?: string | null;
  refreshToken?: string | null;
  csrfToken?: string | null;
  userId?: string | null;
  phone?: string | null;
}

interface UserState {
  isAuthenticated: boolean;
  user: User;
}

const initialState: UserState = loadState('user') || {
  isAuthenticated: false,
  user: {
    token: null,
    refreshToken: null,
    csrfToken: null,
    userId: null,
    phone: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      saveState('user', { isAuthenticated: true, user: action.payload });
      return { isAuthenticated: true, user: action.payload };
    },
    logout: () => {
      localStorage.removeItem('user');
      return {
        isAuthenticated: false,
        user: { token: null, userId: null, refreshToken: null, csrfToken: null, phone: null },
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
