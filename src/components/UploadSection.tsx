import React, { useState } from 'react';
import {
  UploadCloud,
  Camera,
  Trash2,
  FileText,
  KeyRound,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Eye,
  Compass,
  GraduationCap,
} from 'lucide-react';
import { CameraCaptureModal } from './CameraCaptureModal';
import { ManualKeyModal } from './ManualKeyModal';
import { CurriculumGuideModal } from './CurriculumGuideModal';
import { PRESET_SAMPLES } from '../data/sampleTests';
import { SEOUL_CURRICULUM_2026 } from '../data/curriculumData';
import { PresetSample } from '../types';

interface UploadSectionProps {
  workbookImages: string[];
  setWorkbookImages: React.Dispatch<React.SetStateAction<string[]>>;
  answerKeyImages: string[];
  setAnswerKeyImages: React.Dispatch<React.SetStateAction<string[]>>;
  manualAnswerKey: string;
  setManualAnswerKey: React.Dispatch<React.SetStateAction<string>>;
  subject: string;
  setSubject: (sub: string) => void;
  workbookTitle: string;
  setWorkbookTitle: (title: string) => void;
  onStartGrading: () => void;
  isLoading: boolean;
  onSelectPreset: (preset: PresetSample) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  workbookImages,
  setWorkbookImages,
  answerKeyImages,
  setAnswerKeyImages,
  manualAnswerKey,
  setManualAnswerKey,
  subject,
  setSubject,
  workbookTitle,
  setWorkbookTitle,
  onStartGrading,
  isLoading,
  onSelectPreset,
}) => {
  const [cameraTarget, setCameraTarget] = useState<'workbook' | 'answerKey' | null>(null);
  const [isManualKeyOpen, setIsManualKeyOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Curriculum Selector States (2022 Revision vs 2015 Revision from Seoul Office of Education PDF)
  const [curriculumRev, setCurriculumRev] = useState<'rev2022' | 'rev2015'>('rev2022');
  const [activeGroupKey, setActiveGroupKey] = useState<string>('수학');

  // File to base64 helper
  const handleFileUpload = (files: FileList | null, target: 'workbook' | 'answerKey') => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        if (base64) {
          if (target === 'workbook') {
            setWorkbookImages((prev) => [...prev, base64]);
          } else {
            setAnswerKeyImages((prev) => [...prev, base64]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeWorkbookImage = (index: number) => {
    setWorkbookImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeAnswerKeyImage = (index: number) => {
    setAnswerKeyImages((prev) => prev.filter((_, i) => i !== index));
  };

  const selectedCurriculumGroup = SEOUL_CURRICULUM_2026[activeGroupKey] || SEOUL_CURRICULUM_2026['수학'];

  const handlePickCourse = (courseName: string, categoryLabel: string) => {
    setSubject(`${courseName} (${categoryLabel})`);
    if (!workbookTitle || workbookTitle.includes('모의고사') || workbookTitle.includes('실전')) {
      setWorkbookTitle(`${courseName} 실전 문제집`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-5 sm:py-8 space-y-5 sm:space-y-8">
      {/* Top Banner / Heading */}
      <div className="text-center max-w-2xl mx-auto px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] sm:text-xs font-semibold mb-2.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>2026 서울시교육청 교육과정 편성·운영 방향 지침 준수</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
          문제집과 답안지 사진을 업로드하세요
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
          학생이 푼 문제집 페이지를 촬영해 올리면, AI가 페이지(쪽수)와 문제 번호, 손글씨 답을 인식하여 자동으로 채점합니다.
        </p>
      </div>

      {/* 1-Click Preset Bar */}
      <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-slate-50 border border-indigo-100 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
              <h3 className="font-bold text-slate-900 text-xs sm:text-base">
                사진이 없으신가요? 1-클릭 실전 예시로 바로 체험하기
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
              수학, 과학, 사회·한국사, 영어 등 사용자 시나리오가 구현된 실전 예시 세트입니다.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
            {PRESET_SAMPLES.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset)}
                className="flex-1 sm:flex-initial px-3 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-indigo-600 hover:text-white border border-slate-200 text-slate-800 text-[11px] sm:text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 group"
              >
                <span>{preset.title.split('(')[0]}</span>
                <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded bg-slate-100 group-hover:bg-indigo-700 group-hover:text-white text-slate-600 font-semibold">
                  {preset.pages}
                </span>
                <ArrowRight className="w-3 h-3 text-indigo-500 group-hover:text-white" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Meta Settings: OFFICIAL SEOUL EDUCATION CURRICULUM SUBJECT SELECTOR */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <label className="text-sm font-black text-slate-900">
                과목 선택 (2026학년도 고등학교 교육과정 표준 편제)
              </label>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              서울특별시교육청 2022 개정(고1·2학년) 및 2015 개정(고3학년) 고교 편제 과목 완벽 적용
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsGuideOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors self-start sm:self-auto"
          >
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>교육과정 가이드북 열기</span>
          </button>
        </div>

        {/* 1. Grade / Revision Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurriculumRev('rev2022')}
            className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              curriculumRev === 'rev2022'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>2022 개정 (고1·2학년 / 2028 통합수능)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/40 text-white hidden sm:inline">
              최신
            </span>
          </button>

          <button
            type="button"
            onClick={() => setCurriculumRev('rev2015')}
            className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
              curriculumRev === 'rev2015'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>2015 개정 (고3 수험생 / 2027 수능)</span>
          </button>
        </div>

        {/* 2. Subject Group Selector (수학, 과학, 사회, 국어, 영어, 기술·가정/정보, 제2외국어, 체육/예술) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {Object.keys(SEOUL_CURRICULUM_2026).map((groupName) => (
            <button
              key={groupName}
              type="button"
              onClick={() => setActiveGroupKey(groupName)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeGroupKey === groupName
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {groupName}
            </button>
          ))}
        </div>

        {/* 3. Detailed Course Chips Grid based on Revision */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
          {curriculumRev === 'rev2022' ? (
            /* 2022 Revision Categories: 공통 / 일반선택 / 진로선택 / 융합선택 */
            <div className="space-y-3">
              {/* Common */}
              {selectedCurriculumGroup.rev2022.common.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-indigo-700 block mb-1.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    공통 과목 (1학년 필수)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCurriculumGroup.rev2022.common.map((course) => {
                      const isSelected = subject.includes(course);
                      return (
                        <button
                          key={course}
                          type="button"
                          onClick={() => handlePickCourse(course, '공통')}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-xs font-bold'
                              : 'bg-white hover:bg-indigo-50 text-slate-700 border border-slate-200 hover:border-indigo-300'
                          }`}
                        >
                          {course}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* General Selection (2028 SAT) */}
              {selectedCurriculumGroup.rev2022.general.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-blue-700 block mb-1.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    일반 선택 과목 (2028 수능 출제 핵심)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCurriculumGroup.rev2022.general.map((course) => {
                      const isSelected = subject.includes(course);
                      return (
                        <button
                          key={course}
                          type="button"
                          onClick={() => handlePickCourse(course, '일반선택')}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-xs font-bold'
                              : 'bg-white hover:bg-blue-50 text-slate-700 border border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          {course}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Career Selection */}
              {selectedCurriculumGroup.rev2022.career.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-amber-700 block mb-1.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    진로 선택 과목 (심화 전공)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCurriculumGroup.rev2022.career.map((course) => {
                      const isSelected = subject.includes(course);
                      return (
                        <button
                          key={course}
                          type="button"
                          onClick={() => handlePickCourse(course, '진로선택')}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-amber-600 text-white shadow-xs font-bold'
                              : 'bg-white hover:bg-amber-50 text-slate-700 border border-slate-200 hover:border-amber-300'
                          }`}
                        >
                          {course}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Fusion Selection */}
              {selectedCurriculumGroup.rev2022.fusion.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-rose-700 block mb-1.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    융합 선택 과목 (석차등급 미산출 성취평가 과목)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCurriculumGroup.rev2022.fusion.map((course) => {
                      const isSelected = subject.includes(course);
                      return (
                        <button
                          key={course}
                          type="button"
                          onClick={() => handlePickCourse(course, '융합선택')}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-rose-600 text-white shadow-xs font-bold'
                              : 'bg-white hover:bg-rose-50 text-slate-700 border border-slate-200 hover:border-rose-300'
                          }`}
                        >
                          {course}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* 2015 Revision Categories for 3rd grade */
            <div className="space-y-3">
              {/* Common */}
              {selectedCurriculumGroup.rev2015.common.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-indigo-700 block mb-1">
                    공통 과목:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCurriculumGroup.rev2015.common.map((course) => (
                      <button
                        key={course}
                        type="button"
                        onClick={() => handlePickCourse(course, '공통')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          subject.includes(course)
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        {course}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* General Selection */}
              <div>
                <span className="text-[11px] font-bold text-blue-700 block mb-1">
                  일반 선택 과목:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCurriculumGroup.rev2015.general.map((course) => (
                    <button
                      key={course}
                      type="button"
                      onClick={() => handlePickCourse(course, '일반선택')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        subject.includes(course)
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {course}
                    </button>
                  ))}
                </div>
              </div>

              {/* Career Selection */}
              <div>
                <span className="text-[11px] font-bold text-amber-700 block mb-1">
                  진로 선택 과목:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCurriculumGroup.rev2015.career.map((course) => (
                    <button
                      key={course}
                      type="button"
                      onClick={() => handlePickCourse(course, '진로선택')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        subject.includes(course)
                          ? 'bg-amber-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {course}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Workbook Title Input */}
        <div className="pt-2">
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            문제집 이름 / 시험명 (예: 완자, 쎈, 수능특강, 모의고사)
          </label>
          <input
            type="text"
            value={workbookTitle}
            onChange={(e) => setWorkbookTitle(e.target.value)}
            placeholder="예: 2026 쎈 공통수학1 32~45쪽 / 완자 통합과학 실전"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-xs sm:text-sm bg-white shadow-2xs"
          />
        </div>
      </div>

      {/* Upload Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel 1: Workbook / Solved Answer Sheet */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-base">학생 문제집 / 답안지 사진</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                필수
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              학생이 직접 문제를 풀고 체크한 문제집이나 OMR/답안지 사진을 올려주세요. (여러 장 가능)
            </p>

            {/* Drop / Select zone */}
            <div className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl p-6 text-center transition-all bg-slate-50/40 hover:bg-indigo-50/30 group">
              <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-indigo-600 mx-auto mb-2 transition-colors" />
              <p className="text-xs font-bold text-slate-700 mb-1">
                사진 파일을 끌어다 놓거나 선택하세요
              </p>
              <p className="text-[11px] text-slate-400 mb-4">JPG, PNG, HEIC 등 지원</p>

              <div className="flex items-center justify-center gap-2">
                <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-2xs">
                  파일 찾기
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files, 'workbook')}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setCameraTarget('workbook')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                  카메라 촬영
                </button>
              </div>
            </div>

            {/* Thumbnail list */}
            {workbookImages.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>업로드된 문제집 ({workbookImages.length}장)</span>
                  <span className="text-[11px] text-slate-400">클릭하여 확대</span>
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {workbookImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-lg overflow-hidden border border-slate-200 aspect-3/4 bg-slate-100"
                    >
                      <img
                        src={img}
                        alt={`Workbook page ${idx + 1}`}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setPreviewImage(img)}
                      />
                      <span className="absolute top-1 left-1 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        P.{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeWorkbookImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        title="삭제"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Panel 2: Answer Key Sheet */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-base">정답지 / 해설지 (선택)</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                선택 사항
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              정답표 사진을 올리거나 수동 입력하면 더 빠르고 정확하게 100% 매칭 채점됩니다. (생략 시 AI 자체 정답 판별)
            </p>

            {/* Drop / Select zone */}
            <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 text-center transition-all bg-slate-50/40 hover:bg-blue-50/30 group">
              <FileText className="w-10 h-10 text-slate-400 group-hover:text-blue-600 mx-auto mb-2 transition-colors" />
              <p className="text-xs font-bold text-slate-700 mb-1">
                정답표/해설지 사진 업로드 또는 직접 입력
              </p>
              <p className="text-[11px] text-slate-400 mb-4">정답표 사진 또는 번호표 텍스트 입력</p>

              <div className="flex items-center justify-center gap-2 flex-wrap">
                <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-2xs">
                  사진 찾기
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files, 'answerKey')}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setCameraTarget('answerKey')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                  촬영
                </button>
                <button
                  type="button"
                  onClick={() => setIsManualKeyOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-indigo-700 text-xs font-semibold transition-colors"
                >
                  <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
                  {manualAnswerKey ? '정답표 수정' : '정답 직접 입력'}
                </button>
              </div>
            </div>

            {/* Manual key status or uploaded keys */}
            {manualAnswerKey && (
              <div className="mt-3 p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 overflow-hidden">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="font-semibold text-indigo-900 truncate">
                    수동 정답표 등록됨: {manualAnswerKey}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setManualAnswerKey('')}
                  className="text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {answerKeyImages.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-bold text-slate-700">
                  업로드된 정답지 ({answerKeyImages.length}장)
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {answerKeyImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-lg overflow-hidden border border-slate-200 aspect-3/4 bg-slate-100"
                    >
                      <img
                        src={img}
                        alt={`Answer key ${idx + 1}`}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setPreviewImage(img)}
                      />
                      <button
                        type="button"
                        onClick={() => removeAnswerKeyImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        title="삭제"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="pt-4 flex flex-col items-center">
        <button
          type="button"
          onClick={onStartGrading}
          disabled={isLoading || (workbookImages.length === 0 && !manualAnswerKey)}
          className={`w-full sm:w-auto min-w-[280px] py-4 px-8 rounded-2xl font-extrabold text-base transition-all shadow-lg flex items-center justify-center gap-2.5 ${
            isLoading || (workbookImages.length === 0 && !manualAnswerKey)
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800 shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.01]'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>AI 자동 채점 및 오답 분석 시작</span>
        </button>
        {workbookImages.length === 0 && !manualAnswerKey && (
          <p className="text-xs text-slate-400 mt-2">
            문제집 사진을 올리거나 상단의 1-클릭 예시 문제집을 선택하세요.
          </p>
        )}
      </div>

      {/* Camera Capture Modal */}
      <CameraCaptureModal
        isOpen={cameraTarget !== null}
        onClose={() => setCameraTarget(null)}
        title={cameraTarget === 'workbook' ? '문제집/답안지 사진 촬영' : '정답지/해설지 사진 촬영'}
        onCapture={(dataUrl) => {
          if (cameraTarget === 'workbook') {
            setWorkbookImages((prev) => [...prev, dataUrl]);
          } else if (cameraTarget === 'answerKey') {
            setAnswerKeyImages((prev) => [...prev, dataUrl]);
          }
        }}
      />

      {/* Manual Key Modal */}
      <ManualKeyModal
        isOpen={isManualKeyOpen}
        onClose={() => setIsManualKeyOpen(false)}
        currentKey={manualAnswerKey}
        onSaveKey={(val) => setManualAnswerKey(val)}
      />

      {/* Curriculum Guide Modal */}
      <CurriculumGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onSelectCurriculumSubject={(courseName) => {
          setSubject(courseName);
          setWorkbookTitle(`${courseName} 실전 문제집`);
        }}
      />

      {/* Image Preview Lightbox */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="max-w-3xl max-h-[90vh] bg-transparent">
            <img
              src={previewImage}
              alt="Expanded preview"
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
