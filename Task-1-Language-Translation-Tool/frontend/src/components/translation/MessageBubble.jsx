import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Volume2 } from 'lucide-react';
import {
  speakText
}
from "../../services/translationService";


const MessageBubble = ({ message }) => {
  const isUser = message.type === 'user';
  

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[80%] ${isUser ? 'order-1' : 'order-2'}`}>
        <div className={`rounded-2xl px-4 py-2 ${
          isUser 
            ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white' 
            : 'bg-gray-700 text-gray-200'
        }`}>
          <p className="text-sm">{message.text}</p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">
            {message.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button
            onClick={handleCopy}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            title="Copy"
          >
            <Copy className="w-3 h-3 text-gray-400" />
          </button>

          <button
  onClick={() =>
    speakText(
      message.text,
      message.targetLang || message.sourceLang || "en"
    )
  }
  className="p-1 hover:bg-gray-700 rounded transition-colors"
  title="Listen"
>
  <Volume2 className="w-3 h-3 text-gray-400" />
</button>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;