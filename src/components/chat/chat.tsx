import { useChatContext } from "context/chatContext";
import styles from "./chat.module.scss";
import cx from "classnames";
import { ReactComponent as Close } from "icons/Close.svg";
import { ReactComponent as More } from "icons/More.svg";
import { ReactComponent as Logo } from "icons/LogoBig.svg";
import ChatInput from "components/chatInput/chatInput";
import ChatConversation from "components/chatConversation/chatConversation";
const Chat = () => {
  const { isChatOpen, toggleChat, isChatActive, clearChat } = useChatContext();

  return (
    <div
      className={cx(styles.chat, {
        [styles.isOpen]: isChatOpen,
        [styles.isActive]: isChatActive,
      })}
    >
      <div className={styles.header}>
        {/* TODO more actions, now clear chat */}
        <button
          type="button"
          title="clear"
          className={styles.more}
          onClick={clearChat}
        >
          <More />
        </button>
        {isChatActive && <div className={styles.title}>Ivy Bot</div>}
        {!isChatActive && (
          <div className={styles.logoWrapper}>
            <Logo />
          </div>
        )}
        <button
          type="button"
          title="close"
          className={styles.close}
          onClick={toggleChat}
        >
          <Close />
        </button>
      </div>
      {!isChatActive && (
        <div className={styles.contentNotActive}>
          <h1>Hi, I am Ivy!</h1>
          <p>I am a virtual assistant here to answer your questions.</p>
        </div>
      )}
      {isChatActive && <ChatConversation />}
      <div className={styles.input}>
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
