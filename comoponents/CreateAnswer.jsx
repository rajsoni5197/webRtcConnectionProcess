import React, { useContext, useState } from 'react';
import { SocketContext } from '../src/SocketContext';

const CreateAnswer = () => {
  const [offer, setOffer] = useState(''); // State to hold the SDP offer
  const [answer, setAnswer] = useState(''); // State to hold the SDP answer
  const [candidate, setCandidate] = useState(''); // State to hold ICE candidates

  const { webrtc } = useContext(SocketContext);

  const handleIceCandidate = (event) => {
    if (event.candidate) {
      // Add candidate to the state
      setCandidate((prev) => prev + JSON.stringify(event.candidate) + '\n');
    }
  };

  // Attach ICE candidate handler
  webrtc.onicecandidate = handleIceCandidate;

  const generateAnswer = async () => {
    if (!offer) {
      alert('Please enter an SDP offer first.');
      return;
    }

    try {
      // Set the remote description with the SDP offer
      await webrtc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: offer }));

      // Create an SDP answer
      const answer = await webrtc.createAnswer();

      // Set the answer as the local description
      await webrtc.setLocalDescription(answer);

      // Update the state with the generated answer
      setAnswer(answer.sdp);

      console.log('Answer created and local description set');
    } catch (error) {
      console.error('Error generating answer:', error);
    }
  };

  return (
    <div style={{ border: '1px solid black', padding: '20px', width: '400px' }}>
      <h2>Create WebRTC Answer</h2>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          placeholder="Enter SDP offer here"
          rows="10"
          cols="50"
        />
      </div>
      <button onClick={generateAnswer} disabled={!offer}>
        Generate Answer
      </button>

      <div style={{ marginBottom: '10px' }}>
        <textarea
          value={answer}
          readOnly
          placeholder="Generated SDP answer will appear here"
          rows="10"
          cols="50"
        />
      </div>

      <h2>ICE Candidates</h2>
      <textarea
        value={candidate}
        readOnly
        placeholder="Generated ICE candidates will appear here"
        rows="10"
        cols="50"
      />
    </div>
  );
};

export default CreateAnswer;
