import type { ChatMessage } from '../types/chat';
import { formatTime } from '../utils/formatTime';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface Props {
  message: ChatMessage;
  onFeedback?: (id: string, feedback: 'like' | 'dislike') => void;
}

export function MessageBubble({ message, onFeedback }: Props) {
  const isUser = message.role === 'user';

  return (
    <div className="w-full flex">
      <div
        className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`flex gap-3 ${isUser ? 'max-w-[70%] items-end text-right' : 'max-w-[88%] items-start text-left'}`}
        >
          {!isUser && (
            <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center shrink-0">
              <span className="text-white text-xs">AI</span>
            </div>
          )}

          <div className="flex flex-col">
            <div
              className={`flex items-center gap-2 text-xs mb-1 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <span className="font-medium text-white">
                {isUser ? 'You' : 'HaiIntel AI'}
              </span>

              <span className="text-gray-400">
                {formatTime(message.createdAt)}
              </span>

              {!isUser && onFeedback && (
                <div className="flex gap-2 ml-2 text-gray-400">
                  <button
                    onClick={() => onFeedback(message.id, 'dislike')}
                    className={`p-1 rounded-md transition ${message.feedback === 'dislike' ? 'bg-white/15 text-white': 'text-white/50 hover:text-white'}`}
                  >
                    <ThumbsDown size={14} />
                  </button>

                  <button
                    onClick={() => onFeedback(message.id, 'like')}
                    className={`p-1 rounded-md transition ${message.feedback === 'like' ? 'bg-white/15 text-white': 'text-white/50 hover:text-white'}`}
                  >
                    <ThumbsUp size={14} />
                  </button>
                </div>
              )}
            </div>

            <div
              className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere]
                ${isUser
                  ? 'bg-slate-600/70 text-white text-left'
                  : 'bg-white/15 backdrop-blur-md border border-white/10 text-white text-left'
                }`}
            >
              {message.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
