import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DeleteStudentDialogProps {
  studentName?: string;
  itemName?: string;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteStudentDialog: React.FC<DeleteStudentDialogProps> = ({
  studentName,
  itemName,
  onDelete,
  onCancel,
}) => {
  return (
    <Dialog open onClose={onCancel} aria-labelledby="delete-student-title">
      <DialogTitle id="delete-student-title">Delete item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <strong>{itemName ?? studentName}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteStudentDialog;