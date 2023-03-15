import { getResponse } from "api";
import { useEffect } from "react";
import { createContext, ReactNode, useContext, useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
export interface ChatContextWrapperProps {
  children: ReactNode;
}

export interface ContextValue {
  isChatOpen: boolean;
  isChatActive: boolean;
  toggleChat: () => void;
  startChat: () => void;
  sendRequest: (text: string) => void;
  isBotTyping: boolean;
  messages: ChatCompletionRequestMessage[];
  clearChat: () => void;
}

const defaultValue: ContextValue = {
  isChatActive: false,
  isChatOpen: false,
  toggleChat: () => {},
  startChat: () => {},
  sendRequest: () => {},
  isBotTyping: false,
  messages: [],
  clearChat: () => {},
};
const ChatContext = createContext<ContextValue>(defaultValue);

export const ChatContextWrapper = ({ children }: ChatContextWrapperProps) => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (!messages.length) return;
    localStorage.setItem("messages", JSON.stringify(messages));
    if (messages[messages.length - 1].role === "user") askGpt();
  }, [messages]);

  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    if (!storedMessages) return;
    console.log(storedMessages);
    setMessages(JSON.parse(storedMessages));
    setIsChatActive(true);
  }, []);

  const startChat = () => {
    setIsChatActive(true);
    setMessages([
      {
        content: "Hello, how can I help you?",
        role: "system",
      },
    ]);
  };

  const askGpt = async () => {
    try {
      const data = await getResponse(messages);
      setMessages((oldMessages) => [
        ...oldMessages,
        {
          content: data,
          role: "assistant",
        },
      ]);
    } catch {
      setMessages((oldMessages) => [
        ...oldMessages,
        {
          content: "Sorry, try again later",
          role: "system",
        },
      ]);
    }
    setIsBotTyping(false);
  };

  const sendRequest = (text: string) => {
    setIsBotTyping(true);
    setMessages([
      ...messages,
      {
        content: text,
        role: "user",
      },
    ]);
  };

  const clearChat = () => {
    localStorage.removeItem("messages");
    setIsChatActive(false);
    setMessages([]);
  };

  const value: ContextValue = {
    isChatOpen,
    isChatActive,
    toggleChat,
    startChat,
    sendRequest,
    isBotTyping,
    messages,
    clearChat,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
