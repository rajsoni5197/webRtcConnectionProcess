import React, { useContext, useEffect, useRef, useState } from 'react';
import { Grid, Typography, Paper, createTheme } from '@mui/material';
import { SocketContext } from '../src/SocketContext';
import { makeStyles } from '@mui/styles';

const theme = createTheme();
const useStyles = makeStyles(() => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

function VideoPlayer() {
  const classes = useStyles();
   const { webrtc } = useContext(SocketContext);

  const myVideo = useRef();
  const remoteVideo = useRef();
  const [remoteStream, setRemoteStream] = useState(null);
 
  useEffect(() => {
    // Access local media
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then((currentStream) => {
      // Assign the stream to the local video element
      if (myVideo.current) {
        myVideo.current.srcObject = currentStream;
      }

      // Add tracks to the WebRTC connection
      currentStream.getTracks().forEach((track) => {
        webrtc.addTrack(track, currentStream);
      });
    
      webrtc.onicecandidate = (event)=>{
        console.log(event);
      }
      
    }).catch((error) => {
      console.error("Error accessing media devices.", error);
    });

    

  }, [webrtc]);
  useEffect(() => {
    const handleTrack = (event) => {
      console.log('Received remote track');
      setRemoteStream(event.streams[0]);
    };
  
    webrtc.addEventListener('track', handleTrack);
  
    return () => {
      webrtc.removeEventListener('track', handleTrack);
    };
  }, [webrtc]);

  useEffect(() => {
    // Assign the remote stream to the remote video element
    if (remoteVideo.current && remoteStream) {
      remoteVideo.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <Grid container className={classes.gridContainer}>
      <Paper className={classes.paper}>
        <Grid item xs={12} md={6}>
          <Typography variant='h5' gutterBottom>
            Local Video
          </Typography>
          <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid item xs={12} md={6}>
          <Typography variant='h5' gutterBottom>
            Remote Video
          </Typography>
          <video playsInline autoPlay ref={remoteVideo} className={classes.video} />
        </Grid>
      </Paper>
    </Grid>
  );
}

export default VideoPlayer;
