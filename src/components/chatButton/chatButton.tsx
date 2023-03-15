import styles from "./chatButton.module.scss";
import { ReactComponent as Logo } from "icons/Logo.svg";
import { useChatContext } from "context/chatContext";
const ChatButton = () => {
  const { isChatOpen, toggleChat } = useChatContext();
  return (
    <button
      type="button"
      title="open chat"
      className={styles.button}
      onClick={toggleChat}
    >
      <Logo />
    </button>
  );
};

export default ChatButton;
