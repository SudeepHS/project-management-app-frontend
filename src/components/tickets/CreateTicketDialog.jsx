import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogTitle,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    createFilterOptions,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useEffect, useState } from "react";
import { getUsers } from "../../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromCookie } from "../../util/util";
import { createProject, getProjects } from "../../redux/slice/projectsSlice";
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
import CloseIcon from "@mui/icons-material/Close";
import { createTicket, getTickets } from "../../redux/slice/ticketSlice";
import { ToastContainer, toast } from "react-toastify";
export default function CreateTicketDialog({
    open,
    setCreateDialog,
    projectId,
}) {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const _ticket = {
        title: "",
        assignedTo: {
            _id: "",
            name: "",
            email: "",
        },
        project: "",
        description: "",
        priority: 2,
        status: "New",
    };
    const [ticket, setTicket] = useState(_ticket);
    function onCreateTicket() {
        const { userId } = getUserFromCookie();
        setTicket({ ...ticket, createdBy: userId });
        if (!ticket.title) {
            toast.error("Please enter Title");
            return;
        } else if (!ticket.assignedTo?._id) {
            toast.error("Please add Assigned To");
            return;
        }
        const payload = {
            title: ticket.title,
            createdBy: userId,
            assignedTo: ticket.assignedTo._id,
            assignedToName: ticket.assignedTo.name,
            project: projectId,
            description: ticket.description,
            priority: ticket.priority,
            status: ticket.status,
        };
        dispatch(createTicket(payload)).then((data) => {
            if (data.payload?.ticket) {
                toast.success("Ticket Created Successfully!!");
            }
            setCreateDialog(false);
            dispatch(getTickets({ params: projectId }));
        });
    }
    useEffect(() => {
        setTicket(_ticket);
        dispatch(getUsers());
    }, [open]);
    return (
        <Dialog open={open} sx={{ overflow: "hidden" }}>
            <ToastContainer position='bottom-center' duration='2000' />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#f0f6ff",
                }}
            >
                <DialogTitle
                    sx={{
                        padding: "0.8rem 1rem",
                        fontSize: "1.1rem",
                    }}
                >
                    Create Ticket
                </DialogTitle>
                <IconButton
                    onClick={() => setCreateDialog(false)}
                    sx={{ margin: "0rem 0.6rem" }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
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
                <InputLabel sx={{ marginTop: "1rem" }}>Assigned To</InputLabel>
                <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={users}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: 300 }}
                    value={ticket.assignedTo}
                    onChange={(event, newValue) =>
                        setTicket({ ...ticket, assignedTo: newValue })
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={{
                                "& .MuiAutocomplete-root .MuiOutlinedInput-root":
                                    {
                                        padding: "0",
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
                <InputLabel sx={{ marginTop: "1rem" }}>Description</InputLabel>
                <TextField
                    multiline
                    rows={2}
                    sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                            padding: "4px 8px",
                        },
                    }}
                    onChange={(e) =>
                        setTicket({ ...ticket, description: e.target.value })
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
                                setTicket({ ...ticket, status: e.target.value })
                            }
                        >
                            <MenuItem value={"New"}>New</MenuItem>
                            <MenuItem value={"Active"}>Active</MenuItem>
                            <MenuItem value={"Resolved"}>Resolved</MenuItem>
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
                        variant='contained'
                        sx={{ textTransform: "capitalize" }}
                        onClick={onCreateTicket}
                    >
                        Create Ticket
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
}
