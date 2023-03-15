import { createContext, ReactNode, useContext, useState } from "react";

export interface ChatContextWrapperProps {
  children: ReactNode;
}

export interface ContextValue {
  isChatOpen: boolean;
}

const defaultValue: ContextValue = {
  isChatOpen: false,
};
const ChatContext = createContext<ContextValue>(defaultValue);

export const ChatContextWrapper = ({ children }: ChatContextWrapperProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const value: ContextValue = {
    isChatOpen,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
