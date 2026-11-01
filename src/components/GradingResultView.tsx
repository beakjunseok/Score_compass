import React, { useState } from 'react';
import { GradingResult, GradingQuestion, QuestionStatus } from '../types';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Edit3,
  Sparkles,
  BookOpen,
  Filter,
  ArrowRight,
  ExternalLink,
  Save,
  Check,
  RotateCcw,
  Layers,
  ChevronRight,
  Share2,
  Printer,
  Landmark,
  Database,
  Cpu,
  GraduationCap,
  BookMarked,
  Bot,
  MessageSquareText,
  HelpCircle,
} from 'lucide-react';
import { DeepExplainModal } from './DeepExplainModal';
import { PublicDataBadgeModal } from './PublicDataBadgeModal';
import { KoreanDictModal } from './KoreanDictModal';

interface GradingResultViewProps {
  result: GradingResult;
  onUpdateQuestion: (questionId: string, updates: Partial<GradingQuestion>) => void;
  onGoToNotebook: () => void;
  onGoToUpload: () => void;
  onOpenTutor?: (question: GradingQuestion, initialQuery?: string) => void;
}

export const GradingResultView: React.FC<GradingResultViewProps> = ({
  result,
  onUpdateQuestion,
  onGoToNotebook,
  onGoToUpload,
  onOpenTutor,
}) => {
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'uncertain' | 'correct'>('incorrect');
  const [selectedPage, setSelectedPage] = useState<string>('all');
  const [selectedQuestionForExplain, setSelectedQuestionForExplain] = useState<GradingQuestion | null>(null);
  const [isPublicDataModalOpen, setIsPublicDataModalOpen] = useState(false);
  const [selectedKeywordForApi, setSelectedKeywordForApi] = useState<string>('');
  const [isDictModalOpen, setIsDictModalOpen] = useState<boolean>(false);
  const [dictSearchWord, setDictSearchWord] = useState<string>('귀납');
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [tempStudentAnswer, setTempStudentAnswer] = useState<string>('');
  const [tempCorrectAnswer, setTempCorrectAnswer] = useState<string>('');
  const [tempNotes, setTempNotes] = useState<string>('');

  const questions = result.questions || [];
  const incorrectQuestions = questions.filter((q) => q.status === 'INCORRECT');
  const correctQuestions = questions.filter((q) => q.status === 'CORRECT');
  const uncertainQuestions = questions.filter((q) => q.status === 'UNCERTAIN');

  // Filtered questions
  const filteredQuestions = questions.filter((q) => {
    if (filter === 'incorrect' && q.status !== 'INCORRECT') return false;
    if (filter === 'correct' && q.status !== 'CORRECT') return false;
    if (filter === 'uncertain' && q.status !== 'UNCERTAIN') return false;
    if (selectedPage !== 'all' && q.page !== selectedPage) return false;
    return true;
  });

  const uniquePages = Array.from(new Set(questions.map((q) => q.page))).sort();

  const startEdit = (q: GradingQuestion) => {
    setEditingQuestionId(q.id);
    setTempStudentAnswer(q.studentAnswer);
    setTempCorrectAnswer(q.correctAnswer);
    setTempNotes(q.studentNotes || '');
  };

  const saveEdit = (q: GradingQuestion) => {
    // If student answer matches correct answer, mark as CORRECT
    const newStudentAns = tempStudentAnswer.trim();
    const newCorrectAns = tempCorrectAnswer.trim();
    const isNowCorrect =
      newStudentAns === newCorrectAns ||
      newStudentAns.replace(/[^0-9a-zA-Z가-힣]/g, '') === newCorrectAns.replace(/[^0-9a-zA-Z가-힣]/g, '');

    onUpdateQuestion(q.id, {
      studentAnswer: newStudentAns,
      correctAnswer: newCorrectAns,
      studentNotes: tempNotes,
      status: isNowCorrect ? 'CORRECT' : 'INCORRECT',
      isManuallyEdited: true,
    });
    setEditingQuestionId(null);
  };

  const toggleStatusManually = (q: GradingQuestion) => {
    const nextStatus: QuestionStatus =
      q.status === 'CORRECT' ? 'INCORRECT' : q.status === 'INCORRECT' ? 'UNCERTAIN' : 'CORRECT';
    onUpdateQuestion(q.id, {
      status: nextStatus,
      isManuallyEdited: true,
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-5 sm:space-y-8 animate-in fade-in-50 duration-300">
      {/* Top Main Scorecard */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-100/40 via-blue-50/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] sm:text-xs font-bold">
                {result.subject || '수학'}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400">
                {new Date(result.createdAt).toLocaleDateString('ko-KR', {
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {result.workbookTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              AI가 문제집 사진을 바탕으로 자동 채점 및 오답 분석을 완료했습니다.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setIsPublicDataModalOpen(true)}
              className="flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-bold border border-indigo-200 transition-colors"
              title="에듀넷 평가문항 · 교과주제 학습자료 · 국가성취기준 연계 안내"
            >
              <Landmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
              <span>공공데이터 4대 포털 연계</span>
            </button>
            <button
              onClick={onGoToNotebook}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-200 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>오답 노트 복습</span>
            </button>
            <button
              onClick={onGoToUpload}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>다른 사진 채점</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-6 pt-5 border-t border-slate-100">
          {/* Total */}
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 block">총 문제 수</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl sm:text-3xl font-extrabold text-slate-900">
                {result.totalQuestions}
              </span>
              <span className="text-xs font-semibold text-slate-500">문제</span>
            </div>
          </div>

          {/* Correct */}
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold text-emerald-800">정답</span>
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl sm:text-3xl font-extrabold text-emerald-700">
                {result.correctCount}
              </span>
              <span className="text-xs font-semibold text-emerald-600">문제</span>
            </div>
          </div>

          {/* Incorrect */}
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-rose-50/70 border border-rose-200/80">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold text-rose-800">오답 (틀린 문제)</span>
              <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600" />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl sm:text-3xl font-extrabold text-rose-600">
                {result.incorrectCount}
              </span>
              <span className="text-xs font-semibold text-rose-500">문제</span>
            </div>
          </div>

          {/* Accuracy Rate */}
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-indigo-50/70 border border-indigo-200/80">
            <span className="text-[11px] sm:text-xs font-bold text-indigo-800 block">정답률</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl sm:text-3xl font-extrabold text-indigo-700">
                {Math.round(result.accuracyRate)}%
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-indigo-600">
                ({result.correctCount}/{result.totalQuestions})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SIGNATURE RESULT BOX: 채점 결과 & 틀린 문제 한눈에 보기 */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white border-2 border-indigo-500/60 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs">
              AI 채점
            </span>
            <h2 className="text-base sm:text-xl font-black text-white tracking-tight">
              채점 결과 요약표
            </h2>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/80">
              정답률 {Math.round(result.accuracyRate * 10) / 10}%
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {result.totalQuestions}문제 중 {result.correctCount}문제 정답 (오답 {result.incorrectCount}문제)
          </span>
        </div>

        {/* The Exact Card Representation Requested */}
        <div className="bg-slate-950/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 space-y-3 font-sans">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-extrabold text-slate-200">
              {result.totalQuestions}문제 중 {result.correctCount}문제 정답
            </span>
            <span className="text-xs sm:text-base font-black text-emerald-400">
              정답률 {Math.round(result.accuracyRate * 10) / 10}%
            </span>
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-[11px] font-bold text-rose-300 block mb-2">
              틀린 문제 (터치 시 해당 문제 카드로 즉시 스크롤):
            </span>
            {incorrectQuestions.length === 0 ? (
              <span className="text-xs text-emerald-400 font-bold">🎉 모든 문제를 맞혔습니다!</span>
            ) : (
              <div className="flex flex-wrap gap-2">
                {incorrectQuestions.map((q) => {
                  const label = `${q.page} ${q.questionNumber}번`;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        setFilter('all');
                        setSelectedPage(q.page);
                        const el = document.getElementById(`question-card-${q.id}`);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          el.classList.add('ring-4', 'ring-rose-500');
                          setTimeout(() => el.classList.remove('ring-4', 'ring-rose-500'), 2500);
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-600 text-rose-200 hover:text-white border border-rose-700 hover:border-rose-500 text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 shadow-xs cursor-pointer group"
                    >
                      <span className="text-rose-400 group-hover:text-white">❌</span>
                      <span>{label}</span>
                      {q.conceptTag && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-900/80 text-rose-300 font-normal">
                          {q.conceptTag}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Public Data Link Banner: 관련 학습자료 추천 */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-900/80 via-blue-900/60 to-purple-900/80 border border-indigo-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-500 text-white flex items-center justify-center shrink-0">
              <Landmark className="w-3.5 h-3.5" />
            </span>
            <div>
              <span className="text-xs sm:text-sm font-extrabold text-indigo-100 block">
                공공데이터 3대 연계: 관련 학습자료 & 성취기준 분석 완료
              </span>
              <span className="text-[11px] text-indigo-300">
                ① 에듀넷 형성평가 문항 • ② 전국 교과주제별 표준데이터 Open API • ③ 국가교육과정 성취기준
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsPublicDataModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-900 font-black text-xs transition-colors shrink-0 flex items-center justify-center gap-1 shadow-xs"
          >
            <span>연계 데이터 명세 확인</span>
            <ExternalLink className="w-3 h-3 text-indigo-600" />
          </button>
        </div>
      </div>

      {/* Filter Tabs & Page Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            전체 ({questions.length})
          </button>
          <button
            onClick={() => setFilter('incorrect')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
              filter === 'incorrect'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
            }`}
          >
            <span>틀린 문제만</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/30 text-[10px]">
              {incorrectQuestions.length}
            </span>
          </button>
          {uncertainQuestions.length > 0 && (
            <button
              onClick={() => setFilter('uncertain')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                filter === 'uncertain'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200'
              }`}
            >
              <span>확인 필요</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/30 text-[10px]">
                {uncertainQuestions.length}
              </span>
            </button>
          )}
          <button
            onClick={() => setFilter('correct')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filter === 'correct'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}
          >
            맞은 문제 ({correctQuestions.length})
          </button>

          <button
            onClick={() => {
              setDictSearchWord('귀납');
              setIsDictModalOpen(true);
            }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 flex items-center gap-1.5 cursor-pointer ml-auto sm:ml-0"
            title="국립국어원 교과 개념어 사전 검색"
          >
            <BookMarked className="w-3.5 h-3.5 text-purple-600" />
            <span>개념어 사전</span>
          </button>
        </div>

        {/* Page filter dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">페이지:</span>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700 focus:border-indigo-500 focus:outline-hidden"
          >
            <option value="all">전체 쪽수 ({uniquePages.length}개 페이지)</option>
            {uniquePages.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notice about OCR adjustment */}
      <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-2.5 text-xs text-blue-900">
        <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-bold">채점 오류 방지 알림:</strong> 필기가 흐리거나 AI가 손글씨를 잘못 인식한 경우, 각 문제 카드의{' '}
          <strong className="underline">"답안 직접 수정"</strong> 버튼을 눌러 학생 답이나 정답을 즉시 수정할 수 있습니다. 수정 시 정답 여부와 점수가 실시간 재계산됩니다.
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-bold text-slate-500">선택한 조건의 문제가 없습니다.</p>
            <button
              onClick={() => {
                setFilter('all');
                setSelectedPage('all');
              }}
              className="mt-3 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors"
            >
              전체 문제 보기
            </button>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isEditing = editingQuestionId === q.id;
            const isIncorrect = q.status === 'INCORRECT';
            const isUncertain = q.status === 'UNCERTAIN';

            return (
              <div
                key={q.id}
                id={`question-card-${q.id}`}
                className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-200 ${
                  isIncorrect
                    ? 'border-rose-200 shadow-xs hover:border-rose-300'
                    : isUncertain
                    ? 'border-amber-200 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header row: Page & Number + Status */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100 flex-wrap gap-2.5">
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <span className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                      {q.page} {q.questionNumber}번 문제
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs sm:text-sm font-medium text-slate-600">
                      {q.questionType === 'SHORT_ANSWER'
                        ? '단답형'
                        : q.questionType === 'ESSAY'
                        ? '서술형'
                        : '객관식'}
                    </span>
                    {q.conceptTag && (
                      <>
                        <span className="text-slate-300">·</span>
                        <button
                          type="button"
                          onClick={() => {
                            const clean = q.conceptTag?.split('의')[0].split('과')[0].trim();
                            setDictSearchWord(clean || q.conceptTag || '개념');
                            setIsDictModalOpen(true);
                          }}
                          className="text-xs sm:text-sm font-semibold text-purple-800 hover:text-purple-950 hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                          title="국립국어원 사전에서 뜻풀이 보기"
                        >
                          <BookMarked className="w-3.5 h-3.5 text-purple-600" />
                          <span>{q.conceptTag}</span>
                        </button>
                      </>
                    )}
                    {q.isManuallyEdited && (
                      <>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs font-semibold text-amber-700">
                          (수기 보정됨)
                        </span>
                      </>
                    )}
                  </div>

                  {/* Status badge & toggle */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => toggleStatusManually(q)}
                      title="클릭하여 정답/오답 상태 수동 전환"
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isIncorrect
                          ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                          : isUncertain
                          ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      {isIncorrect ? (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>오답</span>
                        </>
                      ) : isUncertain ? (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                          <span>확인 필요</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>정답</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Problem Snippet */}
                {q.questionSnippet && (
                  <div className="mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-400 block mb-1">
                      인식된 문제 지문
                    </span>
                    <p className="text-sm sm:text-base text-slate-900 font-normal leading-relaxed break-keep">
                      {q.questionSnippet}
                    </p>
                  </div>
                )}

                {/* Answers Comparison Row */}
                {!isEditing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {/* Student Answer */}
                    <div
                      className={`p-4 rounded-xl border flex items-center justify-between ${
                        isIncorrect
                          ? 'bg-rose-50/50 border-rose-200'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-medium text-slate-500 block">
                          학생의 답안 (손글씨 인식)
                        </span>
                        <span
                          className={`text-lg sm:text-xl font-black mt-0.5 block ${
                            isIncorrect ? 'text-rose-600' : 'text-slate-900'
                          }`}
                        >
                          {q.studentAnswer || '(미인식/빈칸)'}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        신뢰도 {q.confidence}%
                      </span>
                    </div>

                    {/* Correct Answer */}
                    <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-medium text-emerald-800 block">
                          실제 문제 정답
                        </span>
                        <span className="text-lg sm:text-xl font-black text-emerald-800 mt-0.5 block font-mono">
                          {q.correctAnswer}
                        </span>
                      </div>
                      <button
                        onClick={() => startEdit(q)}
                        className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-indigo-200/80 hover:bg-indigo-50 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        답안 직접 수정
                      </button>
                    </div>
                  </div>
                ) : (
                  /* In-place Editing Form */
                  <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200 mb-4 space-y-3">
                    <p className="text-xs font-bold text-indigo-900">
                      답안 직접 수정 (손글씨 오인식 보정)
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          학생이 작성한 실제 답
                        </label>
                        <input
                          type="text"
                          value={tempStudentAnswer}
                          onChange={(e) => setTempStudentAnswer(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-bold bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          해당 문제 정답
                        </label>
                        <input
                          type="text"
                          value={tempCorrectAnswer}
                          onChange={(e) => setTempCorrectAnswer(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-bold bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        오답 메모 (선택)
                      </label>
                      <input
                        type="text"
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                        placeholder="예: 2번 계산 중 부호 실수함, 다시 풀 것"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setEditingQuestionId(null)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200"
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        onClick={() => saveEdit(q)}
                        className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" />
                        수정 완료 및 재채점
                      </button>
                    </div>
                  </div>
                )}

                {/* Explanation & Hint */}
                {q.explanation && (
                  <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/70 text-sm sm:text-[15px] text-slate-800 mb-3.5 leading-relaxed break-keep">
                    <span className="font-bold text-slate-950 block mb-1">
                      {isIncorrect ? '오답 원인 분석 및 풀이' : '정답 풀이 해설'}
                    </span>
                    <p className="text-slate-800 font-normal leading-relaxed">{q.explanation}</p>
                    {q.hint && (
                      <p className="text-indigo-700 font-medium text-xs sm:text-sm mt-2 pt-2 border-t border-slate-200/60 break-keep">
                        💡 풀이 팁: {q.hint}
                      </p>
                    )}
                  </div>
                )}

                {/* 공공데이터 연계 맞춤 처방 박스 (일반 교육과정 3대 + NCS 직업교육) */}
                {(q.achievementStandard || q.publicTopicData || q.edunetResource || q.ncsVocationalData) && (
                  <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/90 mb-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 break-keep">
                        <Landmark className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>공공데이터 연계 처방 (에듀넷 · 교과자료 · 국가성취기준 · NCS직업)</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsPublicDataModalOpen(true)}
                        className="text-[10px] text-indigo-600 font-semibold hover:underline shrink-0"
                      >
                        연계 기준 안내
                      </button>
                    </div>

                    {/* 4순위: 한국산업인력공단 NCS 고교직업교육과정 정보 서비스 */}
                    {q.ncsVocationalData && (
                      <div className="text-xs bg-white p-2.5 rounded-lg border border-purple-200 shadow-2xs space-y-1">
                        <div className="flex items-center justify-between mb-1 gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1 shrink-0">
                              <Cpu className="w-3 h-3" />
                              4순위 NCS 직업교육
                            </span>
                            <span className="font-bold text-purple-950 break-keep">
                              {q.ncsVocationalData.subjectGroup} &gt; {q.ncsVocationalData.subjectName}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-purple-700 font-bold bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200 shrink-0">
                            단위코드: {q.ncsVocationalData.competencyUnitCode}
                          </span>
                        </div>
                        <p className="text-slate-800 text-xs font-bold break-keep">
                          직무능력단위: {q.ncsVocationalData.competencyUnitName}
                        </p>
                        {q.ncsVocationalData.learningGoal && (
                          <p className="text-slate-600 text-[11px] leading-relaxed break-keep">
                            평가 기준: {q.ncsVocationalData.learningGoal}
                          </p>
                        )}
                      </div>
                    )}

                    {/* 3순위: 국가교육과정 성취기준 (NCIC) */}
                    {q.achievementStandard && (
                      <div className="text-xs bg-white p-2.5 rounded-lg border border-slate-200/80 space-y-1">
                        <div className="flex items-center justify-between mb-1 gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                              3순위 성취기준
                            </span>
                            <span className="font-mono font-bold text-purple-900">
                              {q.achievementStandard.code}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              ({q.achievementStandard.domain})
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {q.achievementStandard.grade}
                          </span>
                        </div>
                        <p className="text-slate-700 text-xs font-medium leading-relaxed break-keep">
                          {q.achievementStandard.standardText}
                        </p>
                      </div>
                    )}

                    {/* 2순위: 전국 초중등 교과주제별 학습자료 표준데이터 */}
                    {q.publicTopicData && (
                      <div className="text-xs bg-white p-2.5 rounded-lg border border-slate-200/80 space-y-1">
                        <div className="flex items-center justify-between mb-1 gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                              2순위 교과주제 자료
                            </span>
                            <span className="font-bold text-blue-900 truncate max-w-[260px] sm:max-w-md break-keep">
                              {q.publicTopicData.chapterTitle}
                            </span>
                          </div>
                          <span className="text-[10px] font-semibold text-slate-500 shrink-0">
                            {q.publicTopicData.pageRange}
                          </span>
                        </div>
                        <p className="text-slate-600 text-xs break-keep">{q.publicTopicData.resourceTitle}</p>
                        {q.publicTopicData.keywords && q.publicTopicData.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {q.publicTopicData.keywords.map((kw, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded"
                              >
                                #{kw}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* 1순위: 교육부 에듀넷 학습·평가자료 */}
                    {q.edunetResource && (
                      <div className="text-xs bg-white p-2.5 rounded-lg border border-slate-200/80 space-y-1">
                        <div className="flex items-center justify-between mb-1 gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                              1순위 에듀넷 평가자료
                            </span>
                            <span className="font-bold text-emerald-950 truncate max-w-[260px] sm:max-w-md break-keep">
                              {q.edunetResource.title}
                            </span>
                          </div>
                          <a
                            href={q.edunetResource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center gap-0.5 shrink-0"
                          >
                            <span>에듀넷 자료</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <p className="text-slate-600 text-xs mb-1.5 leading-relaxed break-keep">
                          학습목표: {q.edunetResource.learningGoal}
                        </p>
                        {q.edunetResource.evalQuestionSnippet && (
                          <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 text-[11px] text-emerald-950 font-medium leading-relaxed break-keep">
                            <span className="font-bold text-emerald-800 block mb-0.5">
                              에듀넷 추천 형성평가:
                            </span>
                            {q.edunetResource.evalQuestionSnippet}
                            {q.edunetResource.evalAnswer && (
                              <span className="text-slate-600 block mt-1">
                                {q.edunetResource.evalAnswer}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Live Open API Query Trigger Button */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-200/70">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>공공데이터포털 REST API 연계 (전국초중등교과주제별학습자료)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedKeywordForApi(q.conceptTag || '함수');
                          setIsPublicDataModalOpen(true);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 text-xs font-bold transition-all shadow-2xs group cursor-pointer"
                      >
                        <Database className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white" />
                        <span>공공데이터 API 실시간 원문 조회</span>
                        <ArrowRight className="w-3 h-3 text-indigo-500 group-hover:text-white" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 flex-wrap gap-2.5">
                  <div className="text-xs text-slate-500">
                    {q.studentNotes ? (
                      <span className="text-amber-900 font-semibold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                        나의 메모: {q.studentNotes}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-normal">
                        추가 메모 없음
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        const clean = q.conceptTag?.split('의')[0].split('과')[0].trim();
                        setDictSearchWord(clean || q.conceptTag || '귀납');
                        setIsDictModalOpen(true);
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs sm:text-sm font-bold border border-purple-200 transition-colors cursor-pointer"
                      title="국립국어원 교과 개념어 사전 검색"
                    >
                      <BookMarked className="w-4 h-4 text-purple-600" />
                      <span>개념어 사전</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedQuestionForExplain(q)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs sm:text-sm font-bold transition-colors cursor-pointer border border-indigo-200"
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
                            `[${q.page} ${q.questionNumber}번] 해설이 잘 이해되지 않아요! 더 쉬운 비유와 단계별 풀이로 다시 설명해주세요.`
                          )
                        }
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all shadow-2xs hover:shadow-indigo-500/20 cursor-pointer"
                        title="이해되지 않을 때 오른쪽 아래 AI 과외 에이전트에게 1:1 질문하기"
                      >
                        <Bot className="w-3.5 h-3.5 text-indigo-300" />
                        <span>해설 질문하기 (AI 에이전트)</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

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

      {/* Public Data Badge & Live API Explorer Modal */}
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
