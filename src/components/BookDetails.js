// src/components/BookDetails.js
import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import {
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true); 
  const [errorDialogOpen, setErrorDialogOpen] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const fetchBookDetails = async () => {
    try {
      const response = await axiosInstance.get(`/bookdetails/${id}`);
      setBook(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("An error occurred while fetching the book details. Please try again.");
        setErrorDialogOpen(true); 
      }
    } finally {
      setLoading(false); 
    }
  };

  const handleIssueBook = async () => {
    try {
      await axiosInstance.post(`/issue/${id}`);
      fetchBookDetails(); 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("An error occurred while issuing the book. Please try again.");
        setErrorDialogOpen(true); 
      }
    }
  };

  const handleReturnBook = async () => {
    try {
      await axiosInstance.post(`/return/${id}`);
      fetchBookDetails();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("An error occurred while returning the book. Please try again.");
        setErrorDialogOpen(true); 
      }
    }
  };

  const handleCloseDialog = () => {
    setErrorDialogOpen(false); 
  };

  return (
    <Container>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate("/")}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Book Details</Typography>
        </Toolbar>
      </AppBar>

      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px",  background:"#f1faee" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            {loading ? (
              <CircularProgress /> 
            ) : (
              <img
                src="https://covers.openlibrary.org/b/olid/OL7440033M.jpg" 
                alt={book.title}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4">{book.title}</Typography>
            <Typography variant="h6">Author: {book.author}</Typography>
            <Typography variant="h6">
              Available: {!book.issued ? "Yes" : "No"}
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={handleIssueBook}
              disabled={book.issued}
              style={{ marginRight: "10px", marginTop: "20px" }}
            >
              Issue
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleReturnBook}
              disabled={!book.issued}
              style={{ marginTop: "20px" }}
            >
              Return
            </Button>
          </Grid>
        </Grid>
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          style={{ marginTop: "20px" }}
        >
          Back to List
        </Button>
      </Paper>

      
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

export default BookDetails;
