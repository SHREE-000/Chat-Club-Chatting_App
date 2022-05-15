import Peer from "simple-peer";
import * as socketConnection from "./socketConnection";
import { setLocalStream, setRemoteStreams } from '../features/room/roomSlice';

const getConfiguration = () => {
  const turnIceServers = null;

  if (turnIceServers) {
    // TODO use TURN server credentials
  } else {
    console.warn("Using only STUN server");
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
  }
};

const onlyAudioConstraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  video: true,
  audio: true,
};

export const getLocalStreamPreview = (onlyAudio = false, callbackFunc, dispatch) => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      dispatch(setLocalStream(stream));
      localStorage.setItem('stream', JSON.stringify(stream))
      callbackFunc();
    })
    .catch((err) => {
      console.log(err);
      console.log("Cannot get an access to local stream");
    });
};

let peers = {};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const localStream = JSON.parse(localStorage.getItem('stream'))

  if (isInitiator) {
    console.log("preparing new peer connection as initiator");
  } else {
    console.log("preparing new peer connection as not initiator");
  }

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    // pass signaling data to other user
    socketConnection.signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (remoteStream) => {

    // add new remote stream to our server store
    console.log("remote stream came from other user");
    console.log("direct connection has been established");
    remoteStream.connUserSocketId = connUserSocketId;
    addNewRemoteStream(remoteStream);
  });
};

export const handleSignalingData = (data) => {
  const { connUserSocketId, signal } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  }
};

const addNewRemoteStream = (remoteStream, dispatch) => {
const remoteStreams = JSON.parse(localStorage.getItem('remoteStreams'))
  const newRemoteStreams = [...remoteStreams, remoteStream];
  dispatch(setRemoteStreams(newRemoteStreams));
  localStorage.setItem('remoteStreams', JSON.stringify(newRemoteStreams))
};

export const closeAllConnections = () => {
  Object.entries(peers).forEach((mappedObject) => {
    const connUserSocketId = mappedObject[0];
    if (peers[connUserSocketId]) {
      peers[connUserSocketId].destroy();
      delete peers[connUserSocketId];
    }
  });
};

export const handleParticipantLeftRoom = (data, dispatch) => {
  const { connUserSocketId } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy();
    delete peers[connUserSocketId];
  }

  const remoteStreams = JSON.parse(localStorage.getItem('remoteStreams'))
  
  const newRemoteStreams = remoteStreams.filter(
    (remoteStream) => remoteStream.connUserSocketId !== connUserSocketId
  );

  dispatch(setRemoteStreams(newRemoteStreams));
  localStorage.setItem('remoteStreams', JSON.stringify(newRemoteStreams))
};

// export const switchOutgoingTracks = (stream) => {
//   for (let socket_id in peers) {
//     for (let index in peers[socket_id].streams[0].getTracks()) {
//       for (let index2 in stream.getTracks()) {
//         if (
//           peers[socket_id].streams[0].getTracks()[index].kind ===
//           stream.getTracks()[index2].kind
//         ) {
//           peers[socket_id].replaceTrack(
//             peers[socket_id].streams[0].getTracks()[index],
//             stream.getTracks()[index2],
//             peers[socket_id].streams[0]
//           );
//           break;
//         }
//       }
//     }
//   }
// };