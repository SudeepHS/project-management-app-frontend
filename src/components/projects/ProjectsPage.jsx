import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../redux/slice/projectsSlice";
import { useNavigate } from "react-router-dom";
import { Box, Breadcrumbs, Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateProjectDialog from "./CreateProjectDialog";
import { ToastContainer } from "react-toastify";
import Loader from "../../util/Loader";

export default function ProjectsPage() {
    const [createDialog, setCreateDialog] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.app.loggedInUser);
    useEffect(() => {
        const { userId } = loggedInUser;
        if (!userId) {
            navigate("/account");
        } else {
            dispatch(getProjects(userId));
        }
    }, []);
    const projects = useSelector((state) => state.projects.projects);
    const loading = useSelector((state) => state.projects.loading);
    function onClickProject(projectId, projectName) {
        navigate(`/projects/${projectId}`, { state: { projectName } });
    }
    return (
        <Box sx={{ backgroundColor: "#fff" }}>
            <ToastContainer position='bottom-center' />
            <Loader loading={loading} />
            <CreateProjectDialog
                open={createDialog}
                setCreateDialog={setCreateDialog}
            />

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
                    <Breadcrumbs>
                        <Typography>Projects</Typography>
                    </Breadcrumbs>
                </Box>
                <Button
                    variant='contained'
                    size='small'
                    startIcon={<AddIcon />}
                    sx={{ background: "#057aff", textTransform: "capitalize" }}
                    onClick={() => setCreateDialog(true)}
                >
                    New Project
                </Button>
            </Box>
            <Box sx={{ margin: "1rem 2rem 1rem 1rem" }}>
                <Grid container spacing={4}>
                    {projects.map((project) => (
                        <Grid
                            key={project._id}
                            item
                            xs={6}
                            sm={4}
                            md={3}
                            large={2.4}
                        >
                            <Box
                                sx={{
                                    background: "#f0f6ff",
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                                }}
                                onClick={() =>
                                    onClickProject(
                                        project._id,
                                        project.projectName
                                    )
                                }
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#394e6a",
                                    }}
                                >
                                    {project.projectName}
                                </Typography>
                                <Typography sx={{ color: "#463aa1" }}>
                                    Tickets - {project.tickets.length}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
