import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import MessageBubble from './MessageBubble';

const ChatContainer = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mb-3">
          <span className="text-2xl">💬</span>
        </div>
        <p className="text-gray-400 text-sm">No conversations yet</p>
        <p className="text-xs text-gray-500 mt-1">Your translations will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContainer;