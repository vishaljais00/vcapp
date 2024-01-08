// Import necessary modules and styles
import React, { useEffect, useState } from 'react';

const VideoCallComponent = () => {
  let zp;

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
    const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");
    const { ZIM } = await import("zego-zim-web");
    const userID = randomID(5);
    const userName = 'user_' + userID;
    document.querySelector('.name').innerHTML = userName;
    document.querySelector('.id').innerHTML = userID;
  
    const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        1051992223, // You need to replace the appid with your own appid
        "97fd45081621ff415c72452e3dd5adbd",
        null,
        userID,
        userName
    );
    zp = ZegoUIKitPrebuilt.create(KitToken);
    // add plugin
    zp.addPlugins({ ZIM });
  }

  function handleSend() {
    const callee = document.querySelector('#userID').value;
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
      callType: zp.InvitationTypeVideoCall,
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
    init();
  }, []);

  return (
    <div id="app">
      <p>
        my userName: <span className="name"></span>
      </p>
      <p>
        my userID: <span className="id"></span>
      </p>
      <input type="text" id="userID" placeholder="callee's userID" />
      <button className="videoCall" onClick={() => handleSend()}>
        video call
      </button>
    </div>
  );
};

export default VideoCallComponent;
