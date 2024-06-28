import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader({ loading }) {
    return (
        <div>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: 9999,
                }}
                open={loading}
            >
                <CircularProgress color='inherit' />
            </Backdrop>
        </div>
    );
}
