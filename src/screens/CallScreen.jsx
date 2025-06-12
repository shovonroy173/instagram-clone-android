import React, {useEffect, useState, useRef} from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import {
  mediaDevices,
  RTCPeerConnection,
  RTCView,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import IconContainer from '../utils/IconContainer';
import CallEnd from '../../assets/asset/CallEnd';
import MicOn from '../../assets/asset/MicOn';
import MicOff from '../../assets/asset/MicOff';
import JoinScreen from './JoinScreen';
import IncomingCallScreen from './IncomingCallScreen';
import OutgoingCallScreen from './OutgoingCalllScreen';
import CameraSwitch from '../../assets/asset/CameraSwitch';
import InCallManager from 'react-native-incall-manager';
import VideoOn from '../../assets/asset/VideoOn';
import VideoOff from '../../assets/asset/VideoOff';

export default function CallScreen({}) {
  // Stream of local user
  const [localStream, setlocalStream] = useState(null);

  // When a call is connected, the video stream from the receiver is appended to this state in the stream
  const [remoteStream, setRemoteStream] = useState(null);

  const [type, setType] = useState('JOIN');

  //We'll store a 5 digit Random CallerId which will represent this user, and can be referred by another connected user.

  const [callerId] = useState(
    Math.floor(100000 + Math.random() * 900000).toString(),
  );
  const [otherUserId, setOtherUserId] = useState('');

  console.log('setOtherUserId', otherUserId, type);

  // This establishes your WebSocket connection
  const socket = SocketIOClient('https://rahma-test-api.onrender.com', {
    transports: ['websocket'],
    query: {
      callerId,
      // We have generated this `callerId` in `JoinScreen` implementation
    },
  });

  const [localMicOn, setlocalMicOn] = useState(true);

  const [localWebcamOn, setlocalWebcamOn] = useState(true);

  //This creates an WebRTC Peer Connection, which will be used to set local/remote descriptions and offers.
  const peerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
        {
          urls: 'stun:stun1.l.google.com:19302',
        },
        {
          urls: 'stun:stun2.l.google.com:19302',
        },
      ],
    }),
  );

  //  Establishing a webRTC call

  let remoteRTCMessage = useRef(null);

  useEffect(() => {
    //This event occurs whenever any peer wishes to establish a call with you.
    socket.on('newCall', data => {
      remoteRTCMessage.current = data.rtcMessage;
      if (data?.callerId) {
        setOtherUserId(data.callerId);
      }
      setType('INCOMING_CALL');
    });

    // This event occurs whenever remote peer accept the call.
    socket.on('callAnswered', data => {
      remoteRTCMessage.current = data.rtcMessage;
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(remoteRTCMessage.current),
      );
      setType('WEBRTC_ROOM');
    });

    // This event is for exchanging Candidates.
    socket.on('ICEcandidate', data => {
      let message = data.rtcMessage;
       console.log('Received ICEcandidate', data);
      if (peerConnection.current) {
        peerConnection?.current
          .addIceCandidate(
            new RTCIceCandidate({
              candidate: message.candidate,
              sdpMid: message.id,
              sdpMLineIndex: message.label,
            }),
          )
          .then(data => {
            console.log('SUCCESS');
          })
          .catch(err => {
            console.log('Error', err);
          });
      }
    });

    let isFront = false;

    // The MediaDevices interface allows you to access connected media inputs such as cameras and microphones. We ask the user for permission to access those media inputs by invoking the mediaDevices.getUserMedia() method.

    mediaDevices.enumerateDevices().then(sourceInfos => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == 'videoinput' &&
          sourceInfo.facing == (isFront ? 'user' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 500, // Provide your own width, height and frame rate here
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: isFront ? 'user' : 'environment',
            optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
          },
        })
        .then(stream => {
          // Got stream!

          setlocalStream(stream);

          // setup stream listening
          peerConnection.current.addStream(stream);
        })
        .catch(error => {
          // Log error
        });
    });

    peerConnection.current.ontrack = event => {
        console.log('Remote stream added!', event.stream);
      setRemoteStream(event.stream);
    };

    // Setup ice handling
    peerConnection.current.onicecandidate = event => {
      
      if (event.candidate) {
        sendICEcandidate({
          calleeId: otherUserId,
          rtcMessage: {
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          },
        });
      } else {
        console.log('End of candidates.');
      }
    };

    return () => {
      socket.off('newCall');
      socket.off('callAnswered');
      socket.off('ICEcandidate');
    };
  }, []);

  // Here we handle Audio routing in webRTC using the libraary IncallManager
  useEffect(() => {
    InCallManager.start();
    InCallManager.setKeepScreenOn(true);
    InCallManager.setForceSpeakerphoneOn(true);

    return () => {
      InCallManager.stop();
    };
  }, []);

  function sendICEcandidate(data) {
    socket.emit('ICEcandidate', data);
  }

  async function processCall() {
    const sessionDescription = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(sessionDescription);
    console.log('data    ');

    sendCall({
      calleeId: otherUserId,
      rtcMessage: sessionDescription,
    });
  }

  async function processAccept() {
    peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(remoteRTCMessage.current),
    );
    const sessionDescription = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(sessionDescription);
    answerCall({
      callerId: otherUserId,
      rtcMessage: sessionDescription,
    });
  }

  function answerCall(data) {
    socket.emit('answerCall', data);
  }

  function sendCall(data) {
    console.log( 'line at 234', data);
    
    socket.emit('call', data);
  }

  // Function to switch camera side (front/back)
  function switchCamera() {
    localStream.getVideoTracks().forEach(track => {
      track._switchCamera();
    });
  }

  // Function to enable/disable camera
  function toggleCamera() {
    localWebcamOn ? setlocalWebcamOn(false) : setlocalWebcamOn(true);
    localStream.getVideoTracks().forEach(track => {
      localWebcamOn ? (track.enabled = false) : (track.enabled = true);
    });
  }

  // Function to enable/disable Mic
  function toggleMic() {
    localMicOn ? setlocalMicOn(false) : setlocalMicOn(true);
    localStream.getAudioTracks().forEach(track => {
      localMicOn ? (track.enabled = false) : (track.enabled = true);
    });
  }

  // Function to leave the call (Destroys webRTC connection)
  function leave() {
    peerConnection.current.close();
    setlocalStream(null);
    setType('JOIN');
  }

  // UI to render when both parties are in call (Call accepted by peer)
  const WebrtcRoomScreen = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#050A0E',
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}>
        {localStream ? (
          <RTCView
            objectFit={'cover'}
            style={{flex: 1, backgroundColor: '#050A0E'}}
            streamURL={localStream.toURL()}
          />
        ) : null}
        {remoteStream ? (
          <RTCView
            objectFit={'cover'}
            style={{
              flex: 1,
              backgroundColor: '#050A0E',
              marginTop: 8,
            }}
            streamURL={remoteStream.toURL()}
          />
        ) : null}
        <View
          style={{
            marginVertical: 12,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <IconContainer
            backgroundColor={'red'}
            onPress={() => {
              leave();
            }}
            Icon={() => {
              return <CallEnd height={26} width={26} fill="#FFF" />;
            }}
          />
          <IconContainer
            style={{
              borderWidth: 1.5,
              borderColor: '#2B3034',
            }}
            backgroundColor={!localMicOn ? '#fff' : 'transparent'}
            onPress={() => {
              toggleMic();
            }}
            Icon={() => {
              return localMicOn ? (
                <MicOn height={24} width={24} fill="#FFF" />
              ) : (
                <MicOff height={28} width={28} fill="#1D2939" />
              );
            }}
          />
          <IconContainer
            style={{
              borderWidth: 1.5,
              borderColor: '#2B3034',
            }}
            backgroundColor={!localWebcamOn ? '#fff' : 'transparent'}
            onPress={() => {
              toggleCamera();
            }}
            Icon={() => {
              return localWebcamOn ? (
                <VideoOn height={24} width={24} fill="#FFF" />
              ) : (
                <VideoOff height={36} width={36} fill="#1D2939" />
              );
            }}
          />
          <IconContainer
            style={{
              borderWidth: 1.5,
              borderColor: '#2B3034',
            }}
            backgroundColor={'transparent'}
            onPress={() => {
              switchCamera();
            }}
            Icon={() => {
              return <CameraSwitch height={24} width={24} fill="#FFF" />;
            }}
          />
        </View>
      </View>
    );
  };

  switch (type) {
    case 'JOIN':
      return (
        <JoinScreen
          callerId={callerId}
          setType={setType}
          otherUserId={otherUserId}
          setOtherUserId={setOtherUserId}
          processCall={processCall}
        />
      );
    case 'INCOMING_CALL':
      return (
        <IncomingCallScreen
          otherUserId={otherUserId}
          setType={setType}
          processAccept={processAccept}
        />
      );
    case 'OUTGOING_CALL':
      return <OutgoingCallScreen setType={setType} otherUserId={otherUserId} />;
    case 'WEBRTC_ROOM':
      return WebrtcRoomScreen();
    default:
      return null;
  }
}
