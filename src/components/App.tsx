import "./App.css";
import { PaperSketch } from "./PaperSketch";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PapersTable } from "./PapersTable";
import EventEmitter from "events";
import { BookDimensionsInputBar } from "./BookDimensionsInputBar";
import { ArrangementFinderSelector } from "./ArrangementFinderSelector";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const emitter = new EventEmitter();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <div className="Title" >PaperFinder</div>
        <PaperSketch emitter={emitter} />
        <BookDimensionsInputBar emitter={emitter} />
        <ArrangementFinderSelector emitter={emitter} />
        <PapersTable emitter={emitter} />
      </div>
    </ThemeProvider>
  );
}

export default App;
