import {
    Autocomplete,
    Box,
    Breadcrumbs,
    Button,
    Grid,
    IconButton,
    InputLabel,
    Link,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTickets } from "../../redux/slice/ticketSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateTicketDialog from "./CreateTicketDialog";
import TicketComponent from "./TicketComponent";
import Loader from "../../util/Loader";
import { ToastContainer } from "react-toastify";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

export default function TicketsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [createDialog, setCreateDialog] = useState(false);
    const { projectId } = useParams();
    const location = useLocation();
    const projectName = location.state;
    const [filter, setFilter] = useState(true);
    const [filters, setFilters] = useState({
        title: "",
        assignedTo: [],
        status: "",
        priority: "",
    });
    const userId = sessionStorage.getItem("userId");
    useEffect(() => {
        if (!userId) {
            navigate("/account");
        } else {
            dispatch(getTickets({ params: projectId }));
        }
    }, []);
    const users = useSelector((state) => state.users.users);
    const loading = useSelector((state) => state.tickets.loading);
    const tickets = useSelector((state) => state.tickets.tickets);
    function onClickTicket(ticket) {
        navigate(`/projects/${ticket.project}/${ticket._id}`, {
            state: { ticket, projectName },
        });
    }

    function applyFilters() {
        const payload = {};
        if (filters.title) {
            payload.title = filters.title;
        }
        if (filters.status) {
            payload.status = filters.status;
        }
        if (filters.priority) {
            payload.priority = filters.priority;
        }
        if (filters.assignedTo?.length > 0) {
            payload.assignedTo = filters.assignedTo.map((item) => item._id);
        }
        dispatch(getTickets({ params: projectId, payload }));
    }
    return (
        <Box>
            <CreateTicketDialog
                open={createDialog}
                setCreateDialog={setCreateDialog}
                projectId={projectId}
            />
            <ToastContainer position='bottom-center' />
            <Loader loading={loading} />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "6px",
                    background: "#f0f6ff",
                }}
            >
                <Box>
                    <Breadcrumbs separator={<NavigateNextIcon />}>
                        <Link
                            underline='hover'
                            onClick={() => navigate("/projects")}
                        >
                            Projects
                        </Link>
                        <Typography>{projectName.projectName}</Typography>
                    </Breadcrumbs>
                </Box>
                <Box>
                    <Tooltip title='Filter'>
                        <IconButton
                            onClick={() => setFilter((prev) => !prev)}
                            sx={{ marginRight: "8px" }}
                        >
                            <FilterAltOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Button
                        variant='contained'
                        size='small'
                        startIcon={<AddIcon />}
                        sx={{
                            background: "#057aff",
                            textTransform: "capitalize",
                        }}
                        onClick={() => setCreateDialog(true)}
                    >
                        New Ticket
                    </Button>
                </Box>
            </Box>
            {filter && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1rem",
                        padding: "1rem",
                    }}
                >
                    <Box
                        sx={{
                            background: "#f0f6ff",
                            width: "1200px",
                            padding: "0rem 1rem",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "1.2rem",
                                margin: "0.8rem 1rem 0rem 0rem",
                            }}
                        >
                            Filter
                        </Typography>
                        <Box
                            sx={{
                                padding: "1rem",
                                display: "grid",
                                gridTemplateColumns: "1fr",
                                "@media (min-width: 600px)": {
                                    gridTemplateColumns: "1fr 1fr",
                                },
                                "@media (min-width: 1100px)": {
                                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                                },
                                gap: 4,
                            }}
                        >
                            <Box sx={{ width: "100%" }}>
                                <InputLabel sx={{ color: "black" }}>
                                    Title
                                </InputLabel>
                                <TextField
                                    value={filters.title}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            title: e.target.value,
                                        })
                                    }
                                    sx={{
                                        backgroundColor: "#fff",
                                        width: "100%",
                                        "& .MuiOutlinedInput-root": {
                                            padding: "0px 0px",
                                        },
                                        "& .MuiOutlinedInput-input": {
                                            padding: "8.5px",
                                        },
                                    }}
                                ></TextField>
                            </Box>

                            <Box sx={{ width: "100%" }}>
                                <InputLabel
                                    sx={{
                                        marginTop: "0rem",
                                        color: "black",
                                    }}
                                >
                                    Assigned To
                                </InputLabel>
                                <Autocomplete
                                    limitTags={1}
                                    multiple
                                    disablePortal
                                    id='combo-box-demo'
                                    options={users}
                                    getOptionLabel={(option) => option.name}
                                    sx={{ width: "100%" }}
                                    value={filters.assignedTo}
                                    onChange={(event, newValue) =>
                                        setFilters({
                                            ...filters,
                                            assignedTo: newValue,
                                        })
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            sx={{
                                                width: "100%",
                                                backgroundColor: "#fff",
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
                            </Box>

                            <Box sx={{ width: "100%" }}>
                                <InputLabel sx={{ color: "black" }}>
                                    Status
                                </InputLabel>
                                <Select
                                    value={filters.status}
                                    sx={{
                                        backgroundColor: "#fff",
                                        width: "100%",
                                        "& .MuiOutlinedInput-input": {
                                            padding: "8px",
                                            fontSize: "0.9rem",
                                        },
                                    }}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
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

                            <Box sx={{ width: "100%" }}>
                                <InputLabel sx={{ color: "black" }}>
                                    Priority
                                </InputLabel>
                                <Select
                                    value={filters.priority}
                                    sx={{
                                        backgroundColor: "#fff",
                                        width: "100%",
                                        "& .MuiOutlinedInput-input": {
                                            padding: "8px",
                                            fontSize: "0.9rem",
                                        },
                                    }}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            priority: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                </Select>
                            </Box>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: "8px",
                                    gridColumn: "1",
                                    "@media (min-width: 600px)": {
                                        gridColumn: "2",
                                    },
                                    "@media (min-width: 1100px)": {
                                        gridColumn: "4",
                                    },
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        setFilters({
                                            title: "",
                                            assignedTo: [],
                                            status: "",
                                            priority: "",
                                        });
                                        dispatch(
                                            getTickets({
                                                params: projectId,
                                            })
                                        );
                                    }}
                                    variant='outlined'
                                    sx={{
                                        textTransform: "capitalize",
                                        width: "46%",
                                    }}
                                >
                                    Reset
                                </Button>
                                <Button
                                    onClick={applyFilters}
                                    variant='contained'
                                    sx={{
                                        textTransform: "capitalize",
                                        width: "46%",
                                    }}
                                >
                                    Search
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
            <Box sx={{ margin: "1rem" }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: 4,
                        "@media (min-width: 450px)": {
                            gridTemplateColumns: "1fr 1fr",
                        },
                        "@media (min-width: 600px)": {
                            gridTemplateColumns: "1fr 1fr 1fr",
                        },

                        "@media (min-width: 900px)": {
                            gridTemplateColumns: "1fr 1fr 1fr 1fr",
                        },
                        "@media (min-width: 1300px)": {
                            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                        },
                    }}
                >
                    {tickets.map((ticket) => (
                        <TicketComponent
                            ticket={ticket}
                            onClickTicket={onClickTicket}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
