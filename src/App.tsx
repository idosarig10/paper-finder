import "./App.css";
import { PaperSketch } from "./components/PaperSketch";
import { BookSizeInputBar } from "./components/BookSizeInputBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PapersTable } from "./components/PapersTable";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const onSelectedPaperSizeChangePointer = {onSelectedPaperSizeChange: () => {}};
  const paperSketch = PaperSketch(onSelectedPaperSizeChangePointer);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <div className="Title">PaperFinder</div>
        {paperSketch}
        <BookSizeInputBar />
        <PapersTable onSelectedPaperSizeChange={onSelectedPaperSizeChangePointer.onSelectedPaperSizeChange} />
      </div>
    </ThemeProvider>
  );
}

export default App;
