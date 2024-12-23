import "./App.css";
import { PaperSketch } from "./PaperSketch";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PapersTable } from "./PapersTable";
import { BookDimensionsInputBar } from "./BookDimensionsInputBar";
import { ArrangementFinderSelector } from "./ArrangementFinderSelector";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <div id="title">PaperFinder</div>
        <PaperSketch />
        <BookDimensionsInputBar />
        <ArrangementFinderSelector />
        <PapersTable />
      </div>
    </ThemeProvider>
  );
}

export default App;
