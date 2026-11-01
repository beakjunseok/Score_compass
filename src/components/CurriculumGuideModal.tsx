import React, { useState } from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  Award,
  Layers,
  GraduationCap,
  Sparkles,
  Info,
  Calendar,
  Compass,
} from 'lucide-react';
import { SEOUL_CURRICULUM_2026, SAT_2028_GUIDE, CREDIT_PASS_CRITERIA } from '../data/curriculumData';

interface CurriculumGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCurriculumSubject?: (subjectName: string) => void;
}

export const CurriculumGuideModal: React.FC<CurriculumGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectCurriculumSubject,
}) => {
  const [activeTab, setActiveTab] = useState<'2022' | 'sat2028' | 'rules'>('2022');
  const [selectedGroup, setSelectedGroup] = useState<string>('수학');

  if (!isOpen) return null;

  const currentGroup = SEOUL_CURRICULUM_2026[selectedGroup];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-slate-900 text-sm sm:text-base">
                  2026학년도 고등학교 교육과정 편성·운영 가이드
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                  서울특별시교육청 지침
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                2022 개정(고1·2학년, 2028 수능 개편) & 2015 개정(고3학년) 고교학점제 완벽 분석
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-slate-100 bg-white">
          <button
            onClick={() => setActiveTab('2022')}
            className={`px-3.5 py-2 text-xs font-extrabold rounded-t-xl transition-all border-b-2 ${
              activeTab === '2022'
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            2022 개정 교과 편제 (고1·2)
          </button>
          <button
            onClick={() => setActiveTab('sat2028')}
            className={`px-3.5 py-2 text-xs font-extrabold rounded-t-xl transition-all border-b-2 flex items-center gap-1 ${
              activeTab === 'sat2028'
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>2028 대입 수능 출제범위</span>
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3.5 py-2 text-xs font-extrabold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'rules'
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            학점제 이수 & 성적 산출 기준
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === '2022' && (
            <div className="space-y-4">
              {/* Subject Group Selector */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {['수학', '과학', '사회', '국어', '영어'].map((grp) => (
                  <button
                    key={grp}
                    onClick={() => setSelectedGroup(grp)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                      selectedGroup === grp
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {grp} 교과
                  </button>
                ))}
              </div>

              {/* 2022 Revision Structure Card */}
              <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>{currentGroup.groupName} - 2022 개정 교육과정 (고1·2학년)</span>
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    2025·2026학년도 입학
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Common */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="font-bold text-indigo-700 block mb-1.5 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      공통 과목 (1학년 필수)
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {currentGroup.rev2022.common.map((sb, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            onSelectCurriculumSubject?.(sb);
                            onClose();
                          }}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-semibold text-[11px] transition-colors"
                        >
                          {sb}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* General */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="font-bold text-blue-700 block mb-1.5 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      일반 선택 과목 (2028 수능 출제)
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {currentGroup.rev2022.general.map((sb, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            onSelectCurriculumSubject?.(sb);
                            onClose();
                          }}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-semibold text-[11px] transition-colors"
                        >
                          {sb}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Career */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="font-bold text-amber-700 block mb-1.5 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      진로 선택 과목 (심화 탐구)
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {currentGroup.rev2022.career.map((sb, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            onSelectCurriculumSubject?.(sb);
                            onClose();
                          }}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-slate-700 font-semibold text-[11px] transition-colors"
                        >
                          {sb}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fusion */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="font-bold text-rose-700 block mb-1.5 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      융합 선택 과목 (성취도 평가)
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {currentGroup.rev2022.fusion.map((sb, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            onSelectCurriculumSubject?.(sb);
                            onClose();
                          }}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-semibold text-[11px] transition-colors"
                        >
                          {sb}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2015 Comparison Box (for Current 3rd Grade) */}
              <div className="p-4 bg-white border border-slate-200 rounded-2xl">
                <span className="text-xs font-bold text-slate-600 block mb-2">
                  비교: 2015 개정 교육과정 체계 (고3 수험생 적용)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div>
                    <span className="font-semibold text-slate-500">일반 선택:</span>{' '}
                    {currentGroup.rev2015.general.join(', ')}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500">진로 선택:</span>{' '}
                    {currentGroup.rev2015.career.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sat2028' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>2028학년도 대학수학능력시험 확정안 핵심:</strong> 문·이과 선택과목을 완전히
                폐지하고 <strong>국어·수학·탐구 전 영역을 공통 응시</strong>합니다. 특히 사회·과학 탐구는
                모든 수험생이 <strong>'통합사회'와 '통합과학'</strong>을 동일하게 응시합니다.
              </div>

              <div className="divide-y divide-slate-100 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                      국어 영역
                    </span>
                    <h5 className="font-extrabold text-sm text-slate-900 mt-1">
                      {SAT_2028_GUIDE.korean.scope}
                    </h5>
                    <p className="text-[11px] text-slate-500">{SAT_2028_GUIDE.korean.note}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-600">{SAT_2028_GUIDE.korean.type}</span>
                </div>

                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                      수학 영역
                    </span>
                    <h5 className="font-extrabold text-sm text-slate-900 mt-1">
                      {SAT_2028_GUIDE.math.scope}
                    </h5>
                    <p className="text-[11px] text-slate-500">{SAT_2028_GUIDE.math.note}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-600">{SAT_2028_GUIDE.math.type}</span>
                </div>

                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                      사회·과학 탐구
                    </span>
                    <h5 className="font-extrabold text-sm text-slate-900 mt-1">
                      {SAT_2028_GUIDE.inquiry.scope}
                    </h5>
                    <p className="text-[11px] text-slate-500">{SAT_2028_GUIDE.inquiry.note}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-600">{SAT_2028_GUIDE.inquiry.type}</span>
                </div>

                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700">
                      영어 & 한국사
                    </span>
                    <h5 className="font-extrabold text-sm text-slate-900 mt-1">
                      영어Ⅰ·Ⅱ & 한국사 (절대평가)
                    </h5>
                    <p className="text-[11px] text-slate-500">기존과 동일한 절대평가 등급제</p>
                  </div>
                  <span className="text-xs font-bold text-slate-600">공통 필수</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-4">
              {/* Credit Criteria */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <h4 className="font-extrabold text-sm text-slate-900">
                    고교학점제 학점 이수 인정 기준 (3년간 총 192학점)
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-700 block mb-1">과목 출석률 기준</span>
                    <p className="text-slate-600">
                      실제 운영 수업 횟수의 <strong>2/3(66.7%) 이상</strong> 출석
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-rose-600 block mb-1">최소 학업성취율 기준</span>
                    <p className="text-slate-600">
                      과목 성취율 <strong>40% 이상</strong> 달성 (미달 시 예방·보충지도 대상)
                    </p>
                  </div>
                </div>
              </div>

              {/* 5-Grade vs 9-Grade Scale */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
                <h4 className="font-extrabold text-sm text-slate-900">
                  성적 산출 방식 (2022 개정 5등급제)
                </h4>
                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="py-2">등급</th>
                        <th className="py-2">비율 (누적)</th>
                        <th className="py-2">성취도</th>
                        <th className="py-2">적용 과목</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="py-2 font-bold text-indigo-600">1등급</td>
                        <td>상위 10%</td>
                        <td>A (90% 이상)</td>
                        <td rowSpan={5} className="text-slate-500 align-top pt-2">
                          공통 과목, 일반 선택, 진로 선택 전 과목 (융합선택 9과목은 석차등급 미산출)
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 font-bold text-blue-600">2등급</td>
                        <td>11% ~ 34% (누적 34%)</td>
                        <td>B (80% 이상)</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-bold text-cyan-600">3등급</td>
                        <td>35% ~ 66% (누적 66%)</td>
                        <td>C (70% 이상)</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-bold text-amber-600">4등급</td>
                        <td>67% ~ 90% (누적 90%)</td>
                        <td>D (60% 이상)</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-bold text-rose-600">5등급</td>
                        <td>하위 10% (누적 100%)</td>
                        <td>E (40% 이상, 40% 미만은 최소성취 보장지도)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>출처: 서울특별시교육청 중등교육과 고등학교 교육과정 편성·운영 지침</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
