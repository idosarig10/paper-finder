import {Button, Snackbar} from "@mui/material";
import {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {encodeStateToUrl} from "../utils/urlSharing";
import {isEqual} from "lodash-es";

export const ShareButton = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("Link copied to clipboard!");

    const bookDimensions = useSelector((state: RootState) => state.bookDimensions, isEqual);
    const printSettings = useSelector((state: RootState) => state.printSettings, isEqual);
    const pricePerSheet = useSelector((state: RootState) => state.pricePerSheet);
    const arrangementFinderLabel = useSelector((state: RootState) => state.arrangementFinderLabel);

    const handleShare = async () => {
        const url = encodeStateToUrl({
            bookDimensions,
            printSettings,
            pricePerSheet,
            arrangementFinderLabel,
        });
        try {
            await navigator.clipboard.writeText(url);
            setSnackbarMessage("Link copied to clipboard!");
        } catch {
            setSnackbarMessage("Failed to copy link. Please copy it manually.");
        }
        setSnackbarOpen(true);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleShare}>
                Share
            </Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </>
    );
};
