import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../util/url";

const initialState = {
    users: [],
    loading: false,
};

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (params, thunkAPI) => {
        try {
            const response = await axios({
                method: "get",
                url: `${BASE_URL}/users`,
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getSingleUser = createAsyncThunk(
    "users/getSingleUser",
    async (params, thunkAPI) => {
        try {
            const response = await axios({
                method: "get",
                url: `${BASE_URL}/users/${params}`,
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsers.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.users = payload.users;
            });
    },
});

export default userSlice.reducer;
