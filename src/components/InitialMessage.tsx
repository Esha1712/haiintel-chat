import { Hand } from 'lucide-react';

const InitialMessage = ({ sendMessage }: { sendMessage: (text: string) => void }) => {
    return (
        <div className="flex flex-col items-center text-center px-4 py-10 text-white/80">
            <div className="flex items-center justify-center gap-2 mb-3">
                <Hand className="text-white/80" size={18} />
                <span className="text-lg font-medium text-white">
                    Hi, I’m HaiIntel Assistant
                </span>
            </div>


            <p className="text-sm max-w-xs">
                I can help you explore our AI services, design approach, and
                human-centered AI experiences.
            </p>

            <div className="mt-6 flex flex-col gap-2 w-full max-w-xs">
                <button
                    onClick={() => sendMessage('What services does HaiIntel offer?')}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
                >
                    What services does HaiIntel offer?
                </button>

                <button
                    onClick={() => sendMessage('How does human-centered AI work?')}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
                >
                    How does human-centered AI work?
                </button>

                <button
                    onClick={() => sendMessage('Do you build AI chat interfaces?')}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
                >
                    Do you build AI chat interfaces?
                </button>
            </div>
        </div>
    )
}

export default InitialMessage
