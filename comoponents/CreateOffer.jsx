import React, { useContext, useState } from 'react';
import { SocketContext } from '../src/SocketContext';

const CreateOffer = () => {
    const [offer, setOffer] = useState(''); // State to hold the SDP offer
    const [candidate ,setCandidate ] = useState('');

    const { webrtc } = useContext(SocketContext);
    
    const handleIceCandidate = (event) => {
        
        if(candidate) return ;
        if (event.candidate) {
            // Add candidate to state
            setCandidate(prev => prev + JSON.stringify(event.candidate) + '\n');
        }
    };

    // Attach ICE candidate handler
    webrtc.onicecandidate = handleIceCandidate;

    const createOffer = async () => {
        try {
            // Create an offer
            const offer = await webrtc.createOffer();

            // Set local description
            await webrtc.setLocalDescription(offer);

            // Update the state with the generated offer
            setOffer(offer.sdp);

            console.log("Offer created and local description set");
        } catch (error) {
            console.error("Error creating offer:", error);
        }
    };
    

    return (
        <div style={{ border: '1px solid black', padding: '20px', width: '400px' }}>
            <h2>Ice Candidate</h2>
            <textarea
                value={candidate}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="Ice Candidate"
                rows="10"
                cols="50"
            />
            <br />
            <h2>Create WebRTC Offer</h2>
            <textarea
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="Generated SDP offer will appear here"
                rows="10"
                cols="50"
            />
            <br />
            <button onClick={createOffer}>Create Offer</button>
        </div>
    );
};

export default CreateOffer;
