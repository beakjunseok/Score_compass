import React, { useState } from 'react';
import {
  X,
  Landmark,
  FileText,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  BookOpen,
  Search,
  Database,
  Layers,
  GraduationCap,
  Calendar,
  BookMarked,
  ArrowRight,
  ShieldCheck,
  Check,
  Loader2,
  Terminal,
} from 'lucide-react';
import { KoreanDictItem, KoreanDictSearchResponse } from '../types';

interface PublicDataBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialKeyword?: string;
  initialTab?: 'architecture' | 'krdictConsole' | 'recommendedApis';
}

export const PublicDataBadgeModal: React.FC<PublicDataBadgeModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'architecture',
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'krdictConsole' | 'recommendedApis'>(
    initialTab
  );

  // Live test console state
  const [testWord, setTestWord] = useState('귀납');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<KoreanDictSearchResponse | null>(null);
  const [testError, setTestError] = useState<string | null>(null);

  const runLiveTest = async (wordToTest: string) => {
    const q = wordToTest.trim();
    if (!q) return;
    setIsTesting(true);
    setTestError(null);
    try {
      const res = await fetch(`/api/krdict/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) {
        throw new Error(`API 통신 실패 (HTTP ${res.status})`);
      }
      const data: KoreanDictSearchResponse = await res.json();
      setTestResult(data);
    } catch (e: any) {
      setTestError(e?.message || '실시간 API 호출 중 오류');
    } finally {
      setIsTesting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden font-sans">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/70 via-purple-50/40 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg text-slate-900">
                  ScoreCompass 공공데이터 연계 센터
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  국립국어원 Open API 연동 완료
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 break-keep">
                국립국어원(한국어기초사전) · 교육부(에듀넷) · 평가원 공식 데이터 기반 오답 처방 아키텍처
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

        {/* Tab Navigation */}
        <div className="flex items-center px-4 sm:px-6 pt-3 border-b border-slate-200 bg-white gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'architecture'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>핵심 교육데이터 연계 체계 (3대 축)</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('krdictConsole');
              if (!testResult && !isTesting) {
                runLiveTest(testWord);
              }
            }}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'krdictConsole'
                ? 'border-purple-600 text-purple-700 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4 text-purple-600" />
            <span>국립국어원 사전 API 실시간 테스트</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 font-bold">
              LIVE 200 OK
            </span>
          </button>
          <button
            onClick={() => setActiveTab('recommendedApis')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'recommendedApis'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>확장 추천 공공데이터</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-700 text-xs sm:text-sm">
          {activeTab === 'architecture' ? (
            <div className="space-y-4">
              {/* Architecture Explanation Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 leading-relaxed space-y-2">
                <div className="flex items-center gap-2 text-indigo-950 font-bold text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="break-keep font-extrabold">ScoreCompass 공공데이터 연계 원칙</span>
                </div>
                <p className="text-xs sm:text-[13px] text-indigo-900 leading-relaxed break-keep">
                  민간 사설 문제집(쎈, 완자, 마더텅 등)의 문항·정답 저작권은 출판사 소유이므로 정부 공공데이터에 사설 문제집 DB는 존재하지 않습니다.
                  따라서 <strong>채점은 고성능 AI 멀티모달 비전 OCR</strong>이 사진 속 페이지와 손글씨 마킹을 3초 만에 직접 인식하고, 
                  <strong>공공데이터는 국립국어원 개념어 표준 뜻풀이, 국가 성취기준 분석 및 교육부 공식 형성평가 복습 문항 매핑</strong>에 가장 이상적으로 활용됩니다.
                </p>
              </div>

              {/* 3 Core Integrated Systems */}
              <div className="space-y-3">
                {/* 1. 국립국어원 한국어기초사전 Open API (신규 연동) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-purple-300 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                        1
                      </span>
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 break-keep">
                        국립국어원 한국어기초사전 교과 개념어 Open API
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 shrink-0">
                      실시간 REST API (HTTP 200 OK)
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep">
                    국어, 사회, 과학, 수학, 한국사 등 교과서 및 수능/내신 지문에 등장하는 <strong>필수 개념어, 한자어, 학술 어휘의 표준 뜻풀이 및 발음·용례</strong>를 실시간으로 제공합니다. 학생이 오답 노트에서 모르는 단어를 클릭하면 팝업으로 즉시 해결하여 <strong>어휘력·문해력 부족으로 인한 오답을 근본적으로 방지</strong>합니다.
                  </p>
                  <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-purple-950 font-mono space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span>API 엔드포인트: https://krdict.korean.go.kr/api/search</span>
                      <span className="text-emerald-700 font-bold">인증키: F15D260C...10BB5</span>
                    </div>
                    <div className="text-[11px] text-purple-800">
                      연계 단어: 연역, 귀납, 항상성, 한계효용, 복선, 배타적, 이차방정식, 판별식 등
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 font-mono">
                    <span className="break-keep">제공처: 국립국어원 (krdict.korean.go.kr)</span>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('krdictConsole');
                        runLiveTest('귀납');
                      }}
                      className="text-purple-600 font-bold hover:underline cursor-pointer"
                    >
                      실시간 콘솔 열기 →
                    </button>
                  </div>
                </div>

                {/* 2. 교육부 에듀넷 형성평가 문항 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center shrink-0">
                        2
                      </span>
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 break-keep">
                        교육부 에듀넷 학습·평가자료 (티-클리어)
                      </h4>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                      공식 형성평가 쌍둥이 문제
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep">
                    초·중·고 교육과정 기반 자료이며, 학습목표·학습활동과 함께 <strong>공식 형성평가 문항 및 정답·해설</strong>을 수록합니다. 학생이 문제집에서 특정 문제를 틀렸을 때, 동일 단원 공식 형성평가 문항을 즉시 불러와 복습할 수 있습니다.
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 font-mono">
                    <span className="break-keep">데이터 항목: 단원별 학습목표, 형성평가 문항, 정답 및 해설</span>
                    <span className="text-emerald-600 font-bold shrink-0">🟢 연계 완료</span>
                  </div>
                </div>

                {/* 3. 국가교육과정 성취기준 (NCIC) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center shrink-0">
                        3
                      </span>
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 break-keep">
                        국가교육과정 개정 교육과정문서 및 성취기준 (NCIC)
                      </h4>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                      학습 결손 영역 진단
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep">
                    단순히 <strong>"37쪽 ②번 틀림"</strong>에서 끝나는 것이 아니라, <strong>"37쪽 ②번 틀림 → 중학교 2학년 수학 → 일차함수 → 성취기준 [9수03-02]"</strong>처럼 국가 교육과정상 학업 성취 기준을 부여하여 오답의 영역별 성취도를 체계적으로 진단합니다.
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 font-mono">
                    <span className="break-keep">출처: 국가교육과정정보센터 (NCIC) 2022/2026 개정 교육과정</span>
                    <span className="text-indigo-600 font-bold shrink-0">🟢 100% 탑재</span>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'krdictConsole' ? (
            /* Live API Testing Console */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-purple-950 text-xs sm:text-sm leading-relaxed space-y-2 break-keep">
                <div className="flex items-center justify-between">
                  <span className="font-black flex items-center gap-1.5 text-purple-900">
                    <Terminal className="w-4 h-4 text-purple-600" />
                    국립국어원 한국어기초사전 실시간 REST API 테스트 콘솔
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                    HTTP 200 OK
                  </span>
                </div>
                <p className="text-xs text-purple-800">
                  학생이 틀린 문제의 지문이나 오답 노트에서 어려운 개념어를 클릭했을 때, 실제 국립국어원 서버와 통신하여 실시간으로 뜻풀이를 가져오는 과정을 직접 확인할 수 있습니다.
                </p>
                <div className="text-[11px] font-mono text-purple-900 bg-white/80 p-2.5 rounded-xl border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span>엔드포인트: https://krdict.korean.go.kr/api/search</span>
                  <span className="font-bold text-indigo-700">인증키: F15D260CF716C44BAC015D6490010BB5</span>
                </div>
              </div>

              {/* Test Input & Preset buttons */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={testWord}
                      onChange={(e) => setTestWord(e.target.value)}
                      placeholder="검색할 개념어 입력 (예: 귀납, 항상성, 한계효용)"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:border-purple-600 focus:outline-hidden"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          runLiveTest(testWord);
                        }
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => runLiveTest(testWord)}
                    disabled={isTesting || !testWord.trim()}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                  >
                    {isTesting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>통신 중</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-3.5 h-3.5" />
                        <span>실시간 호출</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 6 Requested Concept Chips */}
                <div className="flex items-center gap-1.5 flex-wrap text-xs pt-1">
                  <span className="text-[11px] text-slate-400 font-bold shrink-0">
                    추천 테스트 단어:
                  </span>
                  {['연역', '귀납', '항상성', '한계효용', '복선', '배타적'].map((word) => (
                    <button
                      key={word}
                      type="button"
                      onClick={() => {
                        setTestWord(word);
                        runLiveTest(word);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-800 text-[11px] font-semibold border border-slate-200 transition-colors cursor-pointer"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Test Response Display */}
              {isTesting ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-400 flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                  <span className="text-xs font-semibold">
                    국립국어원 서버(krdict.korean.go.kr)와 실시간 통신 중...
                  </span>
                </div>
              ) : testError ? (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {testError}
                </div>
              ) : testResult ? (
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3 font-mono">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                    <span className="text-slate-700 font-bold">
                      검색어: <span className="text-purple-700">'{testResult.query}'</span> (총 {testResult.total}건)
                    </span>
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      HTTP 200 OK
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {testResult.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 font-sans"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                              {item.word}
                            </span>
                            {item.origin && (
                              <span className="text-xs font-bold px-1.5 py-0.2 bg-purple-100 text-purple-800 rounded font-serif">
                                {item.origin}
                              </span>
                            )}
                            {item.pronunciation && (
                              <span className="text-xs text-slate-400 font-mono">
                                [{item.pronunciation}]
                              </span>
                            )}
                            {item.pos && (
                              <span className="text-[10px] px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded">
                                {item.pos}
                              </span>
                            )}
                          </div>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-purple-600 font-bold hover:underline flex items-center gap-0.5"
                            >
                              <span>국립국어원 상세</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-normal">
                          {item.definition}
                        </p>
                        {item.educationalNote && (
                          <div className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200">
                            💡 <strong>교과 가이드:</strong> {item.educationalNote}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            /* Recommended Future APIs Tab */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed space-y-1 break-keep">
                <span className="font-black flex items-center gap-1.5 text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  ScoreCompass 확장 공공데이터 분석
                </span>
                <p className="text-xs text-amber-800">
                  <strong>학생들의 문제집 채점과 성적 향상에 실질적인 도움을 주는 추가 공공데이터</strong> 로드맵입니다.
                </p>
              </div>

              {/* Candidate APIs */}
              <div className="space-y-3.5">
                {/* 1. NEIS 학사일정 및 시험일정 API */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 break-keep">
                        1. 나이스(NEIS) 학사일정 & 중간·기말 시험일정 Open API
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 shrink-0">
                      학사일정 연계
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed break-keep">
                    전국 초·중·고등학교의 <strong>1학기/2학기 중간고사, 기말고사, 모의고사 일정</strong>을 실시간으로 가져와 시험 카운트다운(D-Day)과 오답 집중 복습 기간을 자동으로 편성합니다.
                  </p>
                  <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-100 flex items-center justify-between">
                    <span>제공처: 나이스 교육정보 개방포털 (open.neis.go.kr)</span>
                    <span className="text-blue-600 font-bold">오픈API 제공 중</span>
                  </div>
                </div>

                {/* 2. 한국교육과정평가원 수능/모의평가 문항 통계 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 break-keep">
                        2. 한국교육과정평가원(KICE) 수능·학력평가 문항 및 정답률 공공데이터
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                      수험생 필수 (평가원 DB)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed break-keep">
                    한국교육과정평가원이 주관하는 <strong>대학수학능력시험 및 6월/9월 모의평가 기출 문항, 배점, 정답률 데이터</strong>로 전국 정답률 비교 분석을 제공합니다.
                  </p>
                  <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-100 flex items-center justify-between">
                    <span>제공처: 공공데이터포털 / 한국교육과정평가원 (kice.re.kr)</span>
                    <span className="text-emerald-600 font-bold">공공데이터 등록</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
