import React from 'react';
import { GradingResult } from '../types';
import { X, Clock, Trash2, ChevronRight, CheckCircle2 } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedResults: GradingResult[];
  onSelectResult: (result: GradingResult) => void;
  onDeleteResult: (id: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  savedResults,
  onSelectResult,
  onDeleteResult,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-base">채점 기록 보관함</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto divide-y divide-slate-100 flex-1">
          {savedResults.length === 0 ? (
            <p className="text-center text-xs text-slate-500 py-8">
              저장된 채점 기록이 없습니다.
            </p>
          ) : (
            savedResults.map((item) => (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition-colors group"
              >
                <div
                  className="cursor-pointer flex-1"
                  onClick={() => {
                    onSelectResult(item);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">
                      {item.workbookTitle}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {item.subject}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {new Date(item.createdAt).toLocaleDateString('ko-KR')} • {item.totalQuestions}문제 • 정답률 {Math.round(item.accuracyRate)}%
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDeleteResult(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="기록 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <ChevronRight
                    className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 cursor-pointer"
                    onClick={() => {
                      onSelectResult(item);
                      onClose();
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
