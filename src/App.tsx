import "./App.css";
import { PaperLayout } from "./components/PaperLayout";
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
  let paperLayout = PaperLayout(onSelectedPaperSizeChangePointer);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <div className="Title">PaperFinder</div>
        {paperLayout}
        <BookSizeInputBar />
        <PapersTable onSelectedPaperSizeChange={onSelectedPaperSizeChangePointer.onSelectedPaperSizeChange} />
      </div>
    </ThemeProvider>
  );
}

export default App;
