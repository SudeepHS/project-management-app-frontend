import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../util/url";

const initialState = {
    projects: [],
    loading: false,
};
export const getProjects = createAsyncThunk(
    "projects/getProjects",
    async (params, thunkAPI) => {
        try {
            const response = await axios({
                method: "get",
                url: `${BASE_URL}/projects/user/${params}`,
                withCredentials: true,
            });

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createProject = createAsyncThunk(
    "projects/createProject",
    async (data, thunkAPI) => {
        try {
            const response = await axios({
                method: "post",
                data,
                url: `${BASE_URL}/projects`,
                withCredentials: true,
            });

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProjects.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.projects = payload.projects;
            })
            .addCase(getProjects.rejected, (state) => {
                state.loading = false;
            })
            .addCase(createProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProject.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(createProject.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default projectsSlice.reducer;
