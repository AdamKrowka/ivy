import Chat from "../chat/chat";
import ChatButton from "../chatButton/chatButton";
import styles from "./chatWrapper.module.scss";

const ChatWrapper = () => {
  return (
    <div className={styles.chatWrapper}>
      <Chat />
      <ChatButton />
    </div>
  );
};

export default ChatWrapper;
