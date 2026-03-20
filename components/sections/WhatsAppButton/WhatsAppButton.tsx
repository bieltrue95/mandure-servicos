'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import type { WhatsAppButtonProps } from './WhatsAppButton.types';

export function WhatsAppButton({ whatsappUrl }: WhatsAppButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50" aria-label="Contato via WhatsApp">
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-whatsapp-500 opacity-30"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp-500 text-white shadow-xl hover:bg-whatsapp-600"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        aria-label="Falar pelo WhatsApp"
      >
        <MessageCircle className="h-8 w-8" />
      </motion.a>
    </div>
  );
}
