import React, { useState } from 'react';
import { X, Check, KeyRound, Sparkles } from 'lucide-react';

interface ManualKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentKey: string;
  onSaveKey: (keyText: string) => void;
}

export const ManualKeyModal: React.FC<ManualKeyModalProps> = ({
  isOpen,
  onClose,
  currentKey,
  onSaveKey,
}) => {
  const [text, setText] = useState(currentKey);

  const presetExamples = [
    {
      title: '객관식 1~10번 정답 (번호순)',
      content: '1: ④, 2: ②, 3: ③, 4: ⑤, 5: ①, 6: ②, 7: ③, 8: ④, 9: ①, 10: ⑤',
    },
    {
      title: '객관식 + 단답형 혼합형',
      content: '1: ③, 2: ①, 3: ②, 4: ④, 5: 12, 6: ⑤, 7: 29, 8: ②, 9: 8cm, 10: 90°',
    },
    {
      title: '단순 번호 연속 입력 (1 3 2 4 5)',
      content: '4, 2, 3, 5, 1, 2, 3, 4, 1, 5',
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">정답표 직접 입력</h3>
              <p className="text-xs text-slate-500">정답지 사진이 없을 때 직접 입력할 수 있습니다.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              정답 내용 (번호와 정답을 자유롭게 입력)
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="예시: 1번: ④, 2번: ②, 3번: ③, 4번: ⑤, 5번: 12 ..."
              rows={5}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm font-mono outline-hidden"
            />
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              빠른 예시 템플릿 넣기
            </p>
            <div className="space-y-1.5">
              {presetExamples.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setText(item.content)}
                  className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-indigo-50/70 border border-slate-200/80 transition-colors text-xs"
                >
                  <span className="font-bold text-slate-700 block">{item.title}</span>
                  <span className="text-slate-500 font-mono text-[11px] truncate block">
                    {item.content}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200/60 text-xs font-semibold"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => {
              onSaveKey(text);
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
          >
            <Check className="w-4 h-4" />
            정답표 적용
          </button>
        </div>
      </div>
    </div>
  );
};
