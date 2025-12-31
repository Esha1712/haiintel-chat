import { motion } from 'framer-motion';

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm text-white/60">
      <span>HaiIntel AI is typing</span>

      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        .
      </motion.span>
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
      >
        .
      </motion.span>
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
      >
        .
      </motion.span>
    </div>
  );
}
