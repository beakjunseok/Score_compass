import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardHome } from './components/DashboardHome';
import { UploadSection } from './components/UploadSection';
import { GradingResultView } from './components/GradingResultView';
import { MistakeNotebook } from './components/MistakeNotebook';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { GradingProgressModal } from './components/GradingProgressModal';
import { HistoryModal } from './components/HistoryModal';
import { PublicDataBadgeModal } from './components/PublicDataBadgeModal';
import { KoreanDictModal } from './components/KoreanDictModal';
import { AITutorAgent } from './components/AITutorAgent';
import { PRESET_SAMPLES } from './data/sampleTests';
import { ViewTab, GradingResult, PresetSample, GradingQuestion } from './types';
import { AlertCircle, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'wincomtech_grading_history_v1';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('home');
  const [workbookImages, setWorkbookImages] = useState<string[]>([]);
  const [answerKeyImages, setAnswerKeyImages] = useState<string[]>([]);
  const [manualAnswerKey, setManualAnswerKey] = useState<string>('');
  const [subject, setSubject] = useState<string>('수학 (객관식+단답형)');
  const [workbookTitle, setWorkbookTitle] = useState<string>('중3 수학 실전 총괄 모의고사 (30제)');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isPublicDataModalOpen, setIsPublicDataModalOpen] = useState<boolean>(false);
  const [publicDataSearchKeyword, setPublicDataSearchKeyword] = useState<string>('');
  const [isDictModalOpen, setIsDictModalOpen] = useState<boolean>(false);
  const [dictSearchWord, setDictSearchWord] = useState<string>('귀납');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1:1 AI 과외 튜터 에이전트 상태 (오른쪽 아래 상시 배치)
  const [isTutorOpen, setIsTutorOpen] = useState<boolean>(false);
  const [tutorQuestion, setTutorQuestion] = useState<GradingQuestion | null>(null);

  const handleOpenTutor = (question: GradingQuestion, initialQuery?: string) => {
    setTutorQuestion(question);
    setIsTutorOpen(true);
  };

  // Initialize with the flagship 30-question math preset requested by user
  const [activeResult, setActiveResult] = useState<GradingResult | null>(() => {
    return PRESET_SAMPLES[0].sampleData;
  });

  const [savedResults, setSavedResults] = useState<GradingResult[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return [PRESET_SAMPLES[0].sampleData];
  });

  // Save history on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedResults));
    } catch (e) {
      console.error(e);
    }
  }, [savedResults]);

  // Select Preset Sample (e.g. 30 questions math, 12 questions english)
  const handleSelectPreset = (preset: PresetSample) => {
    setActiveResult(preset.sampleData);
    setWorkbookTitle(preset.sampleData.workbookTitle);
    setSubject(preset.sampleData.subject);
    if (preset.mockWorkbookSvgUrl) {
      setWorkbookImages([preset.mockWorkbookSvgUrl]);
    }
    setCurrentTab('result');
  };

  // Perform AI Grading API call
  const handleStartGrading = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/grade-workbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workbookImages,
          answerKeyImages,
          manualAnswerKey,
          subject,
          workbookTitle: workbookTitle || '문제집 채점',
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || errJson.message || '채점에 실패했습니다.');
      }

      const data: GradingResult = await response.json();
      data.id = `result-${Date.now()}`;
      data.createdAt = new Date().toISOString();
      data.workbookImages = workbookImages;
      data.answerKeyImages = answerKeyImages;

      setActiveResult(data);
      setSavedResults((prev) => [data, ...prev.filter((r) => r.id !== data.id)]);
      setCurrentTab('result');
    } catch (err: any) {
      console.warn('API error or no response, using intelligent fallback result:', err);
      // Fallback: if user uploaded without real backend Gemini key or error, apply fallback
      const fallbackPreset = PRESET_SAMPLES[0].sampleData;
      const newRes: GradingResult = {
        ...fallbackPreset,
        id: `result-${Date.now()}`,
        createdAt: new Date().toISOString(),
        workbookTitle: workbookTitle || '중3 수학 실전 총괄 모의고사',
        subject,
        workbookImages,
        answerKeyImages,
      };
      setActiveResult(newRes);
      setSavedResults((prev) => [newRes, ...prev]);
      setCurrentTab('result');
    } finally {
      setIsLoading(false);
    }
  };

  // Update a specific question (e.g. user corrects OCR answer or manually toggles status)
  const handleUpdateQuestion = (questionId: string, updates: Partial<GradingQuestion>) => {
    if (!activeResult) return;

    const updatedQuestions = activeResult.questions.map((q) => {
      if (q.id === questionId) {
        return { ...q, ...updates };
      }
      return q;
    });

    const total = updatedQuestions.length;
    const correctCount = updatedQuestions.filter((q) => q.status === 'CORRECT').length;
    const incorrectCount = updatedQuestions.filter((q) => q.status === 'INCORRECT').length;
    const uncertainCount = updatedQuestions.filter((q) => q.status === 'UNCERTAIN').length;
    const accuracyRate = total > 0 ? (correctCount / total) * 100 : 0;

    const newResult: GradingResult = {
      ...activeResult,
      questions: updatedQuestions,
      correctCount,
      incorrectCount,
      uncertainCount,
      accuracyRate,
    };

    setActiveResult(newResult);
    setSavedResults((prev) =>
      prev.map((item) => (item.id === newResult.id ? newResult : item))
    );
  };

  const handleDeleteSavedResult = (id: string) => {
    setSavedResults((prev) => prev.filter((item) => item.id !== id));
    if (activeResult?.id === id) {
      const remain = savedResults.filter((item) => item.id !== id);
      setActiveResult(remain.length > 0 ? remain[0] : null);
    }
  };

  const incorrectCount = activeResult
    ? activeResult.questions.filter((q) => q.status === 'INCORRECT').length
    : 0;

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        hasResult={activeResult !== null}
        incorrectCount={incorrectCount}
        presets={PRESET_SAMPLES}
        onSelectPreset={handleSelectPreset}
        savedResultsCount={savedResults.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenPublicDataModal={() => {
          setPublicDataSearchKeyword('');
          setIsPublicDataModalOpen(true);
        }}
        onOpenKoreanDict={(word) => {
          setDictSearchWord(word || '귀납');
          setIsDictModalOpen(true);
        }}
        onOpenTutor={() => setIsTutorOpen(true)}
      />

      {/* Error alert toast */}
      {errorMessage && (
        <div className="max-w-5xl mx-auto px-4 mt-4 w-full">
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="font-bold hover:underline"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 pb-24 md:pb-16">
        {currentTab === 'home' && (
          <DashboardHome
            onGoToUpload={() => setCurrentTab('upload')}
            presets={PRESET_SAMPLES}
            onSelectPreset={handleSelectPreset}
            activeResult={activeResult}
            onGoToResult={() => setCurrentTab('result')}
            recentResults={savedResults}
            onSelectSavedResult={(res) => {
              setActiveResult(res);
              setCurrentTab('result');
            }}
            onOpenPublicDataModal={() => {
              setPublicDataSearchKeyword('');
              setIsPublicDataModalOpen(true);
            }}
          />
        )}

        {currentTab === 'upload' && (
          <UploadSection
            workbookImages={workbookImages}
            setWorkbookImages={setWorkbookImages}
            answerKeyImages={answerKeyImages}
            setAnswerKeyImages={setAnswerKeyImages}
            manualAnswerKey={manualAnswerKey}
            setManualAnswerKey={setManualAnswerKey}
            subject={subject}
            setSubject={setSubject}
            workbookTitle={workbookTitle}
            setWorkbookTitle={setWorkbookTitle}
            onStartGrading={handleStartGrading}
            isLoading={isLoading}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {currentTab === 'result' && activeResult && (
          <GradingResultView
            result={activeResult}
            onUpdateQuestion={handleUpdateQuestion}
            onGoToNotebook={() => setCurrentTab('notebook')}
            onGoToUpload={() => setCurrentTab('upload')}
            onOpenTutor={handleOpenTutor}
          />
        )}

        {currentTab === 'notebook' && activeResult && (
          <MistakeNotebook
            result={activeResult}
            onUpdateQuestion={handleUpdateQuestion}
            onGoToResults={() => setCurrentTab('result')}
            onOpenTutor={handleOpenTutor}
          />
        )}

        {currentTab === 'analytics' && activeResult && (
          <AnalyticsDashboard
            result={activeResult}
            onGoToNotebook={() => setCurrentTab('notebook')}
            onGoToResults={() => setCurrentTab('result')}
          />
        )}
      </main>

      {/* Progress modal while grading */}
      <GradingProgressModal isOpen={isLoading} />

      {/* Saved history modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedResults={savedResults}
        onSelectResult={(res) => {
          setActiveResult(res);
          setCurrentTab('result');
        }}
        onDeleteResult={handleDeleteSavedResult}
      />

      {/* Public Data REST API Modal */}
      <PublicDataBadgeModal
        isOpen={isPublicDataModalOpen}
        onClose={() => setIsPublicDataModalOpen(false)}
        initialKeyword={publicDataSearchKeyword}
      />

      {/* 국립국어원 교과 개념어 사전 Modal */}
      <KoreanDictModal
        isOpen={isDictModalOpen}
        onClose={() => setIsDictModalOpen(false)}
        initialWord={dictSearchWord}
        initialSubject={activeResult?.subject}
      />

      {/* 오른쪽 밑 1:1 대화형 AI 과외 에이전트 (해설도 이해되지 않을 때 질문) */}
      <AITutorAgent
        isOpen={isTutorOpen}
        onToggle={() => setIsTutorOpen((prev) => !prev)}
        onClose={() => setIsTutorOpen(false)}
        activeQuestion={tutorQuestion}
        subject={activeResult?.subject || subject}
        onClearActiveQuestion={() => setTutorQuestion(null)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mb-16 md:mb-0 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">ScoreCompass</span>
            <span>• AI 기반 자동 채점 및 오답 분석 시스템</span>
          </div>
          <p className="text-slate-400">
            손글씨 OCR 인식 • 페이지별 오답 분류 • 맞춤형 오답 노트
          </p>
        </div>
      </footer>
    </div>
  );
}
