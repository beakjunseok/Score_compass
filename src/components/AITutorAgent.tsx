import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  RefreshCw,
  Volume2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  BookOpen,
  MessageSquareText,
  Lightbulb,
  GraduationCap,
  ArrowRight,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { GradingQuestion, AITutorMessage } from '../types';

interface AITutorAgentProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  activeQuestion: GradingQuestion | null;
  subject?: string;
  onClearActiveQuestion?: () => void;
}

export const AITutorAgent: React.FC<AITutorAgentProps> = ({
  isOpen,
  onToggle,
  onClose,
  activeQuestion,
  subject = '수학',
  onClearActiveQuestion,
}) => {
  const [messages, setMessages] = useState<AITutorMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isContextCollapsed, setIsContextCollapsed] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize or update conversation when activeQuestion changes
  useEffect(() => {
    if (activeQuestion) {
      const introMsg: AITutorMessage = {
        id: `welcome-${activeQuestion.id}-${Date.now()}`,
        role: 'assistant',
        text: `안녕하세요! **${activeQuestion.page} ${activeQuestion.questionNumber}번** (${activeQuestion.conceptTag || '교과 개념'}) 문제의 해설에서 어떤 부분이 이해하기 어려우신가요?\n\n제가 학생의 눈높이에 맞춰 **가장 쉬운 비유와 단계별 풀이**로 막힌 곳을 뚫어드릴게요! 아래 추천 질문을 누르시거나 궁금한 점을 편하게 적어주세요. 😊`,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        questionContext: {
          page: activeQuestion.page,
          questionNumber: activeQuestion.questionNumber,
          subject,
          conceptTag: activeQuestion.conceptTag,
          studentAnswer: activeQuestion.studentAnswer,
          correctAnswer: activeQuestion.correctAnswer,
        },
      };
      setMessages([introMsg]);
      if (!isOpen) {
        setUnreadBadge(true);
      }
    } else if (messages.length === 0) {
      // Default welcome
      const defaultIntro: AITutorMessage = {
        id: `welcome-default`,
        role: 'assistant',
        text: `반가워요! 저는 **ScoreCompass 1:1 AI 과외 선생님**입니다.\n\n문제를 풀다가 해설이 잘 이해되지 않거나, 특정 공식이나 개념이 헷갈릴 때 언제든 편하게 질문하세요. 문제 번호를 말씀해주시거나 지문을 직접 붙여넣으셔도 좋습니다! ✏️`,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([defaultIntro]);
    }
  }, [activeQuestion]);

  useEffect(() => {
    if (isOpen) {
      setUnreadBadge(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsg: AITutorMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      questionContext: activeQuestion
        ? {
            page: activeQuestion.page,
            questionNumber: activeQuestion.questionNumber,
            subject,
            conceptTag: activeQuestion.conceptTag,
            studentAnswer: activeQuestion.studentAnswer,
            correctAnswer: activeQuestion.correctAnswer,
          }
        : undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/tutor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          questionContext: activeQuestion
            ? {
                ...activeQuestion,
                subject,
              }
            : null,
          history: messages.map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error('AI 과외 응답 생성 실패');
      }

      const data = await res.json();
      const botMsg: AITutorMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: data.reply || '선생님이 잠시 확인 중입니다. 다시 한 번 질문해주세요!',
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: AITutorMessage = {
        id: `assistant-fallback-${Date.now()}`,
        role: 'assistant',
        text: `좋은 질문이에요! ${
          activeQuestion
            ? `[${activeQuestion.page} ${activeQuestion.questionNumber}번] 풀이에서 핵심은 **${
                activeQuestion.conceptTag || '핵심 공식'
              }**을 대입하기 전 문제의 숨은 전제 조건을 꼼꼼히 확인하는 것입니다.`
            : '문제 풀이의 기본 원리를 다시 정리해드릴게요.'
        }\n\n1. **문제의 핵심 질문**: ${activeQuestion?.questionSnippet || '조건 파악'}\n2. **실제 정답**: [${activeQuestion?.correctAnswer || '정답'}]\n3. **오답을 피하는 팁**: 연산 부호 실수나 발문 끝의 조건(예: 양수, 단 x≠0 등)을 형광펜으로 체크하는 습관이 필수적입니다.\n\n혹시 1단계 식 세우는 과정이 어려우신가요, 아니면 마지막 계산 과정이 헷갈리시나요?`,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSpeak = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown symbols for cleaner TTS
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/#/g, '')
      .replace(/\[/g, '')
      .replace(/\]/g, '')
      .replace(/-/g, ' ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ko-KR';
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([]);
    if (activeQuestion) {
      const resetMsg: AITutorMessage = {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        text: `대화를 새로 시작했습니다! **${activeQuestion.page} ${activeQuestion.questionNumber}번** 해설에서 이해되지 않는 점을 무엇이든 질문하세요! 😊`,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([resetMsg]);
    } else {
      const resetMsg: AITutorMessage = {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        text: `새로운 학습 질문을 시작합니다! 이해되지 않는 문제나 개념을 자유롭게 말씀해주세요.`,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([resetMsg]);
    }
  };

  // Quick preset questions
  const presetQuestions = activeQuestion
    ? [
        '💡 2단계 계산 과정이 왜 이렇게 되는지 더 쉽게 설명해줘',
        '👶 초등학생도 알기 쉽게 일상 비유로 설명해줘',
        '⚠️ 내가 고른 오답이 왜 틀렸고 어떤 함정이 있었는지 짚어줘',
        '📐 이 문제에 쓰인 핵심 공식/정리만 따로 요약해줘',
        '📝 다른 풀이 방법(대안 풀이)이나 빠른 풀이 팁이 있어?',
        '🔍 비슷한 조건의 쉬운 예시 하나만 더 보여줘',
      ]
    : [
        '📐 수학 문제 풀이 시 가장 자주 하는 실수와 예방법',
        '📖 영어 빈칸추론 문제 접근하는 3단계 독해법',
        '🔬 과학 탐구 실험 가설 검증 문제 해결 요령',
        '📚 국어 비문학 긴 지문 시간 단축 노하우',
      ];

  return (
    <>
      {/* Floating Bottom-Right Launcher Trigger (above mobile bottom nav) */}
      <div className="fixed bottom-16 right-3 md:bottom-6 md:right-6 z-40 flex flex-col items-end">
        {/* Tooltip speech bubble when closed */}
        {!isOpen && (
          <button
            type="button"
            onClick={onToggle}
            className="mb-2 bg-slate-900/95 text-white text-xs font-semibold px-3.5 py-2 rounded-2xl shadow-xl border border-slate-700/80 flex items-center gap-2 hover:bg-slate-800 transition-all cursor-pointer animate-bounce group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              {activeQuestion
                ? `${activeQuestion.page} ${activeQuestion.questionNumber}번 해설 이해 안 되나요? 질문하기`
                : '해설도 이해 안 될 때? 1:1 AI 과외 선생님에게 질문'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Floating Action Button */}
        <button
          type="button"
          onClick={onToggle}
          aria-label="AI 과외 에이전트 열기"
          className={`relative p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
            isOpen
              ? 'bg-slate-900 text-white ring-4 ring-indigo-500/20 shadow-indigo-500/20 scale-95'
              : 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white hover:shadow-indigo-500/40 hover:scale-105 active:scale-95'
          }`}
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse"></span>
          </div>

          <div className="text-left hidden sm:block pr-1">
            <div className="text-xs font-black tracking-tight leading-none flex items-center gap-1.5">
              <span>AI 과외 에이전트</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-indigo-100 font-bold">
                1:1 튜터
              </span>
            </div>
            <p className="text-[10px] text-indigo-200 font-medium mt-0.5">
              {activeQuestion ? `${activeQuestion.questionNumber}번 질문 대기 중` : '모르는 문제 실시간 질문'}
            </p>
          </div>

          {unreadBadge && !isOpen && (
            <span className="absolute -top-1.5 -left-1.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-[9px] font-bold text-white items-center justify-center">
                !
              </span>
            </span>
          )}
        </button>
      </div>

      {/* Floating Interactive Tutor Window */}
      {isOpen && (
        <div
          className={`fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-50 bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden font-sans transition-all duration-200 animate-in fade-in slide-in-from-bottom-4 ${
            isExpanded
              ? 'w-[95vw] sm:w-[600px] h-[86vh] max-h-[850px]'
              : 'w-[94vw] sm:w-[460px] h-[75vh] max-h-[640px]'
          }`}
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-indigo-600/90 text-white flex items-center justify-center shadow-md shadow-indigo-950 shrink-0">
                <Bot className="w-5 h-5 text-indigo-100" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
                    <span>ScoreCompass AI 과외 튜터</span>
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    온라인
                  </span>
                </div>
                <p className="text-[11px] text-indigo-200 font-medium">
                  {activeQuestion
                    ? `현재 연계: [${subject}] ${activeQuestion.page} ${activeQuestion.questionNumber}번`
                    : '이해될 때까지 끝까지 설명해 드립니다'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="대화 새로고침"
                className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? '작게 보기' : '크게 보기'}
                className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors hidden sm:inline-flex"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={onClose}
                title="닫기"
                className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Question Context Banner (Collapsible) */}
          {activeQuestion && (
            <div className="bg-indigo-50/70 border-b border-indigo-100 px-3.5 py-2 text-xs text-indigo-950">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 truncate">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-black text-[11px] shrink-0">
                    {activeQuestion.page} {activeQuestion.questionNumber}번
                  </span>
                  <span className="font-bold text-slate-900 truncate">
                    {activeQuestion.conceptTag || '문제 풀이 질의'}
                  </span>
                  <span className="text-[11px] text-slate-500 shrink-0">
                    (학생답: {activeQuestion.studentAnswer} / 정답: {activeQuestion.correctAnswer})
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsContextCollapsed(!isContextCollapsed)}
                    className="p-1 text-indigo-700 hover:text-indigo-950 rounded"
                    title={isContextCollapsed ? '문제 본문 펼치기' : '문제 본문 접기'}
                  >
                    {isContextCollapsed ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronUp className="w-3.5 h-3.5" />
                    )}
                  </button>
                  {onClearActiveQuestion && (
                    <button
                      type="button"
                      onClick={onClearActiveQuestion}
                      className="text-[10px] text-slate-500 hover:text-rose-600 ml-1 underline"
                    >
                      해제
                    </button>
                  )}
                </div>
              </div>

              {!isContextCollapsed && (
                <div className="mt-1.5 p-2 rounded-xl bg-white border border-indigo-100/80 text-[11px] space-y-1">
                  <p className="text-slate-800 font-medium line-clamp-2">
                    <strong className="text-indigo-900">문제:</strong> {activeQuestion.questionSnippet}
                  </p>
                  {activeQuestion.explanation && (
                    <p className="text-slate-600 line-clamp-2 border-t border-slate-100 pt-1">
                      <strong className="text-slate-700">기존 해설:</strong> {activeQuestion.explanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-2xs break-keep ${
                      isUser
                        ? 'bg-indigo-600 text-white rounded-br-xs font-medium'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                    }`}
                  >
                    {/* Role Header for Assistant */}
                    {!isUser && (
                      <div className="flex items-center justify-between gap-3 mb-1.5 pb-1.5 border-b border-slate-100 text-[11px] text-slate-400">
                        <span className="font-bold text-indigo-700 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-indigo-500" />
                          과외 선생님 답변
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleSpeak(msg.text, msg.id)}
                            className={`p-1 rounded-md transition-colors ${
                              speakingId === msg.id
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'hover:bg-slate-100 text-slate-500'
                            }`}
                            title="음성으로 듣기 (TTS)"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCopy(msg.text, msg.id)}
                            className="p-1 hover:bg-slate-100 text-slate-500 rounded-md transition-colors"
                            title="답변 복사"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="whitespace-pre-wrap leading-relaxed font-sans">{msg.text}</div>

                    <div
                      className={`text-[10px] mt-1.5 text-right ${
                        isUser ? 'text-indigo-200' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-xs p-3.5 border border-slate-200 text-xs text-slate-600 flex items-center gap-2 shadow-2xs">
                  <RefreshCw className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
                  <span>과외 선생님이 알기 쉬운 맞춤 풀이를 작성하고 있습니다...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Preset Follow-up Chips */}
          <div className="p-2 sm:px-3.5 bg-slate-100/80 border-t border-slate-200/90 overflow-x-auto">
            <div className="flex items-center gap-1.5 no-scrollbar">
              <span className="text-[11px] font-bold text-slate-500 shrink-0 flex items-center gap-1 pl-1">
                <Lightbulb className="w-3 h-3 text-amber-500" />
                빠른 질문:
              </span>
              {presetQuestions.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSendMessage(chip)}
                  className="shrink-0 px-2.5 py-1 rounded-xl bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 text-[11px] font-semibold transition-all shadow-2xs cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <div className="p-3 sm:p-3.5 bg-white border-t border-slate-100 flex items-end gap-2">
            <textarea
              ref={inputRef}
              rows={2}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                activeQuestion
                  ? `${activeQuestion.page} ${activeQuestion.questionNumber}번에서 이해되지 않는 점을 질문하세요... (Enter 전송)`
                  : '이해되지 않는 문제나 개념을 자유롭게 질문하세요... (Enter 전송)'
              }
              className="flex-1 resize-none rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden bg-slate-50/50 leading-relaxed"
            />
            <button
              type="button"
              disabled={!inputValue.trim() || isLoading}
              onClick={() => handleSendMessage()}
              className={`p-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center cursor-pointer ${
                !inputValue.trim() || isLoading
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
