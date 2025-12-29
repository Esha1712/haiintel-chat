interface Props {
  onSelect: (text: string) => void;
}

export function Suggestions({ onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {[
        'What services does HaiIntel offer?',
        'How does human-centered AI work?',
        'Do you build AI chat interfaces?',
      ].map(text => (
        <button
          key={text}
          onClick={() => onSelect(text)}
          className="
            text-xs
            px-3 py-1
            rounded-full
            bg-gray-800
            text-gray-300
            hover:bg-gray-700
            transition
          "
        >
          {text}
        </button>
      ))}
    </div>
  );
}
