import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { darken } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme, customcolor }) => ({
  backgroundColor: customcolor || theme.palette.buttonPrimary.main,
  color: theme.palette.getContrastText(customcolor || theme.palette.buttonPrimary.main),
  '&:hover': {
    backgroundColor: customcolor ? darken(customcolor, 0.1) : darken(theme.palette.buttonPrimary.main, 0.1),
  },
}));

const CustomButton = ({ color, onClick, children, ...props }) => {
  return (
    <StyledButton customcolor={color} onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;
