
import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import logo from './Logo.jpg';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: '#1b5f9e',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'lightgray',
    overflow: 'hidden',
    position: 'relative',
  },
  heading: {
    color: '#51a025',
    position: 'absolute',
    bottom: '30px',
  }
}),
);

function Header() {
  const classes = useStyles();

  return (
    <header  className={classes.root}>
          <img src={logo} alt="Logo" />
          <Box textAlign="center" className={classes.heading}>
            <h1>Andrena-Privacy</h1>
            <Typography>Wie gut kannst du deine Kollegen einschätzen?</Typography>
          </Box>
    </header>
  );
}

export default Header;
