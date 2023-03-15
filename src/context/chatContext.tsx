import { createContext, ReactNode, useContext, useState } from "react";

export interface ChatContextWrapperProps {
  children: ReactNode;
}

export interface ContextValue {
  isChatOpen: boolean;
  toggleChat: () => void;
}

const defaultValue: ContextValue = {
  isChatOpen: false,
  toggleChat: () => {},
};
const ChatContext = createContext<ContextValue>(defaultValue);

export const ChatContextWrapper = ({ children }: ChatContextWrapperProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };
  const value: ContextValue = {
    isChatOpen,
    toggleChat,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
