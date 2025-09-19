import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  FormControlLabel,
  Checkbox,
  Box,
} from '@mui/material';

const EditDialog = ({
  open,
  onClose,
  formError,
  title,
  setTitle,
  author,
  setAuthor,
  description,
  setDescription,
  isRead,
  setIsRead,
  handleUpdateBook,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          fontSize: '1.25rem',
          pb: 1,
        }}
      >
        Edit Book
      </DialogTitle>

      <DialogContent dividers>
        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            autoFocus
            label="Book Title"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            label="Author"
            fullWidth
            variant="outlined"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isRead}
                onChange={(e) => setIsRead(e.target.checked)}
              />
            }
            label="Read"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleUpdateBook} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
