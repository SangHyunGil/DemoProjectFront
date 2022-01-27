import * as React from "react";
import { Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled.div`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  p: 2,
  px: 4,
  pb: 3,
};

const ModalStyle = styled.span`
    background: white;
    border-radius: 4px;
    box-shadow: 0 0 10px -1px rgba(0, 0, 0, 0.2);
    position: relative;
`;

const CloseButton = styled(IconButton)`
    position: absolute !important;
    top: 0;
    right: 0;
    z-index: 1;

`;

const ModalWrapper = React.forwardRef((props, ref) => (
    <ModalStyle {...props} ref={ref}>
        {props.children}
    </ModalStyle>
))

export default function ModalUnstyledDemo(props) {
  const handleClose = () => props.setOpen(false);
  return (
    <>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={props.open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <ModalWrapper>
            {props.open ? (
            <CloseButton onClick={handleClose} >
                <CloseIcon />
            </CloseButton>
            ) : null}
            <Box sx={style}>{props.children}</Box>
        </ModalWrapper>
      </StyledModal>
    </>
  );
}
