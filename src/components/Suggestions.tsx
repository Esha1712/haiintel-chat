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
    px-3 py-1.5
    rounded-full

    bg-white/8
    backdrop-blur-md
    border border-white/15

    text-gray-200
    hover:bg-white/15
    hover:border-white/25

    transition
          "
        >
          <span
            className="
    pointer-events-none
    absolute inset-0
    rounded-full
    bg-gradient-to-br
    from-white/20
    to-transparent
    opacity-40
  "
          />
          {text}
        </button>
      ))}
    </div>
  );
}
