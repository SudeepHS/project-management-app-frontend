import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogTitle,
    IconButton,
    InputLabel,
    TextField,
    Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useEffect, useState } from "react";
import { getUsers } from "../../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { createProject, getProjects } from "../../redux/slice/projectsSlice";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import Loader from "../../util/Loader";
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
export default function CreateProjectDialog({ open, setCreateDialog }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
    }, []);
    const [projectName, setProjectName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [projectNameError, setProjectNameError] = useState(false);
    const [userError, setUserError] = useState(false);
    const users = useSelector((state) => state.users.users);
    const loading = useSelector((state) => state.projects.loading);
    const loggedInUser = useSelector((state) => state.app.loggedInUser);
    const { userId } = loggedInUser;
    function onCreateProject() {
        if (!projectName || selectedUsers?.length === 0) {
            if (!projectName) {
                setProjectNameError(true);
            } else {
                setProjectNameError(false);
            }
            if (selectedUsers?.length === 0) {
                setUserError(true);
            } else {
                setUserError(false);
            }
            if (!projectName) {
                toast.error("Please enter project name");
                return;
            }
            if (selectedUsers?.length === 0) {
                toast.error("Please select atleast one user");
                return;
            }
        }

        const selectedUserIds = selectedUsers.map((user) => user._id);
        selectedUserIds.push(userId);
        dispatch(
            createProject({
                projectName,
                admin: userId,
                users: selectedUserIds,
            })
        ).then(() => {
            setCreateDialog(false);
            toast.success("Project Created Successfully!!");
            dispatch(getProjects(userId));
        });
    }
    useEffect(() => {
        setProjectName("");
        setSelectedUsers([]);
    }, [open]);
    return (
        <>
            <Dialog open={open}>
                <Loader loading={loading} />
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
                        Create Project
                    </DialogTitle>
                    <IconButton
                        onClick={() => setCreateDialog(false)}
                        sx={{ margin: "0rem 0.6rem" }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{ padding: "0rem 1rem" }}>
                    <InputLabel required sx={{ marginTop: "1rem" }}>
                        Project Name
                    </InputLabel>
                    <TextField
                        error={projectNameError}
                        size='small'
                        placeholder='Enter Project Name'
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        sx={{ width: "100%" }}
                    />
                    <InputLabel required sx={{ marginTop: "1rem" }}>
                        Users
                    </InputLabel>
                    <Autocomplete
                        multiple
                        limitTags={2}
                        id='checkboxes-tags-demo'
                        options={users}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.name}
                        value={selectedUsers}
                        onChange={(event, newValue) => {
                            setSelectedUsers(newValue);
                        }}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                    sx={{ padding: "0 !important" }}
                                />
                                {`${option.name} - ${option.email}`}
                            </li>
                        )}
                        style={{ width: 350 }}
                        renderInput={(params) => (
                            <TextField
                                error={userError}
                                {...params}
                                placeholder='Select Users'
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        padding: "1px 10px",
                                    },
                                }}
                            />
                        )}
                        sx={{ width: "400" }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            variant='contained'
                            onClick={onCreateProject}
                            sx={{
                                margin: "1rem 0rem",
                                textTransform: "capitalize",
                            }}
                        >
                            Create Project
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}
