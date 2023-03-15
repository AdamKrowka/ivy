import styles from "./chatButton.module.scss";
import { ReactComponent as Logo } from "icons/Logo.svg";
import { useChatContext } from "context/chatContext";
import cx from "classnames";
const ChatButton = () => {
  const { isChatOpen, toggleChat } = useChatContext();
  return (
    <button
      type="button"
      title="open chat"
      className={cx(styles.button, {
        [styles.isClosed]: !isChatOpen,
      })}
      onClick={toggleChat}
    >
      <Logo />
    </button>
  );
};

export default ChatButton;
