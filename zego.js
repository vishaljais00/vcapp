// zego.js
import dynamic from 'next/dynamic';

const ZegoUIKitPrebuiltPromise = dynamic(() =>
  import('@zegocloud/zego-uikit-prebuilt')
    .then((module) => module.default)
    .catch((error) => {
      console.error('Error loading ZegoUIKitPrebuilt:', error);
    })
);

export default ZegoUIKitPrebuiltPromise;
