import {
    Autocomplete,
    Avatar,
    Box,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function TicketComponent(props) {
    const { ticket, onClickTicket } = props;
    const { title, assignedToName, status } = ticket;
    let ticketColor;
    if (status === "New") {
        ticketColor = "#B2B2B2";
    } else if (status === "Active") {
        ticketColor = "#007ACC";
    } else if (status === "Closed") {
        ticketColor = "#339933";
    } else if (status === "Resolved") {
        ticketColor = "#FF9D00";
    }

    return (
        <Box
            onClick={() => onClickTicket(ticket)}
            sx={{
                background: "#fff",
                width: "100%",
                // borderRadius: "4px",
                cursor: "pointer",
                boxShadow: "3",
                height: "92px",
            }}
        >
            <Box sx={{ display: "flex" }}>
                <Box
                    sx={{
                        width: "8px",
                        height: "92px",
                        backgroundColor: `${ticketColor}`,
                        // borderRadius: "4px 0px 0px 4px",
                    }}
                ></Box>
                <Box sx={{ padding: "4px 8px", width: "100%" }}>
                    <Typography
                        sx={{ fontSize: "0.9rem", marginBottom: "6px" }}
                    >
                        {title}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            sx={{
                                width: "20px",
                                height: "20px",
                                marginRight: "6px",
                            }}
                        ></Avatar>
                        <Typography sx={{ textTransform: "capitalize" }}>
                            {assignedToName}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            // width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "6px",
                        }}
                    >
                        <Typography>Status</Typography>
                        <Typography sx={{ padding: "1px 4px" }}>
                            {status}
                        </Typography>
                        {/* <Select
                            IconComponent=''
                            value={status}
                            sx={{
                                width: "50%",
                                "& .MuiOutlinedInput-input": {
                                    padding: "1px 4px",
                                    fontSize: "0.9rem",
                                },
                            }}
                        >
                            <MenuItem value={"New"}>New</MenuItem>
                            <MenuItem value={"Active"}>Active</MenuItem>
                            <MenuItem value={"Resolved"}>Resolved</MenuItem>
                            <MenuItem value={"Closed"}>Closed</MenuItem>
                        </Select> */}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
