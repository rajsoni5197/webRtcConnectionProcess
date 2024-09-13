import React , {createContext ,useState , useRef , useEffect } from 'react'
import {io} from 'socket.io-client';


export const SocketContext = createContext();





export const SocketContextProvider = ({children})=>{

    

    const [webrtc , setWebrtc ] = useState(new RTCPeerConnection({
        iceServers: [
          {
            urls: 'stun:stun.services.mozilla.com', // Use a STUN server
          },
        ],
      }));
      
     
    

    
    
    return(
        <SocketContext.Provider value={{
            webrtc
        }}>
            {children}

        </SocketContext.Provider>
    )
}

 