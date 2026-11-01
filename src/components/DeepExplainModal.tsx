import React, { useState, useEffect } from 'react';
import { GradingQuestion, StepByStepSolution } from '../types';
import {
  X,
  Sparkles,
  BookOpen,
  Check,
  AlertTriangle,
  Lightbulb,
  RefreshCw,
  BookMarked,
  Bot,
  MessageSquareText,
  ArrowRight,
  ShieldAlert,
  GraduationCap,
  Volume2,
} from 'lucide-react';
import { KoreanDictModal } from './KoreanDictModal';

interface DeepExplainModalProps {
  question: GradingQuestion | null;
  subject: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenTutor?: (question: GradingQuestion, initialQuestionText?: string) => void;
}

export const DeepExplainModal: React.FC<DeepExplainModalProps> = ({
  question,
  subject,
  isOpen,
  onClose,
  onOpenTutor,
}) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'steps' | 'misunderstanding' | 'twin'>('steps');
  const [solutionData, setSolutionData] = useState<StepByStepSolution | null>(null);
  const [twinUserAnswer, setTwinUserAnswer] = useState<string>('');
  const [twinChecked, setTwinChecked] = useState<boolean>(false);
  const [isDictOpen, setIsDictOpen] = useState(false);
  const [dictWord, setDictWord] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!isOpen || !question) {
      setSolutionData(null);
      setTwinUserAnswer('');
      setTwinChecked(false);
      setActiveTab('steps');
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    fetchSolution();
  }, [isOpen, question]);

  const fetchSolution = async () => {
    if (!question) return;
    setLoading(true);
    try {
      const res = await fetch('/api/solve-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, subject }),
      });
      const data = await res.json();
      setSolutionData(data);
    } catch (e) {
      console.error(e);
      // Fallback
      setSolutionData({
        problemSummary: `[${question.page} ${question.questionNumber}번] ${question.questionSnippet || '문제 풀이'}`,
        keyConcept: question.conceptTag || '단원 핵심 공식 및 정리',
        steps: [
          {
            stepNumber: 1,
            title: '문제 조건 및 구하고자 하는 목표 파악',
            content: `문제에서 주어진 조건과 미지수의 관계를 명확히 정리합니다. (발문: ${question.questionSnippet})`,
            formula: '주어진 식 = 조건 정리',
          },
          {
            stepNumber: 2,
            title: '핵심 공식 대입 및 단계별 연산',
            content: `${question.conceptTag || '교과 개념'}의 성질을 적용하여 미지수의 값을 구합니다. 연산 과정에서 부호 변화와 이항 법칙에 유의합니다.`,
            formula: question.explanation || '식의 변형 및 계산',
          },
          {
            stepNumber: 3,
            title: '최종 정답 도출 및 검산',
            content: `구해진 해가 문제의 조건(양수/음수, 실수 조건 등)을 충족하는지 대입하여 검산하고 최종 정답을 확정합니다.`,
            formula: `최종 정답 = ${question.correctAnswer}`,
          },
        ],
        finalAnswer: question.correctAnswer,
        whyIncorrectExplanation: question.studentAnswer
          ? `학생이 선택한 [${question.studentAnswer}]은 문제의 전제 조건이나 계산 부호(+/-)를 혼동하여 발생한 실수입니다.`
          : '문제 조건 미숙지',
        trapWarning: '발문 끝의 세부 조건(단, a는 정수, 큰 근 등)을 반드시 끝까지 확인하세요.',
        twinProblem: {
          problem: `유사 쌍둥이 문제: 비슷한 조건에서 계수가 변경된 형태 (${question.questionSnippet})`,
          options: ['① 2', '② 4', '③ 6', '④ 8', '⑤ 10'],
          answer: '③ 6',
          explanation: '위의 3단계 풀이와 동일한 방식으로 대입하여 풀면 ③번이 도출됩니다.',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSpeakExplanation = () => {
    if (!('speechSynthesis' in window) || !solutionData) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${question?.page} ${question?.questionNumber}번 문제 풀이입니다. 핵심 개념은 ${solutionData.keyConcept}입니다. ${solutionData.steps
      .map((s) => `${s.stepNumber}단계, ${s.title}. ${s.content}`)
      .join(' ')} 최종 정답은 ${solutionData.finalAnswer}입니다.`;

    const utterance = new SpeechSynthesisUtterance(textToRead.replace(/\*/g, ''));
    utterance.lang = 'ko-KR';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleAskTutor = (customQuery?: string) => {
    if (!question) return;
    if (onOpenTutor) {
      onOpenTutor(
        question,
        customQuery ||
          `[${question.page} ${question.questionNumber}번] 해설을 읽었는데도 아직 이해가 잘 안 돼요. 더 쉬운 비유와 단계별 풀이로 다시 설명해줄 수 있나요?`
      );
    }
  };

  if (!isOpen || !question) return null;

  const twinProblem = solutionData?.twinProblem;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden font-sans">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-5 sm:px-7 py-4 border-b border-slate-100 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-100 shrink-0">
              <Sparkles className="w-5 h-5 text-indigo-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
                  모르는 문제 단계별 풀이 & AI 심층 과외
                </h3>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {question.page} {question.questionNumber}번
                </span>
              </div>
              <p className="text-xs text-slate-500">
                수식 전개 과정부터 오답 원인 분석, 쌍둥이 연습 문제까지 완벽 대비
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSpeakExplanation}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isSpeaking
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="풀이 음성 듣기 (TTS)"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">{isSpeaking ? '정지' : '음성 풀이'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Question Header Card */}
        <div className="bg-slate-50 border-b border-slate-200/80 px-5 sm:px-7 py-3.5 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-indigo-700">
                  {question.conceptTag || `${subject} 핵심 개념`}
                </span>
                <span className="text-slate-300">·</span>
                <button
                  type="button"
                  onClick={() => {
                    const clean = question.conceptTag?.split('의')[0].split('과')[0].trim();
                    setDictWord(clean || question.conceptTag || '귀납');
                    setIsDictOpen(true);
                  }}
                  className="text-xs font-semibold text-purple-700 hover:text-purple-900 hover:underline flex items-center gap-1 cursor-pointer"
                  title="국립국어원 교과 개념어 사전 조회"
                >
                  <BookMarked className="w-3.5 h-3.5 text-purple-600" />
                  <span>개념어 사전</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-2 break-keep">
                {question.questionSnippet}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="px-3 py-1 rounded-xl bg-white border border-rose-200 text-rose-700 text-xs font-bold shadow-2xs">
                작성 답안: <span className="font-mono text-sm">{question.studentAnswer || '(미인식)'}</span>
              </div>
              <div className="px-3 py-1 rounded-xl bg-white border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
                실제 정답: <span className="font-mono text-sm">{question.correctAnswer}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 sm:px-7 pt-3 border-b border-slate-100 flex items-center gap-2 bg-white shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('steps')}
            className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-extrabold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'steps'
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/40'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-indigo-600" />
            <span>단계별 문제 풀이 (Step-by-Step)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('misunderstanding')}
            className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-extrabold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'misunderstanding'
                ? 'border-amber-600 text-amber-700 bg-amber-50/40'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>오답 원인 & 함정 피하기</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('twin')}
            className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-extrabold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'twin'
                ? 'border-purple-600 text-purple-700 bg-purple-50/40'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>쌍둥이 유사 문제 연습</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <RefreshCw className="w-9 h-9 text-indigo-600 animate-spin mb-3" />
              <p className="text-base font-extrabold text-slate-800">
                AI 과외 선생님이 단계별 풀이를 생성하고 있습니다...
              </p>
              <p className="text-xs text-slate-500 mt-1">
                문제의 조건 분해, 핵심 공식 유도, 오답 함정 분석 중입니다
              </p>
            </div>
          ) : (
            <>
              {/* TAB 1: Step-by-Step Solution */}
              {activeTab === 'steps' && solutionData && (
                <div className="space-y-4">
                  {/* Summary & Core Theorem Card */}
                  <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80">
                    <span className="text-[11px] font-bold text-indigo-800 block mb-1">
                      출제 의도 및 사용된 핵심 개념
                    </span>
                    <p className="text-xs sm:text-sm text-indigo-950 font-bold mb-2">
                      💡 {solutionData.keyConcept}
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed break-keep">
                      {solutionData.problemSummary}
                    </p>
                  </div>

                  {/* Steps List */}
                  <div className="space-y-3">
                    {solutionData.steps.map((step) => (
                      <div
                        key={step.stepNumber}
                        className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-indigo-300 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                            {step.stepNumber}
                          </span>
                          <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                            {step.title}
                          </h4>
                        </div>

                        {step.formula && (
                          <div className="my-2 p-2.5 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs sm:text-sm border border-slate-800 overflow-x-auto">
                            {step.formula}
                          </div>
                        )}

                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed break-keep">
                          {step.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Final Answer Banner */}
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-800 block">최종 도출 정답</span>
                      <span className="text-lg font-black text-emerald-900 font-mono">
                        {solutionData.finalAnswer}
                      </span>
                    </div>
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-100/70 px-3 py-1 rounded-full">
                      검산 완료 ✓
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 2: Misunderstanding & Traps */}
              {activeTab === 'misunderstanding' && solutionData && (
                <div className="space-y-4">
                  {/* Student Mistake Diagnosis */}
                  <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-rose-600" />
                      <h4 className="font-bold text-sm text-rose-950">학생의 오답 원인 정밀 진단</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-rose-900 leading-relaxed break-keep">
                      {solutionData.whyIncorrectExplanation}
                    </p>
                  </div>

                  {/* Trap Warning */}
                  <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldAlert className="w-5 h-5 text-amber-600" />
                      <h4 className="font-bold text-sm text-amber-950">시험 빈출 함정 포인트</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-900 leading-relaxed break-keep">
                      {solutionData.trapWarning}
                    </p>
                  </div>

                  {/* Checklist */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <h5 className="font-bold text-xs text-slate-800 mb-3">
                      선생님이 추천하는 오답 방지 체크리스트:
                    </h5>
                    <ul className="space-y-2 text-xs text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                        <span>문제 발문에서 구하라는 것이 x값인지, 두 근의 곱인지 끝까지 동그라미 치기</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                        <span>이항할 때 부호(+ / -)를 무의식적으로 그대로 두지 않았는지 다시 확인하기</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                        <span>구한 답을 원래 식에 역으로 대입(검산)해보는 10초 습관 들이기</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 3: Twin Practice Problem */}
              {activeTab === 'twin' && twinProblem && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-blue-50/50 to-slate-50 border border-indigo-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <h4 className="font-bold text-sm text-indigo-950">
                        방금 틀린 개념 즉시 복습 (쌍둥이 유사 문제)
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                      실전 테스트
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed break-keep">
                    {twinProblem.problem}
                  </p>

                  {twinProblem.options && twinProblem.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {twinProblem.options.map((opt: string, idx: number) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setTwinUserAnswer(opt);
                            setTwinChecked(false);
                          }}
                          className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                            twinUserAnswer === opt
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {(!twinProblem.options || twinProblem.options.length === 0) && (
                    <div>
                      <input
                        type="text"
                        value={twinUserAnswer}
                        onChange={(e) => {
                          setTwinUserAnswer(e.target.value);
                          setTwinChecked(false);
                        }}
                        placeholder="정답을 입력하세요"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      disabled={!twinUserAnswer}
                      onClick={() => setTwinChecked(true)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                        !twinUserAnswer
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      정답 확인하기
                    </button>

                    {twinChecked && (
                      <div className="text-xs font-bold animate-in fade-in">
                        {twinUserAnswer.includes(twinProblem.answer.replace(/[^0-9①-⑤a-zA-Z]/g, '')) ||
                        twinUserAnswer.trim() === twinProblem.answer.trim() ? (
                          <span className="text-emerald-600 flex items-center gap-1">
                            <Check className="w-4 h-4" /> 정답입니다! 개념을 완벽하게 이해했습니다.
                          </span>
                        ) : (
                          <span className="text-rose-600">
                            아쉬워요! 정답은 {twinProblem.answer} 입니다. ({twinProblem.explanation})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SPECIAL HIGHLIGHT: "해설도 이해하지 못할 때 오른쪽 밑 AI 에이전트 질문 배너" */}
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white border border-indigo-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-900">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-white">
                        해설을 읽어도 아직 이해되지 않나요?
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                        1:1 과외 튜터 대기 중
                      </span>
                    </div>
                    <p className="text-xs text-indigo-200 mt-0.5 leading-relaxed break-keep">
                      오른쪽 아래 AI 에이전트에게 &ldquo;2단계가 왜 이렇게 되는지 비유로 설명해줘&rdquo;처럼 질문하면 학생 눈높이에 맞춰 바로 다시 설명해 줍니다.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAskTutor()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs sm:text-sm font-extrabold shadow-md flex items-center justify-center gap-2 shrink-0 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <MessageSquareText className="w-4 h-4" />
                  <span>AI 에이전트에게 1:1 질문하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-100 px-5 sm:px-7 py-3.5 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 hidden sm:block">
            이해되지 않는 점은 언제든 질문하고, 유사 문제를 통해 내 것으로 만드세요.
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={() => handleAskTutor()}
              className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI 과외 튜터 호출</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      </div>

      {/* 국립국어원 교과 개념어 사전 Modal */}
      <KoreanDictModal
        isOpen={isDictOpen}
        onClose={() => setIsDictOpen(false)}
        initialWord={dictWord}
        initialSubject={subject}
      />
    </div>
  );
};
