export function ChatLauncher({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-6
        h-14 w-14
        rounded-full
        bg-indigo-600
        text-white
        shadow-xl
        flex items-center justify-center
        z-50
      "
    >
      AI
    </button>
  );
}
