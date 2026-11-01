import React, { useState } from 'react';
import { ViewTab, PresetSample } from '../types';
import {
  CheckCircle2,
  BookOpen,
  Camera,
  BarChart3,
  Compass,
  Sparkles,
  Layers,
  History,
  Home,
  ChevronDown,
  BookMarked,
  Landmark,
  Bot,
} from 'lucide-react';

interface NavbarProps {
  currentTab: ViewTab;
  setCurrentTab: (tab: ViewTab) => void;
  hasResult: boolean;
  incorrectCount: number;
  presets: PresetSample[];
  onSelectPreset: (preset: PresetSample) => void;
  savedResultsCount: number;
  onOpenHistory: () => void;
  onOpenPublicDataModal?: () => void;
  onOpenKoreanDict?: (word?: string) => void;
  onOpenTutor?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  hasResult,
  incorrectCount,
  presets,
  onSelectPreset,
  savedResultsCount,
  onOpenHistory,
  onOpenPublicDataModal,
  onOpenKoreanDict,
  onOpenTutor,
}) => {
  const [isPresetMenuOpen, setIsPresetMenuOpen] = useState(false);

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Brand */}
            <div
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer shrink-0"
              onClick={() => setCurrentTab('home')}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg flex items-center">
                    Score<span className="text-indigo-600">Compass</span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    AI 채점
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 hidden lg:block">
                  AI 자동 채점 및 오답 나침반
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setCurrentTab('home')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'home'
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                대시보드
              </button>
              <button
                onClick={() => setCurrentTab('upload')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'upload'
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Camera className="w-4 h-4" />
                사진 채점하기
              </button>
              <button
                onClick={() => hasResult && setCurrentTab('result')}
                disabled={!hasResult}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  !hasResult
                    ? 'text-slate-300 cursor-not-allowed'
                    : currentTab === 'result'
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                채점 결과
                {hasResult && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                    확인
                  </span>
                )}
              </button>
              <button
                onClick={() => hasResult && setCurrentTab('notebook')}
                disabled={!hasResult}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  !hasResult
                    ? 'text-slate-300 cursor-not-allowed'
                    : currentTab === 'notebook'
                    ? 'bg-rose-50 text-rose-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                오답 노트
                {incorrectCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs font-bold bg-rose-500 text-white">
                    {incorrectCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => hasResult && setCurrentTab('analytics')}
                disabled={!hasResult}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  !hasResult
                    ? 'text-slate-300 cursor-not-allowed'
                    : currentTab === 'analytics'
                    ? 'bg-amber-50 text-amber-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                학습 통계
              </button>
            </nav>

            {/* Right Action buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Korean Dict Button */}
              {onOpenKoreanDict && (
                <button
                  type="button"
                  onClick={() => onOpenKoreanDict('귀납')}
                  className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 transition-colors cursor-pointer"
                  title="국립국어원 교과 개념어 사전 (한국어기초사전 Open API)"
                >
                  <BookMarked className="w-3.5 h-3.5 text-purple-600" />
                  <span className="hidden md:inline">개념어 사전</span>
                  <span className="md:hidden text-[10px]">사전</span>
                </button>
              )}

              {/* Public Data REST API Badge Button */}
              {onOpenPublicDataModal && (
                <button
                  type="button"
                  onClick={onOpenPublicDataModal}
                  className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 transition-colors"
                  title="교육부 에듀넷 및 교육과정 공공데이터 연계 센터"
                >
                  <Landmark className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden md:inline">공공데이터 연계</span>
                  <span className="md:hidden text-[10px]">공공데이터</span>
                </button>
              )}

              {/* 1:1 AI 과외 튜터 Button */}
              {onOpenTutor && (
                <button
                  type="button"
                  onClick={onOpenTutor}
                  className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xs transition-all cursor-pointer"
                  title="해설이 이해되지 않을 때 1:1 AI 과외 튜터 질문창 열기"
                >
                  <Bot className="w-3.5 h-3.5 text-indigo-200" />
                  <span className="hidden md:inline">1:1 AI 과외</span>
                  <span className="md:hidden text-[10px]">AI과외</span>
                </button>
              )}

              {/* Preset Launcher Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsPresetMenuOpen((prev) => !prev)}
                  className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">예시 문제집</span>
                  <span className="sm:hidden text-[11px]">예시</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isPresetMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsPresetMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 p-2 bg-white rounded-xl shadow-xl border border-slate-200 z-50 animate-in fade-in-50">
                      <p className="px-2 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        체험용 문제집 선택
                      </p>
                      {presets.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => {
                            onSelectPreset(preset);
                            setIsPresetMenuOpen(false);
                          }}
                          className="w-full text-left p-2 rounded-lg hover:bg-indigo-50/80 transition-colors group/item"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800 group-hover/item:text-indigo-600">
                              {preset.title.split('(')[0]}
                            </span>
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                              {preset.pages}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {preset.questionCount}문제 ({preset.accuracy}% 정답률)
                          </p>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {savedResultsCount > 0 && (
                <button
                  onClick={onOpenHistory}
                  title="채점 기록 목록"
                  className="p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative"
                >
                  <History className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-600"></span>
                </button>
              )}

              <button
                onClick={() => setCurrentTab('upload')}
                className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs sm:text-sm font-semibold shadow-xs shadow-indigo-300 transition-all"
              >
                <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">사진 채점</span>
                <span className="sm:hidden text-xs">촬영</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar (App-like thumb navigation) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden flex items-center justify-around py-2 px-1 shadow-lg">
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 ${
            currentTab === 'home' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">홈</span>
        </button>

        <button
          onClick={() => setCurrentTab('upload')}
          className={`flex flex-col items-center justify-center flex-1 py-1 ${
            currentTab === 'upload' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <div className="relative">
            <Camera className="w-5 h-5 mb-0.5" />
          </div>
          <span className="text-[10px]">사진 채점</span>
        </button>

        <button
          onClick={() => hasResult && setCurrentTab('result')}
          disabled={!hasResult}
          className={`flex flex-col items-center justify-center flex-1 py-1 relative ${
            !hasResult
              ? 'text-slate-300 cursor-not-allowed'
              : currentTab === 'result'
              ? 'text-blue-600 font-bold'
              : 'text-slate-500'
          }`}
        >
          <div className="relative">
            <CheckCircle2 className="w-5 h-5 mb-0.5" />
            {hasResult && (
              <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-blue-600"></span>
            )}
          </div>
          <span className="text-[10px]">채점 결과</span>
        </button>

        <button
          onClick={() => hasResult && setCurrentTab('notebook')}
          disabled={!hasResult}
          className={`flex flex-col items-center justify-center flex-1 py-1 relative ${
            !hasResult
              ? 'text-slate-300 cursor-not-allowed'
              : currentTab === 'notebook'
              ? 'text-rose-600 font-bold'
              : 'text-slate-500'
          }`}
        >
          <div className="relative">
            <BookOpen className="w-5 h-5 mb-0.5" />
            {incorrectCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1 rounded-full bg-rose-500 text-white text-[9px] font-black leading-tight">
                {incorrectCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">오답 노트</span>
        </button>

        <button
          onClick={() => hasResult && setCurrentTab('analytics')}
          disabled={!hasResult}
          className={`flex flex-col items-center justify-center flex-1 py-1 ${
            !hasResult
              ? 'text-slate-300 cursor-not-allowed'
              : currentTab === 'analytics'
              ? 'text-amber-600 font-bold'
              : 'text-slate-500'
          }`}
        >
          <BarChart3 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">학습 통계</span>
        </button>
      </div>
    </>
  );
};
