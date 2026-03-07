import "./App.css";
import React from "react";
import {PaperSketch} from "./PaperSketch";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {BookDimensionsInputBar} from "./BookDimensionsInputBar";
import {ArrangementFinderSelector} from "./ArrangementFinderSelector";
import {PapersTable} from "./PapersTable";
import {PrintSettingsInputBar} from "./PrintSettingsInputBar";
import {PricePerSheetInput} from "./PricePerSheetInput";
import {ShareButton} from "./ShareButton";
import {ExportButton} from "./ExportButton";
import {useUrlStateHydration} from "../hooks/useUrlStateHydration";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    useUrlStateHydration();

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <div className="App">
                <div id="title">PaperFinder</div>
                <PaperSketch/>
                <BookDimensionsInputBar/>
                <PrintSettingsInputBar/>
                <PricePerSheetInput/>
                <ArrangementFinderSelector/>
                <div className="toolbar">
                    <ShareButton/>
                    <ExportButton/>
                </div>
                <PapersTable/>
            </div>
        </ThemeProvider>
    );
}

export default App;
