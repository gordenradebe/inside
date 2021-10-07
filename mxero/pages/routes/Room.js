import React, { useEffect, createContext, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";


const Container = styled.div`
    padding: 20px;
    display: flex;
    grid-gap: 25px;
    height: 100vh;
    gap: 25px;
    width: 90%;

    @media (max-width: 768px) {
        flex-direction: column;
        display: grid;
        grid-gap: 25px;
        gap: 5px;
        width:500px;
        height: 500px;
      }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StyledVideo = styled.video`
    height: 55%;
    width: 55%;

    
    @media (max-width: 768px) {
        flex-direction: column;
        display: grid;
        grid-gap: 25px;
        gap: 5px;
        width:300px;
        height: 300px;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;           
        })
    }, []);

    return (
       
        <StyledVideo control={true} playsInline autoPlay ref={ref} />
       
    );
}

//
//if (typeof window !== "undefined") {
    // browser code
 
 // }

  const videoConstraints = {
     height: '300px',
     width: '300px'

};



const Room = (props) => {
// new varibales for context
   
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const senders = useRef([]);
    const connectionRef = useRef();
   
    const userStream = useRef();
    const roomID = props.match.params.roomID;

  

    useEffect(() => {

       // socketRef.current = io.connect("http://localhost:8000");
        socketRef.current = io.connect("https://fatso-gor.herokuapp.com/");

        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
               setPeers(peers);
               //New Code call user
           //    socket.on('me', (id)=> setPeers(id))
              // socket.on('callUser', ({ from, name: callerName, signal }) => {
              //  setCall({ isReceivingCall: true, from, name: callerName, signal });
            //  });

            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);

    // below must introduce answerCall ES6 function
    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }
// callUser
    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;

    };


    // leave the callerID

   // const leaveCall = () => {
     //   setCallEnded(true);
    
       // connectionRef.current.destroy();
    
       // window.location.reload();
     // };



    function shareScreen() {
        navigator.mediaDevices.getDisplayMedia({ cursor: true }).then(stream => {
            const screenTrack = stream.getTracks()[0];
            senders.current.find(sender => sender.track.kind === 'video').replaceTrack(screenTrack);
            screenTrack.onended = function() {
                senders.current.find(sender => sender.track.kind === "video").replaceTrack(userStream.current.getTracks()[1]);
            }

        })}

    return (
        <Container>

       

            <StyledVideo controls ={true} muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video controls={true} key={index} peer={peer} />
                );
            })}
        

         {/*    <div>
            <button onClick={shareScreen}>Share screen</button> 

         </div> */}
           
        </Container>
    );
};

export default Room;




