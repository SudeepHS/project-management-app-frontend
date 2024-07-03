import {
    Autocomplete,
    Box,
    Breadcrumbs,
    Button,
    Dialog,
    DialogTitle,
    IconButton,
    InputLabel,
    Link,
    MenuItem,
    Select,
    TextField,
    Typography,
    createFilterOptions,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useEffect, useState } from "react";
import { getSingleUser, getUsers } from "../../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
import CloseIcon from "@mui/icons-material/Close";
// import { createTicket, getTickets } from "../../redux/slice/ticketSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteTicket, updateTicket } from "../../redux/slice/ticketSlice";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../util/Loader";
export default function ViewTicket({ open, setCreateDialog, projectId }) {
    const location = useLocation();
    const params = location.state.ticket;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [updateBtn, setUpdateButton] = useState(false);
    const [ticket, setTicket] = useState(params);
    // const [originalTicket, setOriginalTicket] = useState(params);
    useEffect(() => {
        dispatch(getUsers());
        dispatch(getSingleUser(params.assignedTo)).then((data) => {
            if (data.payload)
                setTicket({ ...params, assignedTo: data.payload });
        });
    }, []);
    const users = useSelector((state) => state.users.users);
    const ticketLoading = useSelector((state) => state.tickets.loading);
    const userLoading = useSelector((state) => state.users.loading);
    function onUpdateTicket() {
        const payload = {
            _id: ticket._id,
            title: ticket.title,
            createdBy: ticket.createdBy,
            assignedTo: ticket.assignedTo._id,
            assignedToName: ticket.assignedTo.name,
            project: ticket.project,
            description: ticket.description,
            priority: ticket.priority,
            status: ticket.status,
        };
        dispatch(updateTicket(payload)).then((data) => {
            if (data?.payload?.ticket) {
                toast.success("Ticket Updated Successfully!!");
            }
        });
    }

    function onDeleteTicket() {
        dispatch(deleteTicket(ticket._id)).then((data) => {
            if (data.payload?.msg) {
                toast.success("Ticket Deleted Successfully!!");
                setTimeout(() => {
                    navigate(-1);
                }, 1000);
            }
        });
    }
    // useEffect(() => {
    //     if (JSON.stringify(ticket) !== JSON.stringify(originalTicket)) {
    //         setUpdateButton(true);
    //     } else {
    //         setUpdateButton(false);
    //     }
    // }, [ticket]);
    // console.log(ticket);
    return (
        <Box>
            <ToastContainer position='bottom-center' />
            <Loader loading={ticketLoading || userLoading} />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "6px",
                    background: "#f0f6ff",
                }}
            >
                {/* <Typography>Projects</Typography> */}
                <Box>
                    <Box>
                        <Breadcrumbs separator={<NavigateNextIcon />}>
                            <Link
                                underline='hover'
                                onClick={() => navigate("/projects")}
                            >
                                Projects
                            </Link>
                            <Link
                                underline='hover'
                                onClick={() => navigate(-1)}
                            >
                                {location.state.projectName.projectName}
                            </Link>
                            <Typography>{ticket.title}</Typography>
                        </Breadcrumbs>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box sx={{ width: "335px" }}>
                    <Box sx={{ padding: "1rem" }}>
                        <InputLabel>Title</InputLabel>
                        <TextField
                            sx={{ width: "100%" }}
                            size='small'
                            placeholder='Enter Title'
                            value={ticket.title}
                            onChange={(e) =>
                                setTicket({ ...ticket, title: e.target.value })
                            }
                        />
                        <InputLabel sx={{ marginTop: "1rem" }}>
                            Assigned To
                        </InputLabel>
                        <Autocomplete
                            disablePortal
                            id='combo-box-demo'
                            options={users}
                            getOptionLabel={(option) => option.name}
                            sx={{ width: 300 }}
                            value={ticket.assignedTo}
                            onChange={(event, newValue) => {
                                // console.log(newValue);
                                setTicket({ ...ticket, assignedTo: newValue });
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            padding: "1px 10px",
                                        },
                                    }}
                                ></TextField>
                            )}
                            renderOption={(props, option) => (
                                <Typography {...props}>
                                    {`${option.name} - ${option.email}`}
                                </Typography>
                            )}
                        />
                        <InputLabel sx={{ marginTop: "1rem" }}>
                            Description
                        </InputLabel>
                        <TextField
                            multiline
                            rows={2}
                            value={ticket.description}
                            sx={{
                                width: "100%",
                                "& .MuiOutlinedInput-root": {
                                    padding: "4px 8px",
                                },
                            }}
                            onChange={(e) =>
                                setTicket({
                                    ...ticket,
                                    description: e.target.value,
                                })
                            }
                        ></TextField>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                marginTop: "1rem",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "50%",
                                }}
                            >
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={ticket.status}
                                    sx={{
                                        width: "90%",
                                        marginRight: "1rem",
                                        "& .MuiOutlinedInput-input": {
                                            padding: "8px",
                                            fontSize: "0.9rem",
                                        },
                                    }}
                                    onChange={(e) =>
                                        setTicket({
                                            ...ticket,
                                            status: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value={"New"}>New</MenuItem>
                                    <MenuItem value={"Active"}>Active</MenuItem>
                                    <MenuItem value={"Resolved"}>
                                        Resolved
                                    </MenuItem>
                                    <MenuItem value={"Closed"}>Closed</MenuItem>
                                </Select>
                            </Box>
                            <Box sx={{ width: "50%" }}>
                                <InputLabel>Priority</InputLabel>
                                <Select
                                    value={ticket.priority}
                                    sx={{
                                        width: "100%",
                                        "& .MuiOutlinedInput-input": {
                                            padding: "8px",
                                            fontSize: "0.9rem",
                                        },
                                    }}
                                    onChange={(e) =>
                                        setTicket({
                                            ...ticket,
                                            priority: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                </Select>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                marginTop: "1rem",
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Button
                                variant='text'
                                sx={{
                                    textTransform: "capitalize",
                                    marginRight: "1rem",
                                }}
                                onClick={() => navigate(-1)}
                            >
                                Close
                            </Button>
                            <Button
                                variant='outlined'
                                color='error'
                                sx={{
                                    textTransform: "capitalize",
                                    marginRight: "1rem",
                                }}
                                onClick={onDeleteTicket}
                            >
                                Delete
                            </Button>
                            <Button
                                variant='contained'
                                sx={{ textTransform: "capitalize" }}
                                onClick={onUpdateTicket}
                            >
                                Update
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
