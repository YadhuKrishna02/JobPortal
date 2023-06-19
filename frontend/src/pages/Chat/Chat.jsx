import React, { useRef, useState } from 'react';
import ChatBox from '../../components/Chat/ChatBox';
import Conversation from '../../components/Chat/Conversation';
// import LogoSearch from "../../components/LogoSearch/LogoSearch";
// import NavIcons from "../../components/NavIcons/NavIcons";
import './Chat.css';
import { useEffect } from 'react';
import { userChats } from '../../redux/chat/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
// import { Box } from '@mui/material';

const Chat = () => {
  // const dispatch = useDispatch();
  const socket = useRef();

  const Id = useSelector((state) =>
    state?.recruiters?.recruiters?.recruiterData
      ? state?.recruiters?.recruiters?.recruiterData._id
      : state?.users?.users?.applicantId
  );
  const recruiterId = useSelector(
    (state) => state?.recruiters?.recruiters?.recruiterData?._id
  );
  const recId = {
    recId: recruiterId,
  };

  const userId = useSelector((state) => state?.users?.users?.applicantId);
  const usId = {
    appId: userId,
  };
  const currentUserId = recruiterId ? recId : usId;
  console.log(currentUserId, ';;;;');
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  // Send Message to socket server

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io('ws://localhost:5000');
    socket.current.emit('new-user-add', Id);
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
    });

    socket.current.on('receive-message', (data) => {
      setReceiveMessage(data);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [Id, receiveMessage]);
  console.log(receiveMessage, 'reeeeeeeee');
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await userChats(Id);
        console.log(data, 'dataaaaaaaaaaa');
        setChats(data?.data?.chats);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [Id]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== Id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
      <div className="Chat" style={{ marginTop: '6rem' }}>
        {/* <Box m='2rem 0' /> */}

        {/* Left Side */}
        <div className="Left-side-chat">
          <div className="Chat-container">
            <h2>Chats</h2>
            <div className="Chat-list">
              {chats.map((chat) => (
                // eslint-disable-next-line react/jsx-key
                <div
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                >
                  <Conversation
                    data={chat}
                    currentUserId={currentUserId}
                    online={checkOnlineStatus(chat)}
                  />
                  <div></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="Right-side-chat">
          <ChatBox
            chat={currentChat}
            currentUser={recruiterId ? recruiterId : userId}
            setSendMessage={setSendMessage}
            receivedMessage={receiveMessage}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
