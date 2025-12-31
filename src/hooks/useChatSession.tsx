import { useEffect, useState } from 'react';
import type { ChatMessage } from '../types/chat';
import { loadMessages, saveMessages } from '../utils/storage';

export function useChatSession() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return loadMessages<ChatMessage[]>() ?? [];
  });

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  function addMessage(message: ChatMessage) {
    setMessages(prev => [...prev, message]);
  }

  function reset() {
    setMessages([]);
  }

  return {
    messages,
    addMessage,
    reset,
  };
}
