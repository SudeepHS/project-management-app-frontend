import {
    Box,
    Button,
    InputLabel,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../redux/slice/appSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../util/Loader";

export default function RegisterLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = {
        name: "",
        email: "",
        password: "",
    };
    const [accountState, setAccountState] = useState("login");
    const [userData, setUserData] = useState(user);
    const loading = useSelector((state) => state.app.loading);
    function handleSubmit() {
        if (accountState === "login") {
            if (!userData.email) {
                toast.error("Please enter email");
                return;
            } else if (!userData.password) {
                toast.error("Please enter password");
                return;
            }
            dispatch(
                login({ email: userData.email, password: userData.password })
            ).then((data) => {
                if (data.payload?.user) {
                    sessionStorage.setItem("userId", data.payload?.user.userId);
                    sessionStorage.setItem("userName", data.payload?.user.name);
                    navigate("/projects");
                } else {
                    toast.error("Invalid Credentials");
                }
            });
        } else if (accountState === "register") {
            if (!userData.name) {
                toast.error("Please enter name");
                return;
            } else if (!userData.email) {
                toast.error("Please enter email");
                return;
            } else if (!userData.password) {
                toast.error("Please enter password");
                return;
            }
            dispatch(
                register({
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                })
            ).then((data) => {
                if (data.payload?.user) {
                    navigate("/projects");
                } else {
                    toast.error("Invalid Credentials");
                }
            });
        }
    }
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#FFF",
            }}
        >
            <ToastContainer position='bottom-center' />
            <Loader loading={loading} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    background: "#fff",
                    padding: "2rem",
                    borderRadius: "8px",
                    boxShadow: "3",
                }}
            >
                {/* <Typography
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        color: "#3B82F6",
                        fontWeight: "semibold",
                        fontSize: "1.2rem",
                        marginBottom: "0.5rem",
                    }}
                >
                    Project Management Tool
                </Typography> */}
                <Typography
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "1rem",
                        color: "#394E6A",
                        fontSize: "30px",
                        fontFamily: "sans-serif",
                        fontWeight: "700",
                    }}
                >
                    {accountState === "login" ? "Login" : "Register"}
                </Typography>
                {accountState === "register" && (
                    <>
                        <InputLabel
                            sx={{
                                color: "#394E6A",
                                fontSize: "0.875rem",
                                padding: "4px 2px",
                            }}
                        >
                            Name
                        </InputLabel>
                        <TextField
                            variant='outlined'
                            size='small'
                            sx={{ marginBottom: "1rem", width: "280px" }}
                            value={userData.name}
                            onChange={(e) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                        ></TextField>
                    </>
                )}
                <InputLabel
                    sx={{
                        color: "#394E6A",
                        fontSize: "0.875rem",
                        padding: "4px 2px",
                    }}
                >
                    Email
                </InputLabel>
                <TextField
                    variant='outlined'
                    size='small'
                    type='email'
                    sx={{ marginBottom: "1rem", width: "280px" }}
                    value={userData.email}
                    onChange={(e) =>
                        setUserData((prev) => ({
                            ...prev,
                            email: e.target.value,
                        }))
                    }
                ></TextField>
                <InputLabel
                    sx={{
                        color: "#394E6A",
                        fontSize: "0.875rem",
                        padding: "4px 2px",
                    }}
                >
                    Password
                </InputLabel>
                <TextField
                    variant='outlined'
                    size='small'
                    type='password'
                    sx={{ marginBottom: "1rem", width: "280px" }}
                    value={userData.password}
                    onChange={(e) =>
                        setUserData((prev) => ({
                            ...prev,
                            password: e.target.value,
                        }))
                    }
                ></TextField>
                <Button
                    variant='contained'
                    sx={{
                        marginBottom: "1rem",
                        textTransform: "capitalize",
                        backgroundColor: "#3B82F6",
                        color: "#DBE1FF",
                    }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {accountState === "login" ? (
                        <Typography sx={{ color: "#394E6A", fontSize: "16px" }}>
                            {`Don't have an account? `}
                            <Link
                                underline='none'
                                onClick={() => {
                                    setUserData(user);
                                    setAccountState("register");
                                }}
                                sx={{ cursor: "pointer" }}
                            >
                                Register
                            </Link>
                        </Typography>
                    ) : (
                        <Typography sx={{ color: "#394E6A", fontSize: "16px" }}>
                            {`Already have an account? `}
                            <Link
                                underline='none'
                                onClick={() => {
                                    setUserData(user);
                                    setAccountState("login");
                                }}
                                sx={{
                                    cursor: "pointer",
                                    color: "#057AFF",
                                    fontSize: "16px",
                                }}
                            >
                                Login
                            </Link>
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
