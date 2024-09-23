// src/components/BookList.js
import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CustomButton from "./CustomButton";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [errorDialogOpen, setErrorDialogOpen] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/books");
      setBooks(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("An error occurred while fetching the books. Please try again.");
        setErrorDialogOpen(true); 
      }
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(`/search?name=${search}`);
      setBooks(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("An error occurred during the search. Please try again.");
        setErrorDialogOpen(true); 
      }
    }
  };

  const handleDetailsClick = (id) => {
    navigate(`/book/${id}`);
  };

  const handleCloseDialog = () => {
    setErrorDialogOpen(false); 
  };

  return (
    <Container >
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <LibraryBooksIcon />
          </IconButton>
          <Typography variant="h6">Library Management System</Typography>
        </Toolbar>
      </AppBar>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px", background:"#f1faee" }} >
        <TextField
          label="Search for a book"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "20px", width: "300px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.slice().sort((a, b) => a.id - b.id).map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{!book.issued ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <CustomButton variant="contained" color="#457b9d" onClick={() => handleDetailsClick(book.id)}>
                    Details
                  </CustomButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Error Dialog */}
      <Dialog open={errorDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookList;
