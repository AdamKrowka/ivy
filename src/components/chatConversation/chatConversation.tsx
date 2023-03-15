import styles from "./chatConversation.module.scss";

import { ReactComponent as Logo } from "icons/Logo.svg";
import cx from "classnames";
import { useState } from "react";
import { useEffect } from "react";
import { ReactNode } from "react";
import { useChatContext } from "context/chatContext";

interface RowProps {
  text: string | ReactNode;
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
const BotRow = ({ text }: RowProps) => {
  return (
    <Row className={styles.botRow}>
      <Logo />
      <span>{text}</span>
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
  const {} = useChatContext();
  return (
    <div className={styles.chatConversation}>
      <div className={styles.messages}>
        <BotRow text="Hello, how can I help you?" />
        <ClientRow text="hi" />
        <BotRow text="Hello" />
      </div>
      <BotRow
        text={
          <div className={styles.typing}>
            <strong className={styles.dot} />
            <strong className={styles.dot} />
            <strong className={styles.dot} />
          </div>
        }
      />
    </div>
  );
};

export default ChatConversation;
