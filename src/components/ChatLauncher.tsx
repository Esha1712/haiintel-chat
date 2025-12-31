export function ChatLauncher({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onClick}
        className="
          relative
          h-14 w-14
          rounded-full
          bg-indigo-600
          text-white
          shadow-xl
          flex items-center justify-center
          hover:bg-indigo-500
          transition
          ai-pulse"
      >
        AI
      </button>

    </div>
  );
}
