import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle, Sparkles, Scan, FileSearch, CheckCheck, Lightbulb } from 'lucide-react';

interface GradingProgressModalProps {
  isOpen: boolean;
}

export const GradingProgressModal: React.FC<GradingProgressModalProps> = ({ isOpen }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: '이미지 전처리 및 선명도 보정', desc: '손글씨와 인쇄 글자 명암비 최적화', icon: Scan },
    { title: '페이지 쪽수 및 문제 영역 분할', desc: '상단/하단 쪽수 및 문제 번호(1~30번) 식별', icon: FileSearch },
    { title: '학생 필기 & OMR 마킹 OCR 인식', desc: '손글씨 숫자, 기호, 객관식 동그라미 판독', icon: Loader2 },
    { title: '정답표 대조 및 정답/오답 자동 채점', desc: '정답과 비교하여 일치 여부 정밀 판정', icon: CheckCheck },
    { title: '오답 원인 분석 및 맞춤 피드백 도출', desc: '취약 개념 진단 및 단계별 오답 노트 생성', icon: Lightbulb },
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      return;
    }

    const intervals = [800, 1400, 1800, 1600];
    let stepIndex = 0;

    const timer = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setCurrentStep(stepIndex);
      } else {
        clearInterval(timer);
      }
    }, 1500);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-slate-200 flex flex-col items-center text-center">
        {/* Animated Badge */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
            <Sparkles className="w-10 h-10 animate-bounce text-indigo-600" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-600"></span>
          </span>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-1">
          AI가 채점을 진행하고 있습니다
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          문제집 쪽수, 문제 번호, 학생 손글씨 마킹을 정밀 판독 중입니다
        </p>

        {/* Step Progress List */}
        <div className="w-full space-y-3 text-left">
          {steps.map((s, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;
            const Icon = s.icon;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-indigo-50/80 border border-indigo-200 shadow-2xs'
                    : isDone
                    ? 'bg-slate-50/60 opacity-80'
                    : 'opacity-40'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-600'
                      : isCurrent
                      ? 'bg-indigo-600 text-white animate-spin'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <div className="overflow-hidden flex-1">
                  <p
                    className={`text-xs font-bold truncate ${
                      isCurrent ? 'text-indigo-950' : 'text-slate-800'
                    }`}
                  >
                    {s.title}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-400 mt-6 animate-pulse">
          잠시만 기다려주세요 (평균 3~7초 소요)
        </p>
      </div>
    </div>
  );
};
