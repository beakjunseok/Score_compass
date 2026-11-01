import React from 'react';
import {
  Camera,
  CheckCircle2,
  BookOpen,
  Sparkles,
  ArrowRight,
  Scan,
  CheckSquare,
  FileText,
  Clock,
  Award,
  Layers,
  ChevronRight,
  TrendingUp,
  Landmark,
  Database,
  ArrowDown,
  XCircle,
  ExternalLink,
} from 'lucide-react';
import { PresetSample, GradingResult } from '../types';

interface DashboardHomeProps {
  onGoToUpload: () => void;
  presets: PresetSample[];
  onSelectPreset: (preset: PresetSample) => void;
  activeResult: GradingResult | null;
  onGoToResult: () => void;
  recentResults: GradingResult[];
  onSelectSavedResult: (res: GradingResult) => void;
  onOpenPublicDataModal?: () => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  onGoToUpload,
  presets,
  onSelectPreset,
  activeResult,
  onGoToResult,
  recentResults,
  onSelectSavedResult,
  onOpenPublicDataModal,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-5 sm:py-8 space-y-8 sm:space-y-12 animate-in fade-in-50 duration-300">
      {/* Hero Section */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white p-5 sm:p-10 lg:p-12 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-200 text-[11px] sm:text-xs font-bold mb-3 sm:mb-4">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-300" />
            <span>ScoreCompass: AI 기반 자동 채점 및 오답 분석</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-snug sm:leading-[1.25] break-keep">
            사진 찍어 올리면 3초 만에,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-200">
              몇 쪽 몇 번 틀렸는지
            </span> 바로 알려줍니다.
          </h1>

          <p className="mt-3 sm:mt-4 text-slate-200 text-xs sm:text-sm lg:text-base leading-relaxed break-keep font-normal">
            문제집과 답안지를 사진으로 업로드하면 AI OCR이 페이지 쪽수, 문제 번호, 손글씨 필기를 정밀 분석하여 자동으로 채점하고 틀린 문제 번호와 오답 노트를 체계적으로 정리해드립니다.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <button
              onClick={onGoToUpload}
              className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs sm:text-base shadow-lg shadow-cyan-500/30 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>사진 업로드하고 채점하기</span>
            </button>

            {activeResult && (
              <button
                onClick={onGoToResult}
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-base backdrop-blur-xs transition-colors flex items-center justify-center gap-2 border border-white/20"
              >
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                <span>채점 결과 보기 ({activeResult.totalQuestions}문제)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4 Step Workflow */}
      <div className="space-y-4">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">
            서비스 작동 방식
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            채점에 쏟던 30분을 10초로 줄여드립니다
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-indigo-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">사진 촬영 및 업로드</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              문제를 푼 문제집과 정답지를 스마트폰 또는 웹 카메라로 촬영하여 업로드합니다.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-indigo-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">AI OCR 정밀 분석</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              페이지 쪽수, 문제 번호, 학생 손글씨 마킹(객관식/단답형)을 자동으로 인식하고 매칭합니다.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-indigo-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-black text-sm mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">자동 채점 및 정답률</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              총 문제 수, 맞은 문제, 틀린 문제를 분류하고 즉시 정답률과 학습 통계를 도출합니다.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-indigo-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-sm mb-3">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">오답 목록 및 오답 노트</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              「32쪽 ③번」처럼 틀린 문제 위치를 즉시 알려주고, 오답 노트에서 다시 풀기를 지원합니다.
            </p>
          </div>
        </div>
      </div>

      {/* CORE SERVICE STRUCTURE & PUBLIC EDUCATION DATA ARCHITECTURE */}
      <div className="bg-white border-2 border-indigo-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-600 text-white">
                <Landmark className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold text-indigo-700 tracking-wider uppercase">
                ScoreCompass 서비스 구조 & 공공데이터 연계도
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              사진 OCR 채점과 4대 공공데이터(초·중·고 & NCS 직업교육)의 완벽한 결합
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              공공데이터가 시중 모든 문제집의 문제-정답을 보유하지 않으므로, <strong className="text-slate-900">실제 채점은 사진 OCR과 문제/답안 인식</strong>으로 구현하고, <strong className="text-indigo-600">공공데이터(초·중·고 교육과정 + 특성화고 NCS 직업계열)</strong>는 교육과정 분류·학습자료 연결·오답 맞춤 처방에 유기적으로 활용합니다.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
              공공데이터포털 개발계정 2건 승인 연계
            </span>
          </div>
        </div>

        {/* Visual Pipeline Diagram (Exact format requested) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Pipeline Interactive Flow Graphic */}
          <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-5 sm:p-6 text-white space-y-3 font-sans shadow-inner">
            <div className="text-[11px] font-mono text-cyan-400 tracking-wider font-bold uppercase flex items-center justify-between">
              <span>SERVICE PIPELINE FLOW</span>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] border border-cyan-800">
                실시간 연계 파이프라인
              </span>
            </div>

            {/* Step: [학생] 문제집 + 답안지 사진 업로드 */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3 flex items-center gap-3">
              <span className="px-2 py-1 rounded bg-indigo-600 text-[11px] font-bold shrink-0">[학생]</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-200">문제집 + 답안지 사진 업로드</span>
            </div>

            <div className="flex justify-center my-0.5 text-cyan-400">
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </div>

            {/* Step: OCR / AI */}
            <div className="bg-indigo-950/80 border border-indigo-700/80 rounded-xl p-3 flex items-center gap-3">
              <span className="px-2 py-1 rounded bg-cyan-500 text-slate-950 text-[11px] font-black shrink-0">[OCR/AI]</span>
              <span className="text-xs sm:text-sm font-medium text-cyan-100">문제번호 · 학생답 · 페이지(쪽수) 정밀 인식</span>
            </div>

            <div className="flex justify-center my-0.5 text-cyan-400">
              <ArrowDown className="w-4 h-4" />
            </div>

            {/* Step: [공공데이터] 교육과정 / 학습자료 / 평가문항 */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3 flex items-center gap-3">
              <span className="px-2 py-1 rounded bg-purple-600 text-[11px] font-bold shrink-0">[공공데이터]</span>
              <span className="text-xs sm:text-sm font-medium text-purple-200">교육과정 분류 / 학습자료 / 평가문항 매핑</span>
            </div>

            <div className="flex justify-center my-0.5 text-cyan-400">
              <ArrowDown className="w-4 h-4" />
            </div>

            {/* Box: 채점 결과 */}
            <div className="bg-slate-950 border-2 border-emerald-500/80 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  자동 채점 결과 (실제 산출물)
                </span>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  정답률 83.3%
                </span>
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-bold">
                30문제 중 <span className="text-emerald-400 text-base">25문제 정답</span> (정답률 83.3%)
              </div>
              <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-900/80 space-y-1.5">
                <span className="text-[10px] font-bold text-rose-300 block">틀린 문제 즉시 위치 안내:</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-rose-900 text-rose-100 font-bold text-xs flex items-center gap-1">
                    ❌ 32쪽 ③번
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-900 text-rose-100 font-bold text-xs flex items-center gap-1">
                    ❌ 37쪽 ②번
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-900 text-rose-100 font-bold text-xs flex items-center gap-1">
                    ❌ 41쪽 ⑤번
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center my-0.5 text-cyan-400">
              <ArrowDown className="w-4 h-4" />
            </div>

            {/* Step: 관련 학습자료 추천 */}
            <div className="bg-gradient-to-r from-emerald-900/60 to-blue-900/60 border border-emerald-600/60 rounded-xl p-3 flex items-center justify-between">
              <span className="text-xs sm:text-sm font-black text-emerald-200">
                👉 관련 공공 학습자료 & 에듀넷 평가문항 맞춤 추천
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-slate-950">
                원클릭 복습
              </span>
            </div>
          </div>

          {/* Right: The 2 Core Official Education Datasets Cards */}
          <div className="lg:col-span-6 space-y-3.5">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-600" />
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 break-keep">
                공공 교육 데이터 연계 (교육부 · 평가원 공식 DB)
              </h3>
            </div>

            {/* 1순위: 에듀넷 학습·평가자료 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-400 transition-colors space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    1
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 break-keep">
                    교육부 에듀넷 학습·평가자료 (티-클리어)
                  </h4>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 shrink-0">
                  공식 형성평가 쌍둥이 문제
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep">
                “문제를 풀고 채점한다”와 가장 직접적으로 연계되는 핵심 공공데이터입니다. 초·중·고 교육과정 기반의 <strong className="text-slate-900 font-semibold">공식 형성평가 문항과 정답·해설</strong>을 매핑하여, 틀린 문제 복습용 쌍둥이 문항을 즉시 제공합니다.
              </p>
              <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between pt-2 border-t border-slate-100">
                <span>출처: 교육부 에듀넷 티-클리어 (KERIS)</span>
                <span className="text-emerald-600 font-semibold">🟢 공식 데이터 연계</span>
              </div>
            </div>

            {/* 2순위: 국가교육과정·성취기준 데이터 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-400 transition-colors space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 break-keep">
                    국가교육과정·성취기준 데이터 (NCIC)
                  </h4>
                </div>
                <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200 shrink-0">
                  학습 결손 영역 진단
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep">
                단순히 “37쪽 ③번 틀림”에서 끝나는 것이 아니라 <strong className="text-indigo-950 font-semibold">“37쪽 ③번 틀림 → 중2 수학 일차함수 → 2022 개정 성취기준 [9수03-02]”</strong>처럼 체계적인 영역 분석과 맞춤 처방을 완성합니다.
              </p>
              <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between pt-2 border-t border-slate-100">
                <span>출처: 교육부 국가교육과정정보센터 (NCIC)</span>
                <span className="text-indigo-600 font-semibold">🟢 2022/2026 개정 성취기준 완벽 탑재</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured 1-Click Interactive Test Sets */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                1-클릭 실전 문제집 바로 체험하기
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              별도의 사진 준비 없이 사용자가 요청한 채점 시나리오를 즉시 실행해볼 수 있습니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {presets.map((preset) => (
            <div
              key={preset.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-400 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {preset.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-400">{preset.pages}</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1">
                  {preset.title}
                </h3>
                <p className="text-xs text-slate-600 mb-4">{preset.description}</p>

                {/* Highlight chips */}
                <div className="p-3 bg-slate-50 rounded-xl mb-4 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                    포함된 오답 목록 (핵심 기능)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {preset.incorrectHighlights.map((hl, i) => (
                      <span
                        key={i}
                        className="text-xs font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200"
                      >
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectPreset(preset)}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>이 문제집 채점 결과 바로보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent History if any */}
      {recentResults.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              최근 채점 기록 ({recentResults.length}건)
            </h3>
          </div>

          <div className="divide-y divide-slate-100">
            {recentResults.slice(0, 5).map((rec) => (
              <div
                key={rec.id}
                onClick={() => onSelectSavedResult(rec)}
                className="py-3.5 flex items-center justify-between hover:bg-slate-50/80 px-2 rounded-xl cursor-pointer transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{rec.workbookTitle}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {rec.subject}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    총 {rec.totalQuestions}문제 • 정답 {rec.correctCount} / 오답 {rec.incorrectCount} • 정답률 {Math.round(rec.accuracyRate)}%
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-600">결과 보기</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
