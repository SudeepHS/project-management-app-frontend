import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import RegisterLogin from "./components/authentication/RegisterLogin";
import ProjectsPage from "./components/projects/ProjectsPage";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import TicketsPage from "./components/tickets/TicketsPage";
import ViewTicket from "./components/tickets/ViewTicket";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/projects",
                element: <ProjectsPage />,
            },
            {
                path: "/projects/:projectId",
                element: <TicketsPage />,
            },
            {
                path: "/projects/:projectId/:ticketId",
                element: <ViewTicket />,
            },
        ],
    },
    {
        path: "/account",
        element: <RegisterLogin />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
