import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { ChatMessage } from '../types/chat';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { AI_RESPONSES } from '../data/aiResponses';
import { streamText } from '../utils/streamText';
import { loadMessages, saveMessages } from '../utils/storage';
import { Suggestions } from './Suggestions';

export function ChatWindow() {
    const [messages, setMessages] = useState<ChatMessage[]>(
        () => loadMessages<ChatMessage[]>() ?? []
    );
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    useEffect(() => {
        saveMessages(messages);
    }, [messages]);

    async function sendMessage() {
        if (!input.trim() || isTyping) return;
        setShowSuggestions(false);

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content: input,
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Simulate AI thinking
        setIsTyping(true);

        const aiMessageId = crypto.randomUUID();
        let aiContent = '';

        // Add empty AI message first
        setMessages(prev => [
            ...prev,
            {
                id: aiMessageId,
                role: 'ai',
                content: '',
            },
        ]);

        const response =
            AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];

        await streamText(response, partial => {
            aiContent = partial;
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === aiMessageId
                        ? { ...msg, content: aiContent }
                        : msg
                )
            );
        });
        setIsTyping(false);
        setShowSuggestions(true);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-gray-900 rounded-xl shadow-2xl z-40 flex flex-col"
        >
            <div className="p-4 border-b border-gray-700 text-white">
                HaiIntel Assistant
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map(msg => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}

                {isTyping && <TypingIndicator />}
                {showSuggestions && !isTyping && (
                    <Suggestions
                        onSelect={text => {
                            setInput(text);
                        }}
                    />
                )}

                <div ref={bottomRef} />
            </div>

            <div className="p-3 border-t border-gray-700 flex gap-2">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    className="flex-1 bg-gray-800 text-white text-sm px-3 py-2 rounded outline-none"
                    placeholder="Ask about HaiIntel…"
                />
                <button
                    onClick={sendMessage}
                    className="bg-indigo-600 px-3 rounded text-white text-sm disabled:opacity-50"
                    disabled={isTyping}
                >
                    Send
                </button>
            </div>
        </motion.div>
    );
}
