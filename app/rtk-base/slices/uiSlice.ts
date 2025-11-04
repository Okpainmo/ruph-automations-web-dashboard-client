import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UIState = {
  isRegisterOverlayOpen: boolean;
  isUpdateOverlayOpen: boolean;
};

const initialState: UIState = {
  isRegisterOverlayOpen: false,
  isUpdateOverlayOpen: false,
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
    openUpdateOverlay(state) {
      state.isUpdateOverlayOpen = true;
    },
    closeUpdateOverlay(state) {
      state.isUpdateOverlayOpen = false;
    },
    setUpdateOverlay(state, action: PayloadAction<boolean>) {
      state.isUpdateOverlayOpen = action.payload;
    },
  },
});

export const {
  openRegisterOverlay,
  closeRegisterOverlay,
  setRegisterOverlay,
  openUpdateOverlay,
  closeUpdateOverlay,
  setUpdateOverlay,
} = uiSlice.actions;

export default uiSlice.reducer;


