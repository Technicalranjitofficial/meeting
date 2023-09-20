// peerConnection.js
let peerConnection:RTCPeerConnection;

export const createPeerConnection = () => {
  const configuration = {
    iceServers: [
      {
        urls: ["stun:stun.1.google.com:19302"],
      },
    ],
  };
  peerConnection = new RTCPeerConnection(configuration);
};

export const getPeerConnection = () => peerConnection;