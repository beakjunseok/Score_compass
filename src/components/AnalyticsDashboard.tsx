import React from 'react';
import { GradingResult } from '../types';
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Award,
  BookOpen,
  PieChart,
  Lightbulb,
} from 'lucide-react';

interface AnalyticsDashboardProps {
  result: GradingResult;
  onGoToNotebook: () => void;
  onGoToResults: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  result,
  onGoToNotebook,
  onGoToResults,
}) => {
  const questions = result.questions || [];
  const total = result.totalQuestions || questions.length || 1;
  const correct = result.correctCount || questions.filter((q) => q.status === 'CORRECT').length;
  const incorrect = result.incorrectCount || questions.filter((q) => q.status === 'INCORRECT').length;
  const accuracy = Math.round((correct / total) * 100);

  // Group by page
  const pageStats: Record<string, { total: number; correct: number; incorrect: number }> = {};
  questions.forEach((q) => {
    const page = q.page || '1쪽';
    if (!pageStats[page]) {
      pageStats[page] = { total: 0, correct: 0, incorrect: 0 };
    }
    pageStats[page].total++;
    if (q.status === 'CORRECT') pageStats[page].correct++;
    if (q.status === 'INCORRECT') pageStats[page].incorrect++;
  });

  // Group by question type
  const typeStats: Record<string, { total: number; correct: number }> = {};
  questions.forEach((q) => {
    const type =
      q.questionType === 'SHORT_ANSWER'
        ? '단답형'
        : q.questionType === 'ESSAY'
        ? '서술형'
        : '객관식';
    if (!typeStats[type]) {
      typeStats[type] = { total: 0, correct: 0 };
    }
    typeStats[type].total++;
    if (q.status === 'CORRECT') typeStats[type].correct++;
  });

  // Group by concepts
  const conceptStats: Record<string, { total: number; incorrect: number }> = {};
  questions.forEach((q) => {
    const c = q.conceptTag || '기본 개념';
    if (!conceptStats[c]) {
      conceptStats[c] = { total: 0, incorrect: 0 };
    }
    conceptStats[c].total++;
    if (q.status === 'INCORRECT') conceptStats[c].incorrect++;
  });

  const sortedConcepts = Object.entries(conceptStats)
    .sort((a, b) => b[1].incorrect - a[1].incorrect)
    .filter(([_, data]) => data.incorrect > 0);

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-5 sm:space-y-8 animate-in fade-in-50 duration-300">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">학습 통계 분석</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {result.workbookTitle} ({result.subject}) 채점 데이터 심층 분석
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onGoToResults}
            className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors text-center"
          >
            채점 결과 보기
          </button>
          <button
            onClick={onGoToNotebook}
            className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-colors text-center"
          >
            오답 노트 복습
          </button>
        </div>
      </div>

      {/* Top 4 KPI Cards (Including High School Credit System 40% threshold) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
          <span className="text-[11px] sm:text-xs font-bold text-slate-400 block mb-1">전체 정답률</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-indigo-600">{accuracy}%</span>
            <span className="text-xs font-semibold text-slate-500">
              ({correct}/{total} 문제)
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3 sm:mt-4 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full"
              style={{ width: `${accuracy}%` }}
            ></div>
          </div>
        </div>

        {/* 2022 Revision High School Credit Minimum Achievement (40% criteria) */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-slate-400">최소 성취수준 (40%)</span>
            <span
              className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                accuracy >= 40
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {accuracy >= 40 ? '통과' : '미도달 위험'}
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {accuracy >= 90
                ? 'A (1등급)'
                : accuracy >= 80
                ? 'B (2등급)'
                : accuracy >= 70
                ? 'C (3등급)'
                : accuracy >= 60
                ? 'D (4등급)'
                : accuracy >= 40
                ? 'E (5등급)'
                : '미도달'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            {accuracy >= 40
              ? '✓ 학점 이수 성취수준 충족'
              : '⚠️ 40% 미만 보충 지도 권장'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
          <span className="text-[11px] sm:text-xs font-bold text-slate-400 block mb-1">정답 vs 오답 분포</span>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-emerald-500" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">정답 {correct}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-rose-500" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">오답 {incorrect}</span>
            </div>
          </div>
          <div className="flex h-2 w-full rounded-full overflow-hidden mt-3 sm:mt-4 bg-slate-100">
            <div
              className="bg-emerald-500"
              style={{ width: `${(correct / total) * 100}%` }}
            ></div>
            <div
              className="bg-rose-500"
              style={{ width: `${(incorrect / total) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
          <span className="text-[11px] sm:text-xs font-bold text-slate-400 block mb-1">추천 복습 시간</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl sm:text-4xl font-black text-slate-900">
              {result.learningAnalysis?.recommendedReviewTimeMin || 20}
            </span>
            <span className="text-xs font-semibold text-slate-500">분 권장</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 sm:mt-3 line-clamp-1">
            틀린 {incorrect}문제를 확실히 복습하기에 충분한 시간입니다.
          </p>
        </div>
      </div>

      {/* Page by Page Breakdown */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-black text-slate-900 text-sm sm:text-lg">
          페이지(쪽수)별 정답률 및 오답 분포
        </h3>
        <div className="space-y-3">
          {Object.entries(pageStats).map(([page, stat]) => {
            const pageAcc = Math.round((stat.correct / stat.total) * 100);
            return (
              <div key={page} className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900">{page}</span>
                  <span className="text-xs font-bold text-indigo-700">
                    정답률 {pageAcc}% ({stat.correct}/{stat.total})
                    {stat.incorrect > 0 && (
                      <span className="text-rose-600 ml-2">오답 {stat.incorrect}개</span>
                    )}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full"
                    style={{ width: `${(stat.correct / stat.total) * 100}%` }}
                  ></div>
                  <div
                    className="bg-rose-500 h-full"
                    style={{ width: `${(stat.incorrect / stat.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weak Concept Tag Ranking */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-rose-600">
          <Lightbulb className="w-5 h-5" />
          <h3 className="font-black text-slate-900 text-sm sm:text-lg">
            취약 개념 및 오답 빈도 순위
          </h3>
        </div>

        {sortedConcepts.length === 0 ? (
          <p className="text-xs text-slate-500">모든 개념을 훌륭히 숙지하고 있습니다.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sortedConcepts.map(([concept, data], idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-rose-100 bg-rose-50/40 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-black text-slate-800">{concept}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    해당 유형 {data.total}문제 중 {data.incorrect}문제 오답
                  </p>
                </div>
                <span className="text-xs font-black px-2 py-1 rounded-lg bg-rose-100 text-rose-700">
                  {data.incorrect}회 오답
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
