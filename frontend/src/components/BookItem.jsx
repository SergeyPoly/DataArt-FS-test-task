import React from 'react';
import {
  Typography,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  FormControlLabel,
  Box,
  Paper,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BookItem = ({ book, onEdit, onDelete, onToggleRead }) => (
  <Paper
    elevation={2}
    sx={{
      mb: 2,
      borderRadius: 2,
      overflow: 'hidden',
    }}
  >
    <ListItem
      divider
      sx={{
        alignItems: 'flex-start',
        px: 2,
        py: 1.5,
      }}
    >
      <ListItemText
        disableTypography
        primary={
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              textDecoration: book.isRead ? 'line-through' : 'none',
              color: book.isRead ? 'text.secondary' : 'text.primary',
            }}
          >
            {book.title}
          </Typography>
        }
        secondary={
          <Box sx={{ mt: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Author: {book.author}
            </Typography>
            {book.description && (
              <Typography variant="body2" color="text.secondary">
                {book.description}
              </Typography>
            )}
          </Box>
        }
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={book.isRead}
              onChange={() => onToggleRead(book)}
              sx={{
                color: 'success.main',
                '&.Mui-checked': {
                  color: 'success.main',
                },
              }}
            />
          }
          label="Read"
        />

        <Tooltip title="Edit">
          <IconButton
            onClick={() => onEdit(book)}
            sx={{
              color: 'primary.main',
              '&:hover': { bgcolor: 'primary.light', color: 'white' },
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton
            onClick={() => onDelete(book.id)}
            sx={{
              color: 'error.main',
              '&:hover': { bgcolor: 'error.light', color: 'white' },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </ListItem>
  </Paper>
);

export default BookItem;
