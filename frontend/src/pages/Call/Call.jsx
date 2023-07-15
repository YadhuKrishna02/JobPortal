import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Box } from '@mui/material';

const CallPage = () => {
  const { roomId } = useParams();

  const myMeeting = async (element) => {
    const appID = 1491832180;
    const serverSecret = 'f500313979dc7f6314215d00d680e665';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      'Enter NickName'
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Copy Link',
          url: `https://jobzen.online/room/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: false,
    });
  };
  return (
    <div>
      <div style={{ padding: '7rem' }} ref={myMeeting} />
    </div>
  );
};

export default CallPage;
