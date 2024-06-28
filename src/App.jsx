import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import { useEffect } from "react";
import { getUserFromCookie } from "./util/util";
import { Box, Button, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
    const navigate = useNavigate();
    const locaction = useLocation();
    const { userId, name } = getUserFromCookie();

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

    async function logout() {
        document.cookie.split(";").forEach(function (c) {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(
                    /=.*/,
                    "=;expires=" + new Date().toUTCString() + ";path=/"
                );
        });
        navigate("/account");
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
                        marginRight: "4rem",
                    }}
                >
                    <Typography sx={{ color: "#C7C9D1", marginRight: "1rem" }}>
                        Welcome, {name}
                    </Typography>
                    <Button
                        variant='outlined'
                        size='small'
                        sx={{ textTransform: "capitalize" }}
                        onClick={logout}
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
