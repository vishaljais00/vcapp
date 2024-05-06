// Import necessary modules and styles
import React, { useEffect, useState } from 'react';


const Call = () => {
    const [zps, setZps] = useState(null);
    const [ZegoUIKitPrebuiltLets, setZegoUIKitPrebuiltLets] = useState(null);  
    const [userID, setUserId] = useState('')
    const [receverId, setReaceverId] = useState('')


    async function generateToken(tokenServerUrl, userID) {
        // Obtain the token interface provided by the App Server
        return fetch(
          `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
          {
            method: 'GET',
          }
        ).then((res) => res.json());
      }


    function randomID(len) {
        let result = '';
        if (result) return result;
        var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
        maxPos = chars.length,
        i;
        len = len || 5;
        for (i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return result;
    }
  // Function to initialize ZegoUIKit
  async function init() {
    const { ZegoUIKitPrebuilt } = await import('@zegocloud/zego-uikit-prebuilt');
    const { ZIM } = await import('zego-zim-web');
    const ZegoUIKitPrebuiltLet = ZegoUIKitPrebuilt.InvitationTypeVideoCall;
    const userName = 'user_' + userID;
    const { token } = await generateToken(
      'https://nextjs-token-callinvitation.vercel.app/api',
      userID
    );

    const KitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
      252984006, // You need to replace the appid with your own appid
      token,
      null,
      userID,
      userName
    );
    const zp = ZegoUIKitPrebuilt.create(KitToken);
    // add plugin
    zp.addPlugins({ ZIM });

    setZps(zp);
    setZegoUIKitPrebuiltLets(ZegoUIKitPrebuiltLet);
    zp.setCallInvitationConfig({
        // The callback for the call invitation is accepted before joining the room (a room is used for making a call), which can be used to set up the room config. The Call Kit enables you to join the room automatically, and the room config adapts according to the specific call type (ZegoInvitationType).
        onSetRoomConfigBeforeJoining: (callType) => {
          return {
            container: document.querySelector("#rootRoom"),
            turnOnMicrophoneWhenJoining: true,
            turnOnCameraWhenJoining: true,
            showMyCameraToggleButton: true,
            showMyMicrophoneToggleButton: true,
            showAudioVideoSettingsButton: true,
            showScreenSharingButton: false,
            showTextChat: true,
            showUserList: false,
            maxUsers: 2,
            showLayoutButton: true,
            showPreJoinView: false,
          }
        },
      },
      
      )
      
  }


  function handleSend() {
    const callee = receverId;
    if (!callee) {
      alert('userID cannot be empty!!');
      return;
    }
  
    console.log(zps, ZegoUIKitPrebuiltLets)
    // Check if zp is defined before calling sendCallInvitation
    if (zps) {
      const users = callee.split(',').map((id) => ({
        userID: id.trim(),
        userName: 'user_' + id,
      }));
  
      // send call invitation
      zps.sendCallInvitation({
        
        callees: users,
        callType: ZegoUIKitPrebuiltLets,
        timeout: 60,
      })
        .then((res) => {
          console.warn(res);
          if (res.errorInvitees.length) {
            alert('The user does not exist or is offline.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.error('ZegoUIKit is not properly initialized.');
    }
  }
  

  // Initialize ZegoUIKit on component mount
  useEffect(() => {
    
    if(userID == ""){
        setUserId(randomID(5))
        return
    }else{
        init();
      
    }
  }, [userID]);

  console.log('aaaaaa',zps, ZegoUIKitPrebuiltLets)

  return (
    <div id="apps">
      <p>
        my userName: <span className="name">User_{userID}</span>
      </p>
      <p>
        my userID: <span className="id">{userID}</span>
      </p>
      <input type="text" id="userID" value={receverId} onChange={(e)=>{setReaceverId(e.target.value)}} placeholder="callee's userID" />
      <button className="videoCall" onClick={() => handleSend()}>
        video call
      </button>
      <div id="rootRoom" className="myCallContainer h-[100vh]"></div>
    </div>
  );
};

export default Call;
