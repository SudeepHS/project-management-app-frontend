import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "../slice/appSlice";
import ProjectReducer from "../slice/projectsSlice";
import TicketReducer from "../slice/ticketSlice";
import UserReducer from "../slice/userSlice"

export const store = configureStore({
    reducer: {
        app: AppReducer,
        projects: ProjectReducer,
        tickets: TicketReducer,
        users: UserReducer
    },
});
