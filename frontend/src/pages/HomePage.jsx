import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  List,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import Header from '../components/Header.jsx';
import BookItem from '../components/BookItem.jsx';
import AddDialog from '../components/AddDialog.jsx';
import EditDialog from '../components/EditDialog.jsx';

const HomePage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [isRead, setIsRead] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!authLoading && user) {
      fetchBooks();
    } else if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await API.get('/books');
      setBooks(response.data);
    } catch (err) {
      setError('Failed to load books, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddDialog = () => {
    setTitle('');
    setAuthor('');
    setDescription('');
    setIsRead(false);
    setFormError('');
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenEditDialog = (book) => {
    setCurrentBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setDescription(book.description || '');
    setIsRead(book.isRead);
    setFormError('');
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentBook(null);
  };

  const validateBookForm = () => {
    if (!title.trim() || !author.trim()) {
      setFormError('Book title and author are required.');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleAddBook = async () => {
    if (!validateBookForm()) return;

    try {
      await API.post('/books', { title, author, description });
      await fetchBooks();
      handleCloseAddDialog();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error adding book.');
    }
  };

  const handleUpdateBook = async () => {
    if (!validateBookForm() || !currentBook) return;

    try {
      await API.patch(`/books/${currentBook.id}`, {
        title,
        author,
        description,
        isRead,
      });
      await fetchBooks();
      handleCloseEditDialog();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error updating book.');
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await API.delete(`/books/${bookId}`);
      await fetchBooks();
    } catch (err) {
      setError('Error deleting book.');
    }
  };

  const handleToggleReadStatus = async (book) => {
    try {
      await API.patch(`/books/${book.id}`, { isRead: !book.isRead });
      await fetchBooks();
    } catch (err) {
      setError('Error changing book status.');
    }
  };

  if (authLoading || loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Header onAddBook={handleOpenAddDialog} />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {books.length === 0 ? (
        <Typography variant="h6" align="center" mt={5}>
          There are no books in your library yet. Add the first one!
        </Typography>
      ) : (
        <List>
          {books.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              onToggleRead={handleToggleReadStatus}
              onEdit={handleOpenEditDialog}
              onDelete={handleDeleteBook}
            />
          ))}
        </List>
      )}

      <AddDialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        formError={formError}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        description={description}
        setDescription={setDescription}
        handleAddBook={handleAddBook}
      />

      <EditDialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        formError={formError}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        description={description}
        setDescription={setDescription}
        isRead={isRead}
        setIsRead={setIsRead}
        handleUpdateBook={handleUpdateBook}
      />
    </Container>
  );
};

export default HomePage;
