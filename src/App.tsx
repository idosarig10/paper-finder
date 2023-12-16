import "./App.css";
import { PaperSketch } from "./components/PaperSketch";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PapersTable } from "./components/PapersTable";
import EventEmitter from "events";
import { BookDimensionsInputBar } from "./components/BookDimensionsInputBar";

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
        <div className="Title">PaperFinder</div>
        <PaperSketch emitter={emitter} />
        <BookDimensionsInputBar emitter={emitter} />
        <PapersTable  emitter={emitter}/>
      </div>
    </ThemeProvider>
  );
}

export default App;
