import {Button, Snackbar} from "@mui/material";
import {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {encodeStateToUrl} from "../utils/urlSharing";
import {isEqual} from "lodash-es";

export const ShareButton = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const bookDimensions = useSelector((state: RootState) => state.bookDimensions, isEqual);
    const printSettings = useSelector((state: RootState) => state.printSettings, isEqual);
    const pricePerSheet = useSelector((state: RootState) => state.pricePerSheet);
    const arrangementFinderLabel = useSelector((state: RootState) => state.arrangementFinderLabel);
    const selectedPaperRecord = useSelector((state: RootState) => state.selectedPaperRecord, isEqual);

    const handleShare = async () => {
        const url = encodeStateToUrl({
            bookDimensions,
            printSettings,
            pricePerSheet,
            arrangementFinderLabel,
            selectedPaperDimensions: selectedPaperRecord?.paperDimensions ?? null,
        });
        await navigator.clipboard.writeText(url);
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
                message="Link copied to clipboard!"
            />
        </>
    );
};
