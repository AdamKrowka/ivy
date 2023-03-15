import styles from "./chatInput.module.scss";
import { ReactComponent as Send } from "icons/send.svg";
import { useChatContext } from "context/chatContext";
import cx from "classnames";
import { useMemo } from "react";
import { useRef } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";

interface FormValues {
  text: string;
}

const initialValues = {
  text: "",
};

const ChatInput = () => {
  const { isChatActive, startChat, sendRequest } = useChatContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const onStartClick = () => {
    if (isChatActive) return;
    startChat();
    if (!inputRef.current) return;
    inputRef.current.focus();
  };

  const onSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    sendRequest(values.text);
    setSubmitting(false);
    resetForm();
  };

  const placeholder = useMemo(() => {
    if (isChatActive) return "Enter your message";
    return "How can I help you";
  }, [isChatActive]);
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, values }) => (
        <Form
          className={cx(styles.inputWrapper, {
            [styles.disabled]: !isChatActive,
          })}
          onClick={onStartClick}
        >
          <Field
            type="text"
            name="text"
            ref={inputRef}
            autoComplete="off"
            placeholder={placeholder}
          />
          <button
            type="submit"
            title="send"
            disabled={isSubmitting || !isChatActive || !values.text}
          >
            <Send />
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ChatInput;
