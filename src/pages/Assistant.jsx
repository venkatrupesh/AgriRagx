import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Send, Trash2, Sparkles, Leaf } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { queryRAG } from '../api/ragApi';
import ChatMessage from '../components/ChatMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const suggestedQuestions = [
  'What are the symptoms of tomato early blight?',
  'How can early blight be managed?',
  'What soil conditions are suitable for rice?',
  'How does rainfall affect crop yield?',
  'What are the best practices for wheat cultivation?',
  'How to identify nutrient deficiency in plants?',
];

export default function Assistant() {
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Handle disease context from disease detection page
  useEffect(() => {
    const crop = searchParams.get('crop');
    const disease = searchParams.get('disease');
    const confidence = searchParams.get('confidence');

    if (disease) {
      const diseaseName = disease.replace(/__/g, ' — ').replace(/_/g, ' ');
      const contextMsg = `I detected ${diseaseName} on ${crop || 'a crop'} leaf with ${confidence ? confidence + '% confidence' : 'the disease detection model'}. Can you tell me more about this disease, its causes, and how to manage it?`;
      setInput(contextMsg);
    }
  }, [searchParams]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const crop = searchParams.get('crop');
      const disease = searchParams.get('disease');
      const context = {};
      if (crop) context.crop = crop;
      if (disease) context.disease = disease;

      const response = await queryRAG(text.trim(), context);

      const aiMessage = {
        role: 'assistant',
        content: response.answer || 'I was unable to generate a response. Please try rephrasing your question.',
        sources: response.sources || [],
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message || 'Failed to get a response. Please try again.';
      setError(errMsg);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearConversation = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col" style={{ height: 'calc(100vh - 10rem)' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-surface-900'}`}>Agri AI Assistant</h1>
              <p className={`text-xs ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>
                Ask questions about crops, diseases, soil, fertilizers, and more.
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearConversation}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'text-surface-400 hover:text-red-400 hover:bg-red-500/10' : 'text-surface-500 hover:text-red-500 hover:bg-red-50'}`}
              title="Clear conversation"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </motion.div>

        {/* Chat Area */}
        <div className={`flex-1 overflow-y-auto rounded-2xl border p-4 sm:p-6 mb-4 chat-container ${isDark ? 'border-white/5 bg-white/[0.01]' : 'border-surface-200 bg-surface-50/50'}`}>
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${isDark ? 'bg-violet-500/10' : 'bg-violet-50'}`}>
                <Sparkles className="w-8 h-8 text-violet-500" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-surface-900'}`}>
                How can I help you?
              </h3>
              <p className={`text-sm mb-8 text-center max-w-md ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>
                Ask any agricultural question. Responses are grounded in retrieved knowledge using RAG.
              </p>

              {/* Suggested Questions */}
              <div className="grid sm:grid-cols-2 gap-2 w-full max-w-lg">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className={`text-left text-xs px-4 py-3 rounded-xl border transition-all duration-200 ${isDark
                      ? 'border-white/5 bg-white/[0.02] text-surface-300 hover:border-violet-500/30 hover:bg-violet-500/5'
                      : 'border-surface-200 bg-white text-surface-600 hover:border-violet-300 hover:bg-violet-50'
                    }`}
                  >
                    <Leaf className="w-3 h-3 text-agri-500 inline mr-1.5" />
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((msg, i) => (
                <ChatMessage key={i} message={msg} />
              ))}

              {loading && (
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-agri-500 to-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className={`rounded-2xl rounded-tl-md px-4 py-3 ${isDark ? 'bg-white/5 border border-white/5' : 'bg-white border border-surface-200'}`}>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-agri-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-agri-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-agri-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className={`text-xs ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>
                        Searching agricultural knowledge...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="max-w-lg">
                  <ErrorMessage message={error} onRetry={() => messages.length > 0 && sendMessage(messages[messages.length - 1].content)} />
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex-shrink-0">
          <div className={`flex gap-3 p-3 rounded-2xl border ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-surface-200 bg-white'}`}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask an agricultural question..."
              disabled={loading}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm focus:outline-none ${isDark
                ? 'bg-transparent text-white placeholder-surface-500'
                : 'bg-transparent text-surface-900 placeholder-surface-400'
              }`}
              aria-label="Message input"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-sm
                hover:from-violet-600 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-violet-500/20 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
