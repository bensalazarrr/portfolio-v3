import { ArrowUpRight, MessageSquare, Minus, Send, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';
import {
  SUGGESTED_QUESTIONS,
  answerPortfolioQuestion,
  type AssistantResponse,
} from '../utils/portfolioAssistant';

interface Message {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  links?: AssistantResponse['links'];
}

interface PortfolioAssistantProps {
  onNavigate: (path: string, sectionId?: string) => void;
}

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  sender: 'assistant',
  text: `Hi! I'm ${PORTFOLIO_PROFILE.nickname}'s portfolio assistant. Ask me about his projects, tech stack, education, or how to contact him.`,
};

export function PortfolioAssistant({ onNavigate }: PortfolioAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      const timer = setTimeout(() => inputRef.current?.focus(), 180);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  const sendQuestion = (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: trimmed,
    };

    const reply = answerPortfolioQuestion(trimmed);
    const assistantMsg: Message = {
      id: `a-${Date.now() + 1}`,
      sender: 'assistant',
      text: reply.text,
      links: reply.links,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-5 sm:right-5">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="assistant-trigger"
            type="button"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Open Ben's portfolio assistant"
            className="glass-nav-floating group inline-flex min-h-[44px] items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-medium text-slate-900 whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-600/35 hover:text-slate-950 active:scale-[0.98] dark:text-slate-100 dark:hover:border-sky-300/35 dark:hover:text-white"
          >
            <MessageSquare className="h-4 w-4 text-sky-600 transition-transform duration-200 group-hover:scale-110 dark:text-sky-300" />
            <span>Ask about Ben</span>
          </motion.button>
        ) : (
          <motion.aside
            key="assistant-panel"
            aria-label="Portfolio assistant chat"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="glass-nav-floating fixed inset-x-3 bottom-3 flex max-h-[76dvh] flex-col overflow-hidden rounded-2xl shadow-2xl sm:static sm:h-[460px] sm:max-h-[80vh] sm:w-[360px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-900/[0.08] bg-slate-900/[0.025] px-4 py-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-sky-600/20 bg-sky-500/10 text-sky-700 dark:border-white/10 dark:bg-sky-400/10 dark:text-sky-300">
                  <MessageSquare className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h3 className="font-display text-xs font-semibold text-slate-950 dark:text-white">
                    About {PORTFOLIO_PROFILE.nickname}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Portfolio information assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Minimize assistant"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-900/[0.07] hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/[0.08] dark:hover:text-white"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close assistant"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-900/[0.07] hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/[0.08] dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3.5 text-[13px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-slate-950 font-medium text-white dark:bg-white dark:text-[#090a0f]'
                        : 'border border-slate-900/[0.08] bg-slate-900/[0.04] text-slate-800 dark:border-white/[0.08] dark:bg-white/[0.045] dark:text-slate-200'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {msg.links && msg.links.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5 border-t border-slate-900/[0.08] pt-2 dark:border-white/[0.08]">
                        {msg.links.map((link) =>
                          link.external || link.href.startsWith('tel:') ? (
                            <a
                              key={link.label}
                              href={link.href}
                              target={link.external ? '_blank' : undefined}
                              rel={
                                link.external ? 'noopener noreferrer' : undefined
                              }
                              className="inline-flex items-center gap-1 rounded-lg border border-slate-900/12 bg-slate-900/[0.05] px-2.5 py-1 text-[11px] font-medium text-sky-700 transition-colors hover:bg-slate-900/[0.1] hover:text-sky-900 dark:border-white/12 dark:bg-white/[0.06] dark:text-sky-200 dark:hover:bg-white/[0.12] dark:hover:text-white"
                            >
                              <span>{link.label}</span>
                              <ArrowUpRight className="h-3 w-3" />
                            </a>
                          ) : (
                            <button
                              key={link.label}
                              type="button"
                              onClick={() => {
                                onNavigate(link.href);
                                if (window.innerWidth < 640) {
                                  setIsOpen(false);
                                }
                              }}
                              className="inline-flex items-center gap-1 rounded-lg border border-slate-900/12 bg-slate-900/[0.05] px-2.5 py-1 text-[11px] font-medium text-sky-700 transition-colors hover:bg-slate-900/[0.1] hover:text-sky-900 dark:border-white/12 dark:bg-white/[0.06] dark:text-sky-200 dark:hover:bg-white/[0.12] dark:hover:text-white"
                            >
                              <span>{link.label}</span>
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Suggested Quick Questions (shown when conversation is fresh) */}
              {messages.length === 1 && (
                <div className="pt-1">
                  <p className="mb-2 text-[11px] text-slate-500">
                    Suggested questions
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => sendQuestion(q)}
                        className="rounded-lg border border-slate-900/10 bg-slate-900/[0.03] px-2.5 py-1.5 text-left text-[11px] text-slate-700 transition-colors hover:border-sky-600/35 hover:bg-slate-900/[0.07] hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-sky-300/35 dark:hover:bg-white/[0.08] dark:hover:text-white"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-slate-900/[0.08] bg-slate-900/[0.02] p-2.5 dark:border-white/[0.08] dark:bg-white/[0.02]"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills, contact..."
                aria-label="Ask a question about Benedict's portfolio"
                className="min-h-[40px] flex-1 rounded-xl border border-slate-900/10 bg-white/80 px-3.5 text-xs text-slate-950 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-300/50"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send question"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-[#090a0f] dark:hover:bg-sky-100"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
