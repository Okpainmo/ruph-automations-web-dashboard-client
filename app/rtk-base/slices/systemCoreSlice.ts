import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axios from 'axios';
import axiosInstance from '@/app/utils/axiosConfig';

export interface Controller {
  id: number;
  controllerId: string;
  ownerEmail: string;
  circuitEndPoint_1: string;
  circuitEndPoint_2: string;
  circuitEndPoint_3: string;
  circuitEndPoint_4: string;
  controllerName: string;
  createdAt: string;
}

type InitialStateSpecs = {
  isLoading: boolean;
  controllers: Controller[];
  selectedController: Controller | null;
  isRegistering: boolean;
};

const initialState: InitialStateSpecs = {
  isLoading: false,
  controllers: [],
  selectedController: null,
  isRegistering: false,
};

type RegisterControllerSpecs = {
  controllerId: string;
  circuitEndPoint_1: string;
  circuitEndPoint_2: string;
  circuitEndPoint_3: string;
  circuitEndPoint_4: string;
};

export const fetchAllControllers = createAsyncThunk(
  'systemCore/fetchAllControllers',
  async (_, thunkAPI) => {
    try {
      toast.dismiss();

      const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL_BASE}/system/get-all-controllers`;

      const loadingId = toast.loading('Loading controllers...');

      const response = await axiosInstance.get(fetchUrl);

      // console.log(response);

      const controllers = response.data.response.systems || [];

      toast.dismiss(loadingId);

      return controllers;
    } catch (error) {
      console.log(error);

      toast.dismiss();
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.responseMessage
          ? error.response.data.responseMessage
          : 'Failed to fetch controllers.';
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const registerController = createAsyncThunk(
  'systemCore/registerController',
  async (registerData: RegisterControllerSpecs, thunkAPI) => {
    try {
      toast.dismiss();

      if (
        !registerData.controllerId ||
        !registerData.circuitEndPoint_1 ||
        !registerData.circuitEndPoint_2 ||
        !registerData.circuitEndPoint_3 ||
        !registerData.circuitEndPoint_4
      ) {
        toast.error('Please fill in all fields', { duration: 3000 });
        return thunkAPI.rejectWithValue('Missing required fields');
      }

      const registerUrl = `${process.env.NEXT_PUBLIC_API_URL_BASE}/system/register-controller`;

      const loadingId = toast.loading('Registering controller...');

      const response = await axiosInstance.post(registerUrl, registerData);

      // console.log(response);

      const newController = response.data.response;

      toast.dismiss(loadingId);
      toast.success('Controller registered successfully!', { duration: 3000 });

      // Refetch controllers to get updated list
      thunkAPI.dispatch(fetchAllControllers());

      return newController;
    } catch (error) {
      console.log(error);

      toast.dismiss();
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.responseMessage
          ? error.response.data.responseMessage
          : 'Failed to register controller.';
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getController = createAsyncThunk(
  'systemCore/getController',
  async (controllerId: number, thunkAPI) => {
    try {
      toast.dismiss();

      if (!controllerId) {
        toast.error('Controller ID is required', { duration: 3000 });
        return thunkAPI.rejectWithValue('Controller ID missing');
      }

      const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL_BASE}/system/get-controller/${controllerId}`;

      const loadingId = toast.loading('Fetching controller...');

      const response = await axiosInstance.get(fetchUrl);

      const controller = response.data.response.system;

      toast.dismiss(loadingId);

      return controller;
    } catch (error) {
      console.log(error);

      toast.dismiss();
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.responseMessage
          ? error.response.data.responseMessage
          : 'Failed to fetch controller.';
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const updateController = createAsyncThunk(
  'systemCore/updateController',
  async (
    {
      controllerId,
      updates,
    }: { controllerId: number; updates: Record<string, any> },
    thunkAPI
  ) => {
    try {
      toast.dismiss();

      if (!controllerId) {
        toast.error('Controller ID is required', { duration: 3000 });
        return thunkAPI.rejectWithValue('Controller ID missing');
      }

      const updateUrl = `${process.env.NEXT_PUBLIC_API_URL_BASE}/system/update-controller/${controllerId}`;

      const loadingId = toast.loading('Updating controller...');

      const response = await axiosInstance.patch(updateUrl, updates);

      const updatedController = response.data.response.system;

      toast.dismiss(loadingId);
      toast.success('Controller updated successfully!', { duration: 3000 });

      // 🔁 Refetch controllers to get latest data
      thunkAPI.dispatch(fetchAllControllers());

      return updatedController;
    } catch (error) {
      console.log(error);

      toast.dismiss();
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.responseMessage
          ? error.response.data.responseMessage
          : 'Failed to update controller.';
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const systemCoreSlice = createSlice({
  name: 'systemCore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all controllers
    builder.addCase(fetchAllControllers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllControllers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.controllers = action.payload;
    });
    builder.addCase(fetchAllControllers.rejected, (state) => {
      state.isLoading = false;
    });

    // Register controller
    builder.addCase(registerController.pending, (state) => {
      state.isRegistering = true;
    });
    builder.addCase(registerController.fulfilled, (state) => {
      state.isRegistering = false;
    });
    builder.addCase(registerController.rejected, (state) => {
      state.isRegistering = false;
    });

    // Update a controller
    builder.addCase(updateController.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateController.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateController.rejected, (state) => {
      state.isLoading = false;
    });

    // Fetch single controller
    builder.addCase(getController.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getController.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedController = action.payload;
    });
    builder.addCase(getController.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default systemCoreSlice.reducer;
