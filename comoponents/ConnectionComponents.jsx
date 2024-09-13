import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../src/SocketContext';

const ConnectionStatus = () => {
  const { webrtc } = useContext(SocketContext);
  const [connectionState, setConnectionState] = useState('');
  const [iceConnectionState, setIceConnectionState] = useState('');
  const [signalingState, setSignalingState] = useState('');

  useEffect(() => {
    const updateConnectionState = () => setConnectionState(webrtc.connectionState);
    const updateIceConnectionState = () => setIceConnectionState(webrtc.iceConnectionState);
    const updateSignalingState = () => setSignalingState(webrtc.signalingState);

    webrtc.addEventListener('connectionstatechange', updateConnectionState);
    webrtc.addEventListener('iceconnectionstatechange', updateIceConnectionState);
    webrtc.addEventListener('signalingstatechange', updateSignalingState);

    // Initial state
    updateConnectionState();
    updateIceConnectionState();
    updateSignalingState();

    return () => {
      webrtc.removeEventListener('connectionstatechange', updateConnectionState);
      webrtc.removeEventListener('iceconnectionstatechange', updateIceConnectionState);
      webrtc.removeEventListener('signalingstatechange', updateSignalingState);
    };
  }, [webrtc]);

  return (
    <div style={{ border: '1px solid black', padding: '20px', margin: '20px 0' }}>
      <h2>WebRTC Connection Status</h2>
      <p><strong>Connection State:</strong> {connectionState}</p>
      <p><strong>ICE Connection State:</strong> {iceConnectionState}</p>
      <p><strong>Signaling State:</strong> {signalingState}</p>
    </div>
  );
};

export default ConnectionStatus;