import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChatLauncher } from './components/ChatLauncher';
import { ChatWindow } from './components/ChatWindow';

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <AnimatePresence>
        {open && <ChatWindow />}
      </AnimatePresence>

      <ChatLauncher onClick={() => setOpen(o => !o)} />
    </div>
  );
}
