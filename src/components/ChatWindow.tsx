import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { ChatMessage } from '../types/chat';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { AI_RESPONSES } from '../data/aiResponses';
import { streamText } from '../utils/streamText';
import { loadMessages, saveMessages } from '../utils/storage';
import { Suggestions } from './Suggestions';
import MinimiseIcon from '../assets/Minimise_Icon.svg';
import Send from '../assets/Send.svg';
import InitialMessage from './InitialMessage';

export function ChatWindow({ onClose }: { onClose: () => void }) {
    const [messages, setMessages] = useState<ChatMessage[]>(() => {
        const stored = loadMessages<ChatMessage[]>() ?? [];

        return stored.map(msg => ({
            ...msg,
            createdAt: msg.createdAt ?? Date.now(),
        }));
    });
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const bottomRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const shouldAutoScrollRef = useRef(true);
    const isFirstTime = messages.length === 0;

    useEffect(() => {
        if (!shouldAutoScrollRef.current) {
            shouldAutoScrollRef.current = true;
            return;
        }

        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping, showSuggestions]);

    useEffect(() => {
        saveMessages(messages);
    }, [messages]);

    const setFeedback = (messageId: string, feedback: 'like' | 'dislike') => {
        shouldAutoScrollRef.current = false;

        setMessages(prev =>
            prev.map(msg =>
                msg.id === messageId
                    ? {
                        ...msg,
                        feedback: msg.feedback === feedback ? null : feedback,
                    }
                    : msg
            )
        );
    };

    const sendMessage = async (text?: string) => {
        const value = (text ?? input).trim();
        if (!value || isTyping) return;

        setShowSuggestions(false);

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content: value,
            createdAt: Date.now(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        const aiMessageId = crypto.randomUUID();
        setMessages(prev => [
            ...prev,
            {
                id: aiMessageId,
                role: 'ai',
                content: '',
                feedback: null,
                createdAt: Date.now(),
            },
        ]);

        const response =
            AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];

        let aiContent = '';

        await streamText(response, partial => {
            aiContent = partial;
            setMessages(prev =>
                prev.map(m =>
                    m.id === aiMessageId
                        ? {
                            ...m,
                            content: aiContent,
                            feedback: m.feedback ?? null,
                        }
                        : m
                )
            );
        });


        setIsTyping(false);
        setShowSuggestions(true);
        inputRef.current?.focus();
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 sm:bottom-24 sm:right-6 w-[92vw] max-w-[380px] h-[75vh] max-h-[720px]
                       z-40 rounded-2xl bg-white/8 backdrop-blur-2xl border border-white/15 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
        >
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
            <div className="relative h-full flex flex-col rounded-2xl bg-black/20 backdrop-blur-md">
                <div
                    className="px-4 py-3 backdrop-blur-lg text-white font-medium flex justify-between"
                >
                    <span>HaiIntel Assistant</span>
                    <img
                        src={MinimiseIcon}
                        alt="Minimize chat"
                        onClick={onClose}
                        className="cursor-pointer p-1 rounded-md hover:bg-white/10 transition brightness-0 invert"
                    />
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-3 text-white glass-scrollbar">
                    {isFirstTime && (
                        <InitialMessage sendMessage={sendMessage} />
                    )}

                    {messages.map(msg => (
                        <MessageBubble
                            key={msg.id}
                            message={msg}
                            onFeedback={setFeedback}
                        />
                    ))}


                    {showSuggestions && !isTyping && (
                        <Suggestions onSelect={text => sendMessage(text)} />
                    )}

                    <div ref={bottomRef} />
                </div>

                {isTyping && (
                    <div className="px-7 pt-3 pr-10">
                        <TypingIndicator />
                    </div>
                )}

                <div
                    className="p-3 border-t border-white/10 bg-black/25 backdrop-blur-md rounded-b-2xl"
                >
                    <div
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/15 focus-within:border-white/30 transition"
                    >
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && !isTyping && sendMessage()}
                            placeholder="Ask about HaiIntel…"
                            className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-400"
                        />

                        <img
                            src={Send}
                            alt="Send button"
                            onClick={() => {
                                if (!isTyping) sendMessage();
                            }}
                            className={`h-8 w-8 p-1.5 rounded-lg transition
                                ${isTyping
                                    ? 'opacity-40 cursor-not-allowed pointer-events-none'
                                    : 'cursor-pointer hover:bg-white/15'
                                }`}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
