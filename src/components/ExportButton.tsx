import {Button} from "@mui/material";
import html2canvas from "html2canvas";

export const ExportButton = () => {
    const handleExport = async () => {
        const sketchElement = document.getElementById("paper-sketch-container");
        if (!sketchElement) return;

        const canvas = await html2canvas(sketchElement, {
            backgroundColor: "#282c34",
            scale: 2,
        });

        const link = document.createElement("a");
        link.download = "paper-arrangement.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <Button variant="outlined" onClick={handleExport}>
            Export Image
        </Button>
    );
};
