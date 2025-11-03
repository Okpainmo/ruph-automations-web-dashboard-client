import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UIState = {
  isRegisterOverlayOpen: boolean;
};

const initialState: UIState = {
  isRegisterOverlayOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openRegisterOverlay(state) {
      state.isRegisterOverlayOpen = true;
    },
    closeRegisterOverlay(state) {
      state.isRegisterOverlayOpen = false;
    },
    setRegisterOverlay(state, action: PayloadAction<boolean>) {
      state.isRegisterOverlayOpen = action.payload;
    },
  },
});

export const { openRegisterOverlay, closeRegisterOverlay, setRegisterOverlay } =
  uiSlice.actions;

export default uiSlice.reducer;


