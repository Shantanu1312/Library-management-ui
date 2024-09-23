import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#023047',
      },
      secondary: {
        main: '#003049',
      },
      buttonPrimary: {
        main: '#94d2bd',
      },
      buttonSecondary: {
        main: '#003049',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
