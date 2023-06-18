const ChatMessage = ({ sender, content }) => {
  return (
    <div className="chat-message">
      <div className="chat-sender">{sender}</div>
      <div className="chat-content">{content}</div>
    </div>
  );
};

export default ChatMessage;
