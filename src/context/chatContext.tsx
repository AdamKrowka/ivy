import { createContext, ReactNode, useContext, useState } from "react";

export interface ChatContextWrapperProps {
  children: ReactNode;
}

export interface ContextValue {
  isChatOpen: boolean;
  isChatActive: boolean;
  toggleChat: () => void;
  startChat: () => void;
}

const defaultValue: ContextValue = {
  isChatActive: false,
  isChatOpen: false,
  toggleChat: () => {},
  startChat: () => {},
};
const ChatContext = createContext<ContextValue>(defaultValue);

export const ChatContextWrapper = ({ children }: ChatContextWrapperProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  const startChat = () => {
    setIsChatActive(true);
  };
  const value: ContextValue = {
    isChatOpen,
    isChatActive,
    toggleChat,
    startChat,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
