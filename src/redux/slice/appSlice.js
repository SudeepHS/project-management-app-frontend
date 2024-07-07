import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../util/url";
const initialState = {
    loggedInUser: {
        name: "",
        email: "",
        password: "",
    },
    loading: false,
};

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: "post",
            url: `${BASE_URL}/auth/login`,
            data,
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const logout = createAsyncThunk("user/logout", async (thunkAPI) => {
    try {
        const response = await axios({
            method: "get",
            url: `${BASE_URL}/auth/logout`,
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const register = createAsyncThunk(
    "user/register",
    async (data, thunkAPI) => {
        try {
            const response = await axios({
                method: "post",
                url: `${BASE_URL}/auth/register`,
                data,
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.loggedInUser = payload.user;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.loggedInUser = payload.user;
            })
            .addCase(register.rejected, (state) => {
                state.loading = false;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.loggedInUser = {};
            })
            .addCase(logout.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default appSlice.reducer;
