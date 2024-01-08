// Import necessary modules and styles
import React, { useEffect, useState } from 'react';
const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");
const { ZIM } = await import("zego-zim-web");

const Call = () => {
  let zp;
    const [userID, setUserId] = useState('')
    const [receverId, setReaceverId] = useState('')


    function generateToken(tokenServerUrl, userID) {
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

    const userName = 'user_' + userID;
    document.querySelector('.name').innerHTML = userName;
    document.querySelector('.id').innerHTML = userID;
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
    zp = ZegoUIKitPrebuilt.create(KitToken);
    // add plugin
    zp.addPlugins({ ZIM });
  }

  function handleSend() {
    const callee = receverId;
    if (!callee) {
      alert('userID cannot be empty!!');
      return;
    }
    const users = callee.split(',').map((id) => ({
      userID: id.trim(),
      userName: 'user_' + id,
    }));
    // send call invitation
    zp.sendCallInvitation({
      callees: users,
      callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
      timeout: 60,
    })
      .then((res) => {
        console.warn(res);
        if (res.errorInvitees.length) {
          alert('The user dose not exist or is offline.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
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
    </div>
  );
};

export default Call;
