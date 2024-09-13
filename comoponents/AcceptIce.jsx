import React, { useContext, useState } from 'react';
import { SocketContext } from '../src/SocketContext';

const AcceptIceCandidate = () => {
    const [remoteCandidates, setRemoteCandidates] = useState(''); // State to hold the pasted ICE candidates

    const { webrtc } = useContext(SocketContext);

    const addIceCandidates = async () => {
        try {
            // Split by newlines and parse each candidate
            const candidatesArray = remoteCandidates
                .trim()
                .split('\n') // Split by newlines
                .map(candidateString => JSON.parse(candidateString)); // Parse each line to JSON

            // Add each candidate one by one
            for (const candidate of candidatesArray) {
                const iceCandidate = new RTCIceCandidate(candidate);
                await webrtc.addIceCandidate(iceCandidate);
                console.log("Remote ICE candidate added:", iceCandidate);
            }

        } catch (error) {
            console.error("Error adding remote ICE candidates:", error);
        }
    };

    return (
        <div style={{ border: '1px solid black', padding: '20px', width: '400px' }}>
            <h2>Register Remote ICE Candidates</h2>
            <textarea
                value={remoteCandidates}
                onChange={(e) => setRemoteCandidates(e.target.value)}
                placeholder="Paste remote ICE candidates here (one per line)"
                rows="10"
                cols="50"
            />
            <br />
            <button onClick={addIceCandidates}>Register ICE Candidates</button>
        </div>
    );
};

export default AcceptIceCandidate;
