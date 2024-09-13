import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../src/SocketContext';

const IceCandidateComponent = () => {
  const [candidates, setCandidates] = useState(''); // State to hold ICE candidates

  const { webrtc } = useContext(SocketContext);

  useEffect(() => {
    const handleIceCandidate = (event) => {
        alert("ic");
        console.log(event);
        if (event.candidate) {
            // Add candidate to state
            setCandidates(prev => prev + JSON.stringify(event.candidate) + '\n');
        }
    };

    // Attach ICE candidate handler
    webrtc.onicecandidate = handleIceCandidate;
    
  }, [webrtc]);

  return (
    <div style={{ border: '1px solid black', padding: '20px', width: '400px' }}>
      <h2>ICE Candidates</h2>
      <textarea
        value={candidates}
        readOnly
        placeholder="ICE candidates will appear here"
        rows="10"
        cols="50"
      />
    </div>
  );
};

export default IceCandidateComponent;
