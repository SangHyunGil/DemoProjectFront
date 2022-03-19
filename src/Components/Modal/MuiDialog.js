import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

function MuiDialog(props) {
  return (
      <Dialog fullWidth open={props.open} onClose={props.onClose} {...props}>
        {!props?.isTitleExist && <DialogTitle>{props.title}</DialogTitle>}
          {props.children}
      </Dialog>
  );
}

export default MuiDialog;
