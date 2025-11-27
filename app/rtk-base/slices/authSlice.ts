import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axios from 'axios';
// import { useRouter } from 'next/navigation';
import axiosInstance from '@/app/utils/axiosConfig';

// import { useSelector } from 'react-redux';

// const url = 'https://course-api.com/react-useReducer-cart-project';

// @ts-ignore
// const { slideNavIn } = useSelector((store) => store.navToggle);

export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

export interface LocalStorageUserDataSpecs {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  accessToken: string | null;
  refreshToken?: string | null;
}

type InitialStateSpecs = {
  isLoading: boolean;
  localStorageUserData: LocalStorageUserDataSpecs | null;
  userAccessToken: string | null | undefined;
};

const initialState: InitialStateSpecs = {
  isLoading: false,
  userAccessToken: null,
  localStorageUserData: null,
};

type LoginSpecs = {
  //   name: string;
  email: string;
  password: string;
};

// export type SignUpDataSpecs = {
//   name: string;
//   email: string;
//   password: string;
//   //   confirmPassword: string;
//   profileImage: File | null;
// };

export const handleLogin = createAsyncThunk(
  'auth/handleLogin',
  async (loginData: LoginSpecs, thunkAPI) => {
    try {
      toast.dismiss();

      if (loginData.email == '' || loginData.password == '') {
        toast.error('Please fill in all fields', { duration: 3000 });
        return;
      }

      const loginUrl = `${process.env.NEXT_PUBLIC_API_URL_BASE}/auth/log-in`;

      const loadingId = toast.loading('processing request...');

      const response = await axiosInstance.post(loginUrl, loginData);

      // console.log(response);

      const { accessToken, refreshToken, userProfile } = response.data.response;

      // Dispatching setUserInfo with tokens and user profile
      thunkAPI.dispatch(
        setUserInfo({
          userInfo: {
            ...userProfile,
            accessToken: accessToken || null,
            refreshToken: refreshToken || null,
          },
        })
      );

      toast.dismiss(loadingId);
      // console.log(userProfile);

      return response;
    } catch (error) {
      // Check if `error` is an AxiosError
      // console.log(error);

      toast.dismiss();
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.responseMessage
          ? error.response.data.responseMessage
          : 'An unexpected error occurred.';
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (
      state,
      action: PayloadAction<{
        userInfo: LocalStorageUserDataSpecs;
      }>
    ) => {
      state.localStorageUserData = action.payload.userInfo;
      state.userAccessToken = action.payload.userInfo.accessToken;

      try {
        localStorage.setItem(
          'accessToken',
          action.payload.userInfo.accessToken || ''
        );
        if (action.payload.userInfo.accessToken) {
          localStorage.setItem('accessTokenSetTime', Date.now().toString());
        }
        if (action.payload.userInfo.refreshToken) {
          localStorage.setItem(
            'refreshToken',
            action.payload.userInfo.refreshToken || ''
          );
        }
        localStorage.setItem('email', action.payload.userInfo?.email || '');
        localStorage.setItem(
          'userInfo',
          JSON.stringify(action.payload.userInfo)
        );
      } catch (error) {
        console.error('Error saving user info to localStorage:', error);
      }
    },
    clearUserInfo: (state) => {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing user info:', error);
      }
    },
    toggleIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleLogin.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(handleLogin.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { clearUserInfo, setUserInfo, toggleIsLoading } =
  authSlice.actions;

export default authSlice.reducer;
