import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
function MuiDialog(props) {
  const handleClose = () => props.setOpen(false);
  return (
      <Dialog fullWidth open={props.open} onClose={handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
          {props.children}
      </Dialog>
  );
}

export default MuiDialog;
