import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Rocket, BookOpen } from 'lucide-react';
import PremiumHero from './components/PremiumHero';
import NeuralChatbot from './components/NeuralChatbot';
import CategoryExplorer from './components/CategoryExplorer';
import TrendingSection from './components/TrendingSection';
import ToolCarousel from './components/ToolCarousel';
import Sidebar from './components/Sidebar';
import LearningHub from './components/LearningHub';
import InteractiveCursor from './components/InteractiveCursor';

function App() {
  const [heroQuery, setHeroQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [chatKey, setChatKey] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [chatInitialQuery, setChatInitialQuery] = useState('');

  // Handle search from Hero
  const handleSearch = useCallback((query) => {
    if (query?.trim()) {
      setChatInitialQuery(query);
      setActiveSection('chat');
      setChatKey(prev => prev + 1);
    }
  }, []);

  // Handle Learning Hub topic click
  const handleLearnTopic = useCallback((topic) => {
    if (!topic) {
      setSelectedTopic(null);
      setChatInitialQuery('');
      return;
    }
    setSelectedTopic(topic.id);
    const query = topic.questions?.[0] || `Tell me about ${topic.title}`;
    setChatInitialQuery(query);
    setActiveSection('chat');
    setChatKey(prev => prev + 1);
  }, []);

  // Handle Category click
  const handleCategorySelect = useCallback((query) => {
    if (query?.trim()) {
      setChatInitialQuery(query);
      setActiveSection('chat');
      setChatKey(prev => prev + 1);
    }
  }, []);

  const handleBackToHome = useCallback(() => {
    setActiveSection('home');
    setChatInitialQuery('');
    setSelectedTopic(null);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0b1120]">
      <InteractiveCursor />
      
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        setActiveSection={(section) => {
          setActiveSection(section);
          if (section === 'home') {
            setChatInitialQuery('');
            setSelectedTopic(null);
          }
        }}
      />

      <main className="relative z-10">
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0b1120]/80 backdrop-blur-lg border-b border-white/5 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-cyan-400" />
            <span className="font-bold text-xl text-white">AI Compass</span>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <Menu className="w-5 h-5 text-white/60" />
          </button>
        </div>

        <div className="pt-16 lg:pt-0">
          <AnimatePresence mode="wait">
            {activeSection === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PremiumHero onSearch={handleSearch} />
                <CategoryExplorer onCategorySelect={handleCategorySelect} />
                <LearningHub 
                  onLearnTopic={handleLearnTopic}
                  selectedTopic={selectedTopic}
                  onSelectTopic={(id) => setSelectedTopic(id)}
                />
                <TrendingSection />
                <ToolCarousel />
              </motion.div>
            )}
            {activeSection === 'explore' && (
              <motion.div
                key="explore"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CategoryExplorer fullPage onCategorySelect={handleCategorySelect} />
              </motion.div>
            )}
            {activeSection === 'chat' && (
              <motion.div
                key={`chat-${chatKey}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative max-w-6xl mx-auto px-4 py-4 md:py-8">
                  <NeuralChatbot 
                    fullPage 
                    initialQuery={chatInitialQuery}
                    selectedTopic={selectedTopic}
                    onBack={handleBackToHome}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default App;