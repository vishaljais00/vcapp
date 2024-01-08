// pages/Room.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");

const Room = () => {
  const router = useRouter()
  useEffect(() => {
    const asyncFn = async () =>{
      const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");
      function getUrlParams(url) {
        let urlStr = url.split('?')[1];
        const urlSearchParams = new URLSearchParams(urlStr);
        const result = Object.fromEntries(urlSearchParams.entries());
        return result;
      }

      const roomID = getUrlParams(window.location.href)['roomID'] || (Math.floor(Math.random() * 10000) + "");
      const userID = Math.floor(Math.random() * 10000) + "";
      const userName = "userName" + userID;
      // const appID = 1484647939;
      const appID = 1051992223;
      const serverSecret = "97fd45081621ff415c72452e3dd5adbd";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: document.querySelector("#rootRoom"),
        sharedLinks: [{
          name: 'Personal link',
          url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
        }],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        onLeaveRoom: () => {
          router.push('/')
        },
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
      });
    }
    asyncFn();      
  }, []);

  return (
    <div id="rootRoom" className="myCallContainer h-[100vh]"></div>
  );
};

export default Room;


// Rest of your code: getUrlParams, exports, etc.
