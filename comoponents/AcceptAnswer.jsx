import React, { useContext, useState } from 'react';
import { SocketContext } from '../src/SocketContext';

const AcceptAnswer = () => {
  const [answer, setAnswer] = useState(''); // State to hold the SDP answer

  const { webrtc } = useContext(SocketContext);

  const setRemoteAnswer = async () => {
    try {
      // Create a new RTCSessionDescription object for the answer
      const answerDesc = new RTCSessionDescription({ type: 'answer', sdp: answer });

      // Set the remote description
      await webrtc.setRemoteDescription(answerDesc);

      console.log('Remote description set successfully');
    } catch (error) {
      console.error('Error setting remote description:', error);
    }
  };

  return (
    <div style={{ border: '1px solid black', padding: '20px', width: '400px' }}>
      <h2>Set WebRTC Answer</h2>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter SDP answer here"
        rows="10"
        cols="50"
      />
      <br />
      <button onClick={setRemoteAnswer}>Set Remote Answer</button>
    </div>
  );
};

export default AcceptAnswer;
