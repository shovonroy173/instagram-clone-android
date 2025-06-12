import {useEffect, useRef, useState} from 'react';
import SocketIOClient from 'socket.io-client';
import {
  mediaDevices,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';

export const useWebRTC = (callerId, serverUrl = 'http://192.168.1.10:3500') => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const socket = useRef(
    SocketIOClient(serverUrl, {
      transports: ['websocket'],
      query: {callerId},
    }),
  ).current;

  const peerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [
        {urls: 'stun:stun.l.google.com:19302'},
        {urls: 'stun:stun1.l.google.com:19302'},
        {urls: 'stun:stun2.l.google.com:19302'},
      ],
    }),
  );

  let remoteRTCMessage = useRef(null);

  useEffect(() => {
    const pc = peerConnection.current;

    // Handle socket events
    socket.on('newCall', data => {
      remoteRTCMessage.current = data.rtcMessage;
      otherUserId.current = data.callerId;
      setType('INCOMING_CALL');
    });

    socket.on('callAnswered', data => {
      // 7. When Alice gets Bob's session description, she sets that as the remote description with `setRemoteDescription` method.

      remoteRTCMessage.current = data.rtcMessage;
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(remoteRTCMessage.current),
      );
      setType('WEBRTC_ROOM');
    });

    socket.on('ICEcandidate', data => {
      let message = data.rtcMessage;

      // When Bob gets a candidate message from Alice, he calls `addIceCandidate` to add the candidate to the remote peer description.

      if (peerConnection.current) {
        peerConnection?.current
          .addIceCandidate(new RTCIceCandidate(message.candidate))
          .then(data => {
            console.log('SUCCESS');
          })
          .catch(err => {
            console.log('Error', err);
          });
      }
    });

    // Setup local media stream
    const startLocalStream = async () => {
      let isFront = true;

      const devices = await mediaDevices.enumerateDevices();
      let videoSourceId;

      for (const device of devices) {
        if (
          device.kind === 'videoinput' &&
          device.facing === (isFront ? 'user' : 'environment')
        ) {
          videoSourceId = device.deviceId;
        }
      }

      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: {
          mandatory: {
            minWidth: 500,
            minHeight: 300,
            minFrameRate: 30,
          },
          facingMode: isFront ? 'user' : 'environment',
          optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
        },
      });

      setLocalStream(stream);
      pc.addStream(stream);
    };

    startLocalStream().catch(console.error);

    // Handle remote stream
    pc.onaddstream = event => {
      setRemoteStream(event.stream);
    };

    // ICE candidate event
    pc.onicecandidate = event => {
      if (event.candidate) {
      // Alice sends serialized candidate data to Bob using Socket
      sendICEcandidate({
        calleeId: otherUserId.current,
        rtcMessage: {
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate,
        },
      });
    } else {
      console.log("End of candidates.");
    }
    };

    async function processCall() {
  // 1. Alice runs the `createOffer` method for getting SDP.
  const sessionDescription = await peerConnection.current.createOffer();

  // 2. Alice sets the local description using `setLocalDescription`.
  await peerConnection.current.setLocalDescription(sessionDescription);

  // 3. Send this session description to Bob uisng socket
  sendCall({
    calleeId: otherUserId.current,
    rtcMessage: sessionDescription,
  });
}

async function processAccept() {
  // 4. Bob sets the description, Alice sent him as the remote description using `setRemoteDescription()`
  peerConnection.current.setRemoteDescription(
    new RTCSessionDescription(remoteRTCMessage.current)
  );

  // 5. Bob runs the `createAnswer` method
  const sessionDescription = await peerConnection.current.createAnswer();

  // 6. Bob sets that as the local description and sends it to Alice
  await peerConnection.current.setLocalDescription(sessionDescription);
  answerCall({
    callerId: otherUserId.current,
    rtcMessage: sessionDescription,
  });
}

function answerCall(data) {
  socket.emit("answerCall", data);
}

function sendCall(data) {
  socket.emit("call", data);
}

    return () => {
      socket.off('newCall');
      socket.off('callAnswered');
      socket.off('ICEcandidate');
    };
  }, [callerId, socket]);

  return {
    localStream,
    remoteStream,
    peerConnection,
    socket,
  };
};
