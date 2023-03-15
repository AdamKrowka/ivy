import { createContext, ReactNode, useContext, useState } from "react";

export interface ChatContextWrapperProps {
  children: ReactNode;
}

export interface ContextValue {
  isChatOpen: boolean;
  isChatActive: boolean;
  toggleChat: () => void;
  startChat: () => void;
  sendRequest: (text: string) => void;
}

const defaultValue: ContextValue = {
  isChatActive: false,
  isChatOpen: false,
  toggleChat: () => {},
  startChat: () => {},
  sendRequest: () => {},
};
const ChatContext = createContext<ContextValue>(defaultValue);

export const ChatContextWrapper = ({ children }: ChatContextWrapperProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
    setIsChatActive(false);
  };

  const startChat = () => {
    setIsChatActive(true);
  };

  const sendRequest = (text: string) => {
    alert(text);
  };
  const value: ContextValue = {
    isChatOpen,
    isChatActive,
    toggleChat,
    startChat,
    sendRequest,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
