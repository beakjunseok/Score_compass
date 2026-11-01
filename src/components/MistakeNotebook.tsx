import React, { useState } from 'react';
import { GradingResult, GradingQuestion } from '../types';
import {
  BookOpen,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Printer,
  Edit2,
  Check,
  Lightbulb,
  Award,
  ChevronRight,
  Save,
  HelpCircle,
  Database,
  Bot,
  MessageSquareText,
} from 'lucide-react';
import { DeepExplainModal } from './DeepExplainModal';
import { PublicDataBadgeModal } from './PublicDataBadgeModal';
import { KoreanDictModal } from './KoreanDictModal';
import { BookMarked } from 'lucide-react';

interface MistakeNotebookProps {
  result: GradingResult;
  onUpdateQuestion: (questionId: string, updates: Partial<GradingQuestion>) => void;
  onGoToResults: () => void;
  onOpenTutor?: (question: GradingQuestion, initialQuery?: string) => void;
}

export const MistakeNotebook: React.FC<MistakeNotebookProps> = ({
  result,
  onUpdateQuestion,
  onGoToResults,
  onOpenTutor,
}) => {
  const [tab, setTab] = useState<'list' | 'retest' | 'print'>('list');
  const [selectedQuestionForExplain, setSelectedQuestionForExplain] = useState<GradingQuestion | null>(null);
  const [isPublicDataModalOpen, setIsPublicDataModalOpen] = useState(false);
  const [selectedKeywordForApi, setSelectedKeywordForApi] = useState('');
  const [isDictModalOpen, setIsDictModalOpen] = useState(false);
  const [dictSearchWord, setDictSearchWord] = useState('귀납');

  // Retest state
  const [retestAnswers, setRetestAnswers] = useState<Record<string, string>>({});
  const [retestChecked, setRetestChecked] = useState<Record<string, boolean>>({});
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  const incorrectQuestions = (result.questions || []).filter((q) => q.status === 'INCORRECT');

  const handleRetestSubmit = (q: GradingQuestion) => {
    const ans = retestAnswers[q.id]?.trim() || '';
    if (!ans) return;

    const isMatch =
      ans === q.correctAnswer ||
      ans.replace(/[^0-9a-zA-Z가-힣]/g, '') === q.correctAnswer.replace(/[^0-9a-zA-Z가-힣]/g, '');

    onUpdateQuestion(q.id, {
      retestSolved: true,
      retestAnswer: ans,
      retestIsCorrect: isMatch,
    });

    setRetestChecked((prev) => ({ ...prev, [q.id]: true }));
  };

  const solvedCount = incorrectQuestions.filter((q) => q.retestIsCorrect).length;

  const startEditNote = (q: GradingQuestion) => {
    setEditingNoteId(q.id);
    setNoteText(q.studentNotes || '');
  };

  const saveNote = (q: GradingQuestion) => {
    onUpdateQuestion(q.id, { studentNotes: noteText });
    setEditingNoteId(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-5 sm:space-y-8 animate-in fade-in-50 duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-rose-600 to-indigo-700 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-white text-[11px] sm:text-xs font-bold mb-1.5 sm:mb-2 backdrop-blur-xs">
              <BookOpen className="w-3.5 h-3.5" />
              스마트 오답 노트
            </div>
            <h1 className="text-xl sm:text-3xl font-black tracking-tight">
              {result.workbookTitle} - 틀린 문제 모아보기
            </h1>
            <p className="text-xs sm:text-sm text-rose-100 mt-1">
              틀린 {incorrectQuestions.length}문제를 다시 풀고 오답 원인을 점검하세요.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => window.print()}
              className="flex-1 sm:flex-initial px-3 sm:px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-white/20"
            >
              <Printer className="w-3.5 h-3.5" />
              인쇄하기
            </button>
            <button
              onClick={onGoToResults}
              className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-xl bg-white text-rose-700 hover:bg-rose-50 text-xs font-bold transition-all shadow-xs text-center"
            >
              채점 결과 보기
            </button>
          </div>
        </div>

        {/* Retest Progress Bar */}
        <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-xl bg-white/20">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-rose-100 block">다시 풀기 복습 진도</span>
              <span className="text-sm sm:text-base font-extrabold text-white">
                {solvedCount} / {incorrectQuestions.length} 문제 정복 완료
              </span>
            </div>
          </div>
          <div className="w-full sm:w-64 bg-white/20 rounded-full h-2.5 sm:h-3 overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-500"
              style={{
                width: `${
                  incorrectQuestions.length > 0
                    ? (solvedCount / incorrectQuestions.length) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setTab('list')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
            tab === 'list'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          오답 정리 목록 ({incorrectQuestions.length})
        </button>
        <button
          onClick={() => setTab('retest')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
            tab === 'retest'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>다시 풀기 모드</span>
          {solvedCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[10px]">
              {solvedCount} 해결
            </span>
          )}
        </button>
      </div>

      {/* AI Teacher Advice Card */}
      {result.learningAnalysis && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-indigo-700">
            <Sparkles className="w-4 h-4" />
            <h3 className="font-bold text-sm">AI 학습 처방 및 복습 가이드</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {result.learningAnalysis.teacherAdvice}
          </p>
          {result.learningAnalysis.weakPoints && result.learningAnalysis.weakPoints.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                집중 보완해야 할 취약 유형
              </span>
              <div className="flex flex-wrap gap-1.5">
                {result.learningAnalysis.weakPoints.map((wp, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium"
                  >
                    • {wp}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab Content */}
      {incorrectQuestions.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
          <Award className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">틀린 문제가 없습니다!</h3>
          <p className="text-xs text-slate-500 mt-1">모든 문제를 정확하게 맞혔습니다.</p>
        </div>
      ) : tab === 'list' ? (
        /* List Mode: Detailed mistake summaries */
        <div className="space-y-4">
          {/* Korean Dict Vocabulary Helper Banner - Publication Grade */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-slate-900 text-white shrink-0 mt-0.5">
                  <BookMarked className="w-4 h-4 text-purple-300" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-950 tracking-tight">
                    국립국어원 교과 개념어 사전 연계
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 break-keep mt-0.5">
                    오답의 40%는 교과 개념어 문해력 부족에서 비롯됩니다. 지문 속 어려운 어휘를 클릭하면 공식 표준 뜻풀이가 즉시 제공됩니다.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDictSearchWord('귀납');
                  setIsDictModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto shadow-xs cursor-pointer"
              >
                <BookMarked className="w-4 h-4" />
                <span>개념어 사전 열기</span>
              </button>
            </div>

            {/* Quick concept chips by subject */}
            <div className="flex items-center gap-2 flex-wrap pt-2.5 border-t border-slate-100 text-xs sm:text-sm">
              <span className="text-xs font-bold text-slate-700 shrink-0">
                [{result.subject || '전체'}] 빈출 개념어:
              </span>
              {(result.subject?.includes('수학')
                ? ['판별식', '이차방정식', '인수분해', '기울기', '점근선', '미분계수']
                : result.subject?.includes('국어')
                ? ['연역', '귀납', '복선', '암시', '반어', '역설']
                : result.subject?.includes('과학')
                ? ['항상성', '삼투압', '가속도', '엔트로피', '산화환원', '판구조론']
                : result.subject?.includes('사회')
                ? ['한계효용', '기회비용', '배타적', '비교우위', '국민주권', '헌법소원']
                : result.subject?.includes('한국사')
                ? ['대동법', '골품제', '균역법', '탕평책', '신민회']
                : result.subject?.includes('영어')
                ? ['수동태', '관계대명사', '가정법', '추상명사', '동격']
                : ['연역', '귀납', '항상성', '한계효용', '판별식', '대동법']
              ).map((word) => (
                <button
                  key={word}
                  type="button"
                  onClick={() => {
                    setDictSearchWord(word);
                    setIsDictModalOpen(true);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  #{word}
                </button>
              ))}
            </div>
          </div>

          {incorrectQuestions.map((q) => (
            <article
              key={q.id}
              className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4 transition-all hover:border-slate-300"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                    {q.page} {q.questionNumber}번
                  </span>
                  {q.conceptTag && (
                    <>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs sm:text-sm font-semibold text-indigo-700">
                        {q.conceptTag}
                      </span>
                    </>
                  )}
                  {q.confidence && (
                    <>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-400">
                        인식 신뢰도 {q.confidence}%
                      </span>
                    </>
                  )}
                </div>

                {/* Answers Comparison Badges */}
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium">
                  <div className="flex items-center gap-1.5 text-rose-700">
                    <span className="text-slate-500 font-normal">내가 쓴 오답:</span>
                    <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200/90 font-mono font-bold">
                      {q.studentAnswer || '(빈칸)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-800">
                    <span className="text-slate-500 font-normal">실제 정답:</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200/90 font-mono font-bold">
                      {q.correctAnswer}
                    </span>
                  </div>
                </div>
              </div>

              {/* Problem Snippet - High Legibility */}
              {q.questionSnippet && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-bold text-slate-400 block mb-1">
                    문제 지문
                  </span>
                  <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-normal break-keep">
                    {q.questionSnippet}
                  </p>
                </div>
              )}

              {/* Explanation & Hint Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-amber-50/50 border border-amber-200/70 text-sm sm:text-[15px] text-slate-800 leading-relaxed space-y-2">
                <div className="font-bold text-amber-950 flex items-center gap-1.5 text-sm sm:text-base">
                  <span>오답 원인 분석 및 풀이</span>
                </div>
                <p className="text-slate-800 break-keep font-normal">
                  {q.explanation}
                </p>
                {q.hint && (
                  <div className="pt-2 border-t border-amber-200/50 text-xs sm:text-sm font-medium text-amber-900 flex items-start gap-1.5">
                    <span className="shrink-0 font-bold">💡 풀이 힌트:</span>
                    <span>{q.hint}</span>
                  </div>
                )}
              </div>

              {/* Personal Notes & Action Footer */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  {editingNoteId === q.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="이 문제에 대한 나만의 복습 메모를 적어보세요"
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                      />
                      <button
                        onClick={() => saveNote(q)}
                        className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" /> 저장
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <span className="text-slate-500 font-medium">나의 메모:</span>
                      <span className="font-semibold text-slate-900">
                        {q.studentNotes || '(아직 등록된 메모가 없습니다)'}
                      </span>
                      <button
                        onClick={() => startEditNote(q)}
                        className="text-indigo-600 hover:text-indigo-800 font-bold ml-1 cursor-pointer"
                      >
                        수정
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      const rawTag = q.conceptTag || '개념';
                      const cleanWord = rawTag.split('의')[0].split('과')[0].trim();
                      setDictSearchWord(cleanWord || rawTag);
                      setIsDictModalOpen(true);
                    }}
                    className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs sm:text-sm font-bold flex items-center gap-1.5 border border-purple-200 transition-colors cursor-pointer"
                    title="국립국어원 교과 개념어 사전 검색"
                  >
                    <BookMarked className="w-4 h-4 text-purple-600" />
                    <span>개념어 사전</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedKeywordForApi(q.conceptTag || '교과');
                      setIsPublicDataModalOpen(true);
                    }}
                    className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-1.5 border border-emerald-200 transition-colors cursor-pointer"
                    title="공공데이터포털 REST API 연계 자료 조회"
                  >
                    <Database className="w-4 h-4 text-emerald-600" />
                    <span>공공데이터 자료</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedQuestionForExplain(q)}
                    className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-indigo-200"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>모르는 문제 풀이 &amp; 해설</span>
                  </button>

                  {onOpenTutor && (
                    <button
                      type="button"
                      onClick={() =>
                        onOpenTutor(
                          q,
                          `[오답 노트 ${q.page} ${q.questionNumber}번] 해설을 읽었는데도 여전히 헷갈려요. 더 쉬운 비유와 단계별 풀이로 다시 설명해주세요!`
                        )
                      }
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-indigo-500/20 cursor-pointer"
                      title="이해되지 않을 때 오른쪽 아래 AI 과외 에이전트에게 1:1 질문하기"
                    >
                      <Bot className="w-3.5 h-3.5 text-indigo-300" />
                      <span>해설 질문하기 (AI 에이전트)</span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Retest Mode: User actually solves them again with answers hidden */
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-xs sm:text-sm text-indigo-950 flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              <strong>다시 풀기 복습 모드:</strong> 이전 답과 정답이 숨겨져 있습니다. 다시 풀어 새로운 답을 입력하고 즉시 채점해보세요!
            </span>
          </div>

          <div className="space-y-4">
            {incorrectQuestions.map((q) => {
              const currentInput = retestAnswers[q.id] || '';
              const isChecked = retestChecked[q.id] || q.retestSolved;
              const isCorrect = q.retestIsCorrect;

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all ${
                    isChecked && isCorrect
                      ? 'border-emerald-300 bg-emerald-50/20'
                      : isChecked && !isCorrect
                      ? 'border-rose-300 bg-rose-50/20'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-black">
                      {q.page} {q.questionNumber}번
                    </span>
                    {isChecked && (
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            다시 풀기 성공!
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            다시 풀어도 오답
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-slate-800 mb-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    {q.questionSnippet}
                  </p>

                  {/* Input form */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      value={currentInput}
                      onChange={(e) => {
                        setRetestAnswers((prev) => ({ ...prev, [q.id]: e.target.value }));
                        setRetestChecked((prev) => ({ ...prev, [q.id]: false }));
                      }}
                      placeholder="다시 푼 답을 입력하세요 (예: ③ 또는 12)"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold focus:border-indigo-500 focus:outline-hidden bg-white"
                    />
                    <button
                      type="button"
                      disabled={!currentInput}
                      onClick={() => handleRetestSubmit(q)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 ${
                        !currentInput
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      정답 확인
                    </button>
                  </div>

                  {/* Feedback on check */}
                  {isChecked && (
                    <div className="mt-4 p-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm animate-in fade-in">
                      {isCorrect ? (
                        <p className="text-emerald-700 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          완벽합니다! 개념을 바로잡았습니다. (정답: {q.correctAnswer})
                        </p>
                      ) : (
                        <div>
                          <p className="text-rose-600 font-bold mb-1">
                            아쉽습니다! 정답은 <strong className="underline">{q.correctAnswer}</strong> 입니다.
                          </p>
                          <p className="text-slate-600 text-xs">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AI Deep Explanation Modal */}
      <DeepExplainModal
        isOpen={selectedQuestionForExplain !== null}
        question={selectedQuestionForExplain}
        subject={result.subject}
        onClose={() => setSelectedQuestionForExplain(null)}
        onOpenTutor={(q, text) => {
          setSelectedQuestionForExplain(null);
          onOpenTutor?.(q, text);
        }}
      />

      {/* Public Data REST API Modal */}
      <PublicDataBadgeModal
        isOpen={isPublicDataModalOpen}
        onClose={() => setIsPublicDataModalOpen(false)}
        initialKeyword={selectedKeywordForApi}
      />

      {/* 국립국어원 교과 개념어 사전 Modal */}
      <KoreanDictModal
        isOpen={isDictModalOpen}
        onClose={() => setIsDictModalOpen(false)}
        initialWord={dictSearchWord}
        initialSubject={result.subject}
      />
    </div>
  );
};
