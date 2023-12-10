import React, { useState } from 'react';
import './App.css';
import { PaperLayout } from './components/PaperLayout';
import { BookSizeInputBar } from './components/BookSizeInputBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PapersTable } from './components/PapersTable';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [paperSize, setPaperSize] = useState({ width: 650, height: 200 });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className='App'>
        <div className='Title'>
          PaperFinder
        </div>
        <PaperLayout width={paperSize.width} height={paperSize.height} />
        <BookSizeInputBar paperSizeSetter={setPaperSize} />
        <PapersTable></PapersTable>
      </div>
      
    </ThemeProvider>
  );
}

export default App;
