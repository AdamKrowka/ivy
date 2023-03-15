import { ReactComponent as Logo } from "icons/Logo.svg";
import { useState, useEffect, ReactNode } from "react";
import { useChatContext } from "context/chatContext";
import styles from "./chatConversation.module.scss";
import cx from "classnames";
import { useRef } from "react";

interface RowProps {
  text: string;
  dots?: ReactNode;
}

const Row = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(true);
  }, []);
  return (
    <div
      className={cx(styles.row, className, {
        [styles.isActive]: isActive,
      })}
    >
      {children}
    </div>
  );
};
const BotRow = ({ text, dots }: RowProps) => {
  return (
    <Row className={styles.botRow}>
      <Logo />
      {dots && <span>{dots}</span>}
      {text && (
        <span
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      )}
    </Row>
  );
};

const ClientRow = ({ text }: RowProps) => {
  return (
    <Row className={styles.clientRow}>
      <span>{text}</span>
    </Row>
  );
};

const ChatConversation = () => {
  const { isBotTyping, messages } = useChatContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [isBotTyping, messages]);
  return (
    <div className={styles.chatConversation} ref={ref}>
      <div className={styles.messages}>
        {messages.map((message, index) =>
          message.role === "user" ? (
            <ClientRow text={message.content} key={`client-${index}`} />
          ) : (
            <BotRow text={message.content} key={`bot-${index}`} />
          )
        )}
      </div>
      {isBotTyping && (
        <BotRow
          text=""
          dots={
            <div className={styles.typing}>
              <strong className={styles.dot} />
              <strong className={styles.dot} />
              <strong className={styles.dot} />
            </div>
          }
        />
      )}
    </div>
  );
};

export default ChatConversation;
