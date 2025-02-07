import "./App.css";
import React from "react";
import {PaperSketch} from "./PaperSketch";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {BookDimensionsInputBar} from "./BookDimensionsInputBar";
import {ArrangementFinderSelector} from "./ArrangementFinderSelector";
import {PapersTable} from "./PapersTable";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <div className="App">
                <div id="title">PaperFinder</div>
                <PaperSketch/>
                <BookDimensionsInputBar/>
                <ArrangementFinderSelector/>
                <PapersTable/>
            </div>
        </ThemeProvider>
    );
}

export default App;
