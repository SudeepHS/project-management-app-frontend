import {
    Autocomplete,
    Box,
    Breadcrumbs,
    Button,
    Grid,
    InputLabel,
    Link,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserFromCookie } from "../../util/util";
import { getTickets } from "../../redux/slice/ticketSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateTicketDialog from "./CreateTicketDialog";
import TicketComponent from "./TicketComponent";
import Loader from "../../util/Loader";
import { ToastContainer } from "react-toastify";

export default function TicketsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [createDialog, setCreateDialog] = useState(false);
    const { projectId } = useParams();
    const location = useLocation();
    const projectName = location.state;
    const [filters, setFilters] = useState({
        title: "",
        assignedTo: [],
        status: "",
        priority: "",
    });
    useEffect(() => {
        const { userId } = getUserFromCookie();
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
                <Button
                    variant='contained'
                    size='small'
                    startIcon={<AddIcon />}
                    sx={{ background: "#057aff", textTransform: "capitalize" }}
                    onClick={() => setCreateDialog(true)}
                >
                    New Ticket
                </Button>
            </Box>
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
                            margin: "0.8rem 1rem 0 1rem",
                        }}
                    >
                        Filter
                    </Typography>
                    <Grid
                        container
                        sx={{
                            background: "#f0f6ff",
                            padding: "1rem",
                        }}
                    >
                        <Grid
                            container
                            item
                            justifyContent='space-around'
                            alignItems='center'
                            spacing={4}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={3}
                                large={3}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
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
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={3}
                                large={3}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
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
                                                    backgroundColor: "#fff",
                                                    "& .MuiOutlinedInput-root":
                                                        {
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
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={3}
                                large={3}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
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
                                        <MenuItem value={"Active"}>
                                            Active
                                        </MenuItem>
                                        <MenuItem value={"Resolved"}>
                                            Resolved
                                        </MenuItem>
                                        <MenuItem value={"Closed"}>
                                            Closed
                                        </MenuItem>
                                    </Select>
                                </Box>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={3}
                                large={3}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
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
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            justifyContent='space-around'
                            alignItems='center'
                            spacing={4}
                        >
                            <Grid item xs={0} sm={6} md={9} large={9}></Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={3}
                                large={3}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: "1rem",
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
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box sx={{ margin: "1rem" }}>
                <Grid container spacing={2}>
                    {tickets.map((ticket) => (
                        <Grid
                            key={ticket._id}
                            item
                            xs={6}
                            sm={4}
                            md={2.4}
                            large={2.4}
                        >
                            <TicketComponent
                                ticket={ticket}
                                onClickTicket={onClickTicket}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
