import React from 'react';
import { useState } from 'react';
import { Typography, AppBar, ThemeProvider, createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './App.css';

import VideoPlayer from '../comoponents/VideoPlayer';
import CreateOffer from '../comoponents/CreateOffer';
import CreateAnswer from '../comoponents/CreateAnswer';
import AcceptAnswer from '../comoponents/AcceptAnswer';
import IceCandidateComponent from '../comoponents/IceCandidate';
import AcceptIceCandidate from '../comoponents/AcceptIce';
import ConnectionStatus from '../comoponents/ConnectionComponents';

// Create a theme instance
const theme = createTheme();

const useStyles = makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.wrapper}>
        <AppBar position="static" color="primary" sx={{ margin: "0", padding: "0" }} className={classes.appBar}>
          <Typography variant='h2' align='center'>
            Video Chat
          </Typography>
        </AppBar>
        
        <VideoPlayer />
        <AcceptIceCandidate/>
        <CreateOffer/>
        <CreateAnswer/>
        <AcceptAnswer/>
        <ConnectionStatus/>
      </div>
    </ThemeProvider>
  );
}

export default App;