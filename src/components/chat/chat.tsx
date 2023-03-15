import styles from "./chat.module.scss";

const Chat = () => {
  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <button type="button" className={styles.more}>
          more
        </button>
        <div className={styles.title}>Ivy Bot</div>

        <button type="button" className={styles.close}>
          x
        </button>
      </div>
      <div className={styles.content}>
        <h1>Hi, I am Ivy!</h1>
        <p>I am a virtual assistant here to answer your questions.</p>
      </div>
      <div className={styles.input}>
        <input title="text" />
      </div>
    </div>
  );
};

export default Chat;
