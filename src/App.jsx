import { Outlet, redirect, useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/slice/appSlice";
function App() {
    const navigate = useNavigate();
    const locaction = useLocation();
    const name = sessionStorage.getItem("userName");
    const userId = sessionStorage.getItem("userId");
    const dispatch = useDispatch();

    useEffect(() => {
        if (
            userId &&
            (locaction.pathname === "/" || locaction.pathname === "/account")
        ) {
            navigate("/projects");
        } else if (!userId) {
            navigate("/account");
        }
    }, []);

    function onLogout() {
        dispatch(logout()).then(() => {
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("userName");
            navigate("/account");
        });
    }

    return (
        <Box>
            <ToastContainer position='bottom-center' autoClose={2000} />
            <Box
                sx={{
                    backgroundColor: "#021431",
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "2.5rem",
                        marginRight: "8px",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#C7C9D1",
                            marginRight: "1rem",
                            textTransform: "capitalize",
                        }}
                    >
                        Welcome, {name}
                    </Typography>
                    <Button
                        variant='outlined'
                        size='small'
                        sx={{ textTransform: "capitalize" }}
                        onClick={onLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>
            <Outlet />
        </Box>
    );
}

export default App;
