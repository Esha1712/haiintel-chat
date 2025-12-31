import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChatLauncher } from './components/ChatLauncher';
import { ChatWindow } from './components/ChatWindow';

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-[#020617]"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(99,102,241,0.25),transparent_60%),radial-gradient(50%_50%_at_80%_20%,rgba(168,85,247,0.20),transparent_60%),radial-gradient(40%_40%_at_50%_80%,rgba(56,189,248,0.12),transparent_60%)]"
      />
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-indigo-500/25 blur-[120px]"
      />

      {/* Chat window will be opened when the user clicks the launcher button */}
      <AnimatePresence>
        {open && <ChatWindow onClose={() => setOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!open && (
          <ChatLauncher onClick={() => setOpen(true)} />
        )}
      </AnimatePresence>

    </div>
  );
}
