import type { ChatMessage } from '../types/chat';

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
        isUser
          ? 'ml-auto bg-indigo-600 text-white'
          : 'bg-gray-800 text-gray-100'
      }`}
    >
      {message.content}
    </div>
  );
}
