import { Box, Button, Link, TextField, Typography } from "@mui/material";
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
                background: "#F0F6FF",
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
                    borderRadius: "4px",
                    boxShadow: "3",
                }}
            >
                <Typography
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
                </Typography>
                <Typography
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "1rem",
                        color: "#102A43",
                        fontSize: "1.5rem",
                    }}
                >
                    {accountState === "login" ? "Login" : "Register"}
                </Typography>
                {accountState === "register" && (
                    <TextField
                        variant='outlined'
                        size='small'
                        placeholder='Name'
                        sx={{ marginBottom: "1rem", width: "256px" }}
                        value={userData.name}
                        onChange={(e) =>
                            setUserData((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                    ></TextField>
                )}

                <TextField
                    variant='outlined'
                    size='small'
                    type='email'
                    placeholder='Email'
                    sx={{ marginBottom: "1rem", width: "256px" }}
                    value={userData.email}
                    onChange={(e) =>
                        setUserData((prev) => ({
                            ...prev,
                            email: e.target.value,
                        }))
                    }
                ></TextField>
                <TextField
                    variant='outlined'
                    size='small'
                    placeholder='Password'
                    type='password'
                    sx={{ marginBottom: "1rem", width: "256px" }}
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
                    }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                {accountState === "login" ? (
                    <Typography>
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
                    <Typography>
                        {`Already have an account? `}
                        <Link
                            underline='none'
                            onClick={() => {
                                setUserData(user);
                                setAccountState("login");
                            }}
                            sx={{ cursor: "pointer" }}
                        >
                            Login
                        </Link>
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
