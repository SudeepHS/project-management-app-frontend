import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../util/url";
const initialState = {
    tickets: [],
    loading: false,
};

export const getTickets = createAsyncThunk(
    "tickets/getTickets",
    async (data, thunkAPI) => {
        try {
            const response = await axios({
                method: "get",
                url: `${BASE_URL}/tickets/project/${data.params}`,
                params: data.payload,
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const getSingleTicket = createAsyncThunk(
    "tickets/getSingleTicket",
    async (params, thunkAPI) => {
        try {
            const response = await axios({
                method: "get",
                url: `${BASE_URL}/tickets/${params}`,
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const createTicket = createAsyncThunk(
    "tickets/createTicket",
    async (data, thunkAPI) => {
        try {
            const response = await axios({
                method: "post",
                url: `${BASE_URL}/tickets`,
                data,
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const updateTicket = createAsyncThunk(
    "tickets/updateTicket",
    async (data, thunkAPI) => {
        try {
            const response = await axios({
                method: "patch",
                url: `${BASE_URL}/tickets/${data._id}`,
                data,
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const deleteTicket = createAsyncThunk(
    "tickets/deleteTicket",
    async (ticketId, thunkAPI) => {
        try {
            const response = await axios({
                method: "delete",
                url: `${BASE_URL}/tickets/${ticketId}`,
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTickets.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTickets.fulfilled, (state, { payload }) => {
                console.log("hello");
                state.loading = false;
                state.tickets = payload.tickets;
            })
            .addCase(getTickets.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getSingleTicket.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleTicket.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(getSingleTicket.rejected, (state) => {
                state.loading = false;
            })
            .addCase(createTicket.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTicket.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(createTicket.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateTicket.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTicket.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(updateTicket.rejected, (state) => {
                state.loading = false;
            })
            .addCase(deleteTicket.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTicket.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(deleteTicket.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default ticketSlice.reducer;
