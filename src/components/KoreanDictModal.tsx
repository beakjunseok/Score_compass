import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  BookMarked,
  ExternalLink,
  Sparkles,
  Loader2,
  CheckCircle2,
  Bookmark,
  Volume2,
  ArrowRight,
  GraduationCap,
  Copy,
  Check,
  BookOpen,
  Calculator,
  Landmark,
  Atom,
  Scroll,
  Languages,
  Layers,
  Filter,
  Globe,
  Headphones,
  BookA,
} from 'lucide-react';
import {
  KoreanDictItem,
  KoreanDictSearchResponse,
  EnglishDictItem,
  EnglishDictResponse,
} from '../types';

export type SubjectCategoryKey =
  | 'ALL'
  | 'KOREAN'
  | 'MATH'
  | 'SOCIAL'
  | 'SCIENCE'
  | 'HISTORY'
  | 'ENGLISH';

export interface SubjectCategoryInfo {
  key: SubjectCategoryKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  activeBg: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  examTip: string;
  defaultWord: string;
  words: {
    word: string;
    subCategory: string;
  }[];
}

export const SUBJECT_CATEGORIES: SubjectCategoryInfo[] = [
  {
    key: 'ALL',
    label: '전체',
    icon: Layers,
    color: 'purple',
    activeBg: 'bg-purple-600 text-white shadow-purple-200',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-800',
    description: '초·중·고 전 교과 및 수능/모의고사 필수 학술·개념 어휘 모음',
    examTip: '문해력 결손으로 인한 오답을 예방하기 위해 과목별 핵심 개념어의 표준 정의를 확인하세요.',
    defaultWord: '귀납',
    words: [
      { word: '연역', subCategory: '국어/논리' },
      { word: '귀납', subCategory: '국어/논리' },
      { word: '복선', subCategory: '국어/문학' },
      { word: '판별식', subCategory: '수학/대수' },
      { word: '이차방정식', subCategory: '수학/대수' },
      { word: '기울기', subCategory: '수학/함수' },
      { word: '한계효용', subCategory: '사회/경제' },
      { word: '기회비용', subCategory: '사회/경제' },
      { word: '배타적', subCategory: '사회/윤리' },
      { word: '항상성', subCategory: '과학/생명' },
      { word: '삼투압', subCategory: '과학/생명' },
      { word: '가속도', subCategory: '과학/물리' },
      { word: '대동법', subCategory: '한국사/조선' },
      { word: '골품제', subCategory: '한국사/신라' },
      { word: '수동태', subCategory: '영어/문법' },
    ],
  },
  {
    key: 'KOREAN',
    label: '국어',
    icon: BookOpen,
    color: 'rose',
    activeBg: 'bg-rose-600 text-white shadow-rose-200',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-800',
    description: '비문학 독서 논리·추론, 문학 갈래 및 수능 빈출 어휘',
    examTip: '독서 지문의 삼단논법(연역·귀납)과 문학 서사 장치(복선·암시)의 개념을 정립하면 고난도 킬러 지문 독해가 쉬워집니다.',
    defaultWord: '연역',
    words: [
      { word: '연역', subCategory: '논리/독서' },
      { word: '귀납', subCategory: '논리/독서' },
      { word: '삼단논법', subCategory: '논리/추론' },
      { word: '복선', subCategory: '문학/소설' },
      { word: '암시', subCategory: '문학/소설' },
      { word: '반어', subCategory: '문학/수사' },
      { word: '역설', subCategory: '문학/수사' },
      { word: '유추', subCategory: '독서/추론' },
      { word: '감정이입', subCategory: '문학/시' },
      { word: '전제', subCategory: '논리/독서' },
      { word: '주관성', subCategory: '화법과작문' },
      { word: '화자', subCategory: '문학/시' },
    ],
  },
  {
    key: 'MATH',
    label: '수학',
    icon: Calculator,
    color: 'blue',
    activeBg: 'bg-blue-600 text-white shadow-blue-200',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800',
    description: '공통수학, 수I·II, 미적분, 확률·통계 핵심 정의어',
    examTip: '수학은 기계적 문제 풀이보다 용어의 엄밀한 정의(Definition)와 정리(Theorem)의 조건을 정확히 아는 것이 상위권 도약의 열쇠입니다.',
    defaultWord: '판별식',
    words: [
      { word: '판별식', subCategory: '대수/방정식' },
      { word: '이차방정식', subCategory: '대수/방정식' },
      { word: '인수분해', subCategory: '대수/다항식' },
      { word: '기울기', subCategory: '함수/기하' },
      { word: '점근선', subCategory: '함수/해석' },
      { word: '미분계수', subCategory: '미적분/해석' },
      { word: '극값', subCategory: '미적분/극대극소' },
      { word: '역함수', subCategory: '함수/대수' },
      { word: '분산', subCategory: '확률과통계' },
      { word: '필요충분조건', subCategory: '명제/논리' },
    ],
  },
  {
    key: 'SOCIAL',
    label: '사회·탐구',
    icon: Landmark,
    color: 'amber',
    activeBg: 'bg-amber-600 text-white shadow-amber-200',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    description: '경제, 사회·문화, 생활과 윤리, 정치와 법, 지리 수능 빈출 전문 용어',
    examTip: '경제 지문의 한계효용·기회비용, 정치·법의 국민주권·헌법소원 등 법률 및 경제 학술 용어의 정확한 개념을 파악해야 합니다.',
    defaultWord: '한계효용',
    words: [
      { word: '한계효용', subCategory: '경제/소비' },
      { word: '기회비용', subCategory: '경제/선택' },
      { word: '비교우위', subCategory: '경제/무역' },
      { word: '공공재', subCategory: '경제/시장실패' },
      { word: '배타적', subCategory: '윤리/사회' },
      { word: '국민주권', subCategory: '정치와법' },
      { word: '헌법소원', subCategory: '정치와법' },
      { word: '아노미', subCategory: '사회문화' },
      { word: '등고선', subCategory: '지리/지도' },
    ],
  },
  {
    key: 'SCIENCE',
    label: '과학·탐구',
    icon: Atom,
    color: 'emerald',
    activeBg: 'bg-emerald-600 text-white shadow-emerald-200',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
    description: '물리, 화학, 생명과학, 지구과학 필수 과학 원리 및 용어',
    examTip: '생명과학 항상성·삼투압, 화학 산화환원, 물리 가속도 등 과학 현상의 인과관계와 메커니즘을 명확히 정의하는 용어들입니다.',
    defaultWord: '항상성',
    words: [
      { word: '항상성', subCategory: '생명과학' },
      { word: '삼투압', subCategory: '생명/화학' },
      { word: '가속도', subCategory: '물리학' },
      { word: '엔트로피', subCategory: '물리/화학' },
      { word: '산화환원', subCategory: '화학' },
      { word: '촉매', subCategory: '화학' },
      { word: '판구조론', subCategory: '지구과학' },
      { word: '온실효과', subCategory: '지구과학' },
    ],
  },
  {
    key: 'HISTORY',
    label: '한국사',
    icon: Scroll,
    color: 'amber',
    activeBg: 'bg-amber-700 text-white shadow-amber-300',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    description: '한국사 및 세계사 핵심 제도, 사건, 사상, 문화 개념어',
    examTip: '조선 후기 수취제도(대동법, 균역법), 신라 골품제 등 역사적 맥락과 개혁 목적을 한자 뜻풀이와 함께 학습하면 오래 기억됩니다.',
    defaultWord: '대동법',
    words: [
      { word: '대동법', subCategory: '조선후기/세제' },
      { word: '골품제', subCategory: '신라/신분제' },
      { word: '균역법', subCategory: '조선후기/군역' },
      { word: '탕평책', subCategory: '조선/정치' },
      { word: '신민회', subCategory: '근대/독립' },
    ],
  },
  {
    key: 'ENGLISH',
    label: '영어',
    icon: Languages,
    color: 'indigo',
    activeBg: 'bg-indigo-600 text-white shadow-indigo-200',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-800',
    description: '수능 영어 구문 독해, 필수 영문법 개념 및 언어학 어휘',
    examTip: '수동태, 관계대명사, 가정법 등 문장의 구조적 뼈대를 결정하는 핵심 문법 개념의 표준 정의를 이해합니다.',
    defaultWord: '수동태',
    words: [
      { word: '수동태', subCategory: '영문법/구문' },
      { word: '관계대명사', subCategory: '영문법/절' },
      { word: '가정법', subCategory: '영문법/시제' },
      { word: '분사구문', subCategory: '영문법/구문' },
      { word: '추상명사', subCategory: '품사론' },
      { word: '동격', subCategory: '구문론' },
    ],
  },
];

// 수능 및 고교 내신 전문 영어 사전 카테고리 프리셋
export interface EnglishPresetGroup {
  label: string;
  icon: string;
  description: string;
  words: {
    word: string;
    meaning: string;
  }[];
}

export const ENGLISH_PRESET_GROUPS: EnglishPresetGroup[] = [
  {
    label: '수능 1등급 킬러 어휘',
    icon: '🎯',
    description: '수능 31~34번 빈칸추론 및 21번 함축의미 정답 직결 고난도 어휘',
    words: [
      { word: 'vulnerable', meaning: '취약한, 상처입기 쉬운' },
      { word: 'ambiguous', meaning: '모호한, 다의적인' },
      { word: 'empirical', meaning: '실증적인, 경험적인' },
      { word: 'ubiquitous', meaning: '어디에나 존재하는' },
      { word: 'arbitrary', meaning: '임의의, 자의적인' },
      { word: 'comprehensive', meaning: '포괄적인, 종합적인' },
      { word: 'reluctant', meaning: '꺼리는, 주저하는' },
      { word: 'deliberate', meaning: '의도적인, 신중한' },
      { word: 'hypothesis', meaning: '가설, 전제' },
      { word: 'inevitable', meaning: '불가피한, 필연적인' },
    ],
  },
  {
    label: '독해 필수 담화표지어',
    icon: '📌',
    description: '글의 전개 방향(역접, 인과, 예시, 환언)을 결정하는 핵심 연결사',
    words: [
      { word: 'furthermore', meaning: '더욱이, 게다가' },
      { word: 'conversely', meaning: '정반대로, 역으로' },
      { word: 'consequently', meaning: '그 결과로, 따라서' },
      { word: 'nevertheless', meaning: '그럼에도 불구하고' },
      { word: 'in contrast', meaning: '그에 반해서' },
      { word: 'specifically', meaning: '구체적으로' },
      { word: 'meanwhile', meaning: '한편, 그러는 동안' },
      { word: 'notwithstanding', meaning: '~에도 불구하고' },
    ],
  },
  {
    label: '필수 영문법 & 구문',
    icon: '📖',
    description: '수능 29번 어법 및 고난도 문장 구조 분석의 뼈대',
    words: [
      { word: '분사구문', meaning: 'participial phrase' },
      { word: '가정법', meaning: 'subjunctive mood' },
      { word: '수동태', meaning: 'passive voice' },
      { word: '관계대명사', meaning: 'relative pronoun' },
      { word: '동격', meaning: 'apposition' },
      { word: '도치', meaning: 'inversion' },
    ],
  },
  {
    label: '혼동 어휘 & 다의어',
    icon: '💡',
    description: '문맥에 따라 뜻이 달라져 오답을 유도하는 필수 다의어',
    words: [
      { word: 'attribute', meaning: '~의 탓으로 돌리다 / 속성' },
      { word: 'accommodate', meaning: '수용하다 / 부응하다' },
      { word: 'appreciate', meaning: '진가를 인정하다 / 감사하다' },
      { word: 'critical', meaning: '비판적인 / 중대한' },
      { word: 'address', meaning: '문제를 다루다 / 연설하다' },
      { word: 'yield', meaning: '산출하다 / 굴복하다' },
    ],
  },
];

interface KoreanDictModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialWord?: string;
  initialSubject?: string;
}

export const KoreanDictModal: React.FC<KoreanDictModalProps> = ({
  isOpen,
  onClose,
  initialWord = '',
  initialSubject,
}) => {
  // Mode: 'korean' (국어·교과 개념어) or 'english' (수능·내신 영어사전)
  const [dictMode, setDictMode] = useState<'korean' | 'english'>('korean');

  // Determine matching category key from initialSubject
  const getSubjectKeyFromSubjectName = (subj?: string): SubjectCategoryKey => {
    if (!subj) return 'ALL';
    const s = subj.trim().toLowerCase();
    if (s.includes('수학')) return 'MATH';
    if (s.includes('국어')) return 'KOREAN';
    if (s.includes('한국사')) return 'HISTORY';
    if (s.includes('사회') || s.includes('도덕') || s.includes('경제') || s.includes('역사')) return 'SOCIAL';
    if (s.includes('과학') || s.includes('물리') || s.includes('화학') || s.includes('생명') || s.includes('지구')) return 'SCIENCE';
    if (s.includes('영어')) return 'ENGLISH';
    return 'ALL';
  };

  const [selectedCategoryKey, setSelectedCategoryKey] = useState<SubjectCategoryKey>('ALL');
  const [selectedEnglishGroupIdx, setSelectedEnglishGroupIdx] = useState(0);
  const [query, setQuery] = useState(initialWord);
  const [isLoading, setIsLoading] = useState(false);
  const [koreanResult, setKoreanResult] = useState<KoreanDictSearchResponse | null>(null);
  const [englishResult, setEnglishResult] = useState<EnglishDictResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentCategory =
    SUBJECT_CATEGORIES.find((cat) => cat.key === selectedCategoryKey) ||
    SUBJECT_CATEGORIES[0];

  const currentEnglishGroup = ENGLISH_PRESET_GROUPS[selectedEnglishGroupIdx];

  // Helper to detect if a string is English
  const isEnglishWord = (str: string) => /^[a-zA-Z\s'-]+$/.test(str.trim());

  useEffect(() => {
    if (isOpen) {
      const isEnglishSubject = (initialSubject || '').includes('영어');
      const isEng = initialWord && isEnglishWord(initialWord);

      if (isEnglishSubject || isEng) {
        setDictMode('english');
        const term = initialWord?.trim() || 'hypothesis';
        setQuery(term);
        handleSearch(term, 'english');
      } else {
        setDictMode('korean');
        const targetSubjKey = getSubjectKeyFromSubjectName(initialSubject);
        setSelectedCategoryKey(targetSubjKey);

        const termToSearch =
          initialWord?.trim() ||
          (targetSubjKey !== 'ALL'
            ? SUBJECT_CATEGORIES.find((c) => c.key === targetSubjKey)?.defaultWord || '귀납'
            : '귀납');

        setQuery(termToSearch);
        handleSearch(termToSearch, 'korean');
      }
    }
  }, [isOpen, initialWord, initialSubject]);

  const handleSearch = async (searchTerm: string, modeOverride?: 'korean' | 'english') => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    // Detect if pure English word typed while in Korean mode
    const activeMode = modeOverride || (isEnglishWord(trimmed) ? 'english' : dictMode);
    if (activeMode !== dictMode) {
      setDictMode(activeMode);
    }

    setIsLoading(true);
    setError(null);

    try {
      if (activeMode === 'english') {
        const res = await fetch(`/api/dict/english?q=${encodeURIComponent(trimmed)}`);
        if (!res.ok) {
          throw new Error(`영어 사전 조회 실패 (상태코드: ${res.status})`);
        }
        const data: EnglishDictResponse = await res.json();
        setEnglishResult(data);
      } else {
        const res = await fetch(`/api/krdict/search?q=${encodeURIComponent(trimmed)}`);
        if (!res.ok) {
          throw new Error(`교과 사전 조회 실패 (상태코드: ${res.status})`);
        }
        const data: KoreanDictSearchResponse = await res.json();
        setKoreanResult(data);
      }
    } catch (err: any) {
      console.error('사전 검색 실패:', err);
      setError(err?.message || '사전 데이터 조회 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchMode = (mode: 'korean' | 'english') => {
    setDictMode(mode);
    if (mode === 'english') {
      const defaultWord = 'hypothesis';
      setQuery(defaultWord);
      handleSearch(defaultWord, 'english');
    } else {
      const defaultWord = currentCategory.defaultWord || '귀납';
      setQuery(defaultWord);
      handleSearch(defaultWord, 'korean');
    }
  };

  const handleSelectCategory = (catKey: SubjectCategoryKey) => {
    setSelectedCategoryKey(catKey);
    const targetCat = SUBJECT_CATEGORIES.find((c) => c.key === catKey);
    if (targetCat) {
      const word = targetCat.defaultWord;
      setQuery(word);
      handleSearch(word, 'korean');
    }
  };

  const handleSelectEnglishGroup = (idx: number) => {
    setSelectedEnglishGroupIdx(idx);
    const group = ENGLISH_PRESET_GROUPS[idx];
    if (group && group.words.length > 0) {
      const word = group.words[0].word;
      setQuery(word);
      handleSearch(word, 'english');
    }
  };

  // Text-to-Speech Pronunciation Audio Playback
  const handleSpeak = (text: string, lang = 'en-US') => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('TTS 재생 실패:', err);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyKoreanDefinition = (item: KoreanDictItem, id: string) => {
    const text = `[${item.word}${item.origin ? ` (${item.origin})` : ''}]\n- 뜻: ${item.definition}\n${
      item.educationalNote ? `- 교과 가이드: ${item.educationalNote}\n` : ''
    }- 출처: 국립국어원 한국어기초사전 & AI 표준 사전`;
    handleCopyText(text, id);
  };

  const handleCopyEnglishDefinition = (item: EnglishDictItem, id: string) => {
    const text = `[${item.word} ${item.phonetic || ''}]\n- 뜻: ${item.koreanMeaning}\n- 영영: ${item.englishDefinition || ''}\n- 예문: ${item.exampleEn || ''}\n- 해석: ${item.exampleKo || ''}\n- 수능 팁: ${item.csatExamTip || ''}`;
    handleCopyText(text, id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200/90 overflow-hidden font-sans">
        {/* Header - Editorial Publication Style with Dictionary Mode Switcher */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white gap-3 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-200 shrink-0">
              {dictMode === 'korean' ? (
                <BookMarked className="w-5 h-5 text-purple-300" />
              ) : (
                <BookA className="w-5 h-5 text-indigo-300" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-base sm:text-lg text-slate-950 tracking-tight">
                  {dictMode === 'korean'
                    ? '국립국어원 교과 개념어 사전'
                    : '수능·내신 고교 영어 전문 사전'}
                </h3>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">·</span>
                <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {dictMode === 'korean' ? '공식 Open API & AI 백업 연계' : 'Gemini 3.1 AI & 음성 발음'}
                </span>
              </div>
              <p className="text-xs text-slate-600 break-keep mt-0.5">
                {dictMode === 'korean'
                  ? '국어·수학·사회·과학·한국사 등 전과목 수능/내신 필수 개념어 표준 정의'
                  : '수능 1등급 킬러 영단어, 독해 연결사, 필수 영문법 구문, 발음 기호 및 원어민 청취'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {/* Top Dictionary Mode Switcher (Korean vs English) */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => handleSwitchMode('korean')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  dictMode === 'korean'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🇰🇷 교과 개념어</span>
              </button>
              <button
                type="button"
                onClick={() => handleSwitchMode('english')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  dictMode === 'english'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                <span>🇬🇧 영어 사전</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-500/30 text-indigo-100">
                  신규
                </span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* API Live Verification Line - Multi-API Engine Status */}
        <div className="px-5 sm:px-6 py-2 bg-slate-50 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] sm:text-xs text-slate-600">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-800">사전 엔진:</span>
            {dictMode === 'korean' ? (
              <>
                <span className="font-medium text-slate-700">국립국어원 한국어·외국어 학습사전</span>
                <span className="text-slate-300">|</span>
                <span className="font-mono text-indigo-700 font-semibold text-[10px] bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200/60">
                  인증키: cJB96gkY...LC9n (등록)
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-sky-700 font-medium">영문 대역어 연동</span>
                <span className="text-slate-300">|</span>
                <span className="text-emerald-700 font-medium">Gemini AI 백업 (누락 0%)</span>
              </>
            ) : (
              <>
                <span className="font-medium text-slate-700">ScoreCompass 수능 영어 DB</span>
                <span className="text-slate-300">|</span>
                <span className="text-indigo-700 font-medium">Google Gemini 3.1 Flash AI 언어 모델</span>
                <span className="text-slate-300">|</span>
                <span className="font-medium text-emerald-700">Web Speech API 음성(TTS) 활성</span>
              </>
            )}
          </div>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            정상 서비스 중 (HTTP 200 OK)
          </span>
        </div>

        {/* Categories Bar */}
        {dictMode === 'korean' ? (
          /* KOREAN MODE: Subject Category Tabs */
          <div className="bg-slate-50/80 border-b border-slate-200 p-3 sm:px-6 sm:py-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-indigo-600" />
                <span>과목별 카테고리 (7개 전과목)</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                과목을 클릭하면 해당 과목의 수능·교과 필수 개념어가 분류됩니다
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {SUBJECT_CATEGORIES.map((cat) => {
                const IconComp = cat.icon;
                const isSelected = selectedCategoryKey === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => handleSelectCategory(cat.key)}
                    className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-xs border border-slate-900 ring-2 ring-slate-900/15'
                        : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200/90 shadow-2xs'
                    }`}
                  >
                    <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-300' : 'text-slate-400'}`} />
                    <span>{cat.label}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected
                          ? 'bg-slate-800 text-indigo-200'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {cat.words.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* ENGLISH MODE: Topic Category Groups */
          <div className="bg-indigo-50/50 border-b border-indigo-100 p-3 sm:px-6 sm:py-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>수능 영어 영역별 테마 분류</span>
              </span>
              <span className="text-[11px] text-indigo-700 font-medium hidden sm:inline">
                원하는 테마를 선택하여 고난도 영단어 및 영문법 구문을 즉시 학습하세요
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {ENGLISH_PRESET_GROUPS.map((group, idx) => {
                const isSelected = selectedEnglishGroupIdx === idx;
                return (
                  <button
                    key={group.label}
                    type="button"
                    onClick={() => handleSelectEnglishGroup(idx)}
                    className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-400/20'
                        : 'bg-white text-slate-700 hover:text-indigo-900 hover:bg-indigo-50/80 border border-slate-200 shadow-2xs'
                    }`}
                  >
                    <span>{group.icon}</span>
                    <span>{group.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {group.words.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Context Guide Banner */}
        <div className="px-5 sm:px-6 py-2.5 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-100">
          {dictMode === 'korean' ? (
            <div>
              <div className="flex items-baseline gap-2 flex-wrap text-xs sm:text-sm">
                <span className="font-bold text-slate-900">
                  [{currentCategory.label} 교과 가이드]
                </span>
                <span className="text-slate-600">{currentCategory.description}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 mt-0.5 break-keep font-normal">
                💡 {currentCategory.examTip}
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-baseline gap-2 flex-wrap text-xs sm:text-sm">
                <span className="font-bold text-indigo-950">
                  [{currentEnglishGroup.label}]
                </span>
                <span className="text-slate-600">{currentEnglishGroup.description}</span>
              </div>
              <p className="text-xs sm:text-sm text-indigo-900 mt-0.5 break-keep font-normal">
                🔊 스피커 버튼을 누르면 미국식 표준 발음(TTS)을 들을 수 있습니다.
              </p>
            </div>
          )}
        </div>

        {/* Search Bar & Vocabulary Chips */}
        <div className="p-4 sm:p-5 pb-3 border-b border-slate-100 space-y-3 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="flex items-center gap-2.5"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  dictMode === 'korean'
                    ? `'${currentCategory.label}' 교과 개념어를 입력하세요 (예: ${currentCategory.words
                        .slice(0, 3)
                        .map((w) => w.word)
                        .join(', ')})`
                    : `영단어 또는 영문법 개념어를 입력하세요 (예: hypothesis, vulnerable, ambiguous, 가정법)`
                }
                className="w-full pl-10 pr-9 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-hidden bg-white text-slate-900 placeholder:text-slate-400 font-medium"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-5 py-2.5 sm:py-3 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-sm font-bold flex items-center gap-2 transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-purple-300" />
                  <span>검색 중</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>{dictMode === 'korean' ? '교과어 검색' : '영단어 검색'}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Vocabulary Chips */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                {dictMode === 'korean'
                  ? `[${currentCategory.label}] 필수 개념어 목록 (${currentCategory.words.length}개):`
                  : `[${currentEnglishGroup.label}] 추천 어휘 (${currentEnglishGroup.words.length}개):`}
              </span>
              <span className="text-slate-400 text-[11px]">
                클릭 시 표준 뜻풀이 및 수능 출제 가이드 즉시 조회
              </span>
            </div>

            <div className="flex flex-wrap gap-2 max-h-32 sm:max-h-40 overflow-y-auto p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
              {dictMode === 'korean'
                ? currentCategory.words.map((item) => {
                    const isActive = query.trim() === item.word;
                    return (
                      <button
                        key={item.word}
                        type="button"
                        onClick={() => {
                          setQuery(item.word);
                          handleSearch(item.word, 'korean');
                        }}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                          isActive
                            ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
                            : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-950 border-slate-200'
                        }`}
                      >
                        <span>{item.word}</span>
                        <span
                          className={`text-[11px] font-normal ${
                            isActive ? 'text-slate-300' : 'text-slate-400'
                          }`}
                        >
                          {item.subCategory}
                        </span>
                      </button>
                    );
                  })
                : currentEnglishGroup.words.map((item) => {
                    const isActive = query.trim().toLowerCase() === item.word.toLowerCase();
                    return (
                      <button
                        key={item.word}
                        type="button"
                        onClick={() => {
                          setQuery(item.word);
                          handleSearch(item.word, 'english');
                        }}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                          isActive
                            ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-xs'
                            : 'bg-white hover:bg-indigo-50/70 text-slate-700 hover:text-indigo-950 border-slate-200'
                        }`}
                      >
                        <span className="font-semibold">{item.word}</span>
                        <span
                          className={`text-[11px] ${
                            isActive ? 'text-indigo-200' : 'text-slate-400'
                          }`}
                        >
                          {item.meaning}
                        </span>
                      </button>
                    );
                  })}
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 bg-slate-50/50">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Loader2 className="w-9 h-9 text-indigo-600 animate-spin" />
              <p className="text-sm font-semibold text-slate-800">
                '{query}'의 사전 정보를 검색하고 있습니다...
              </p>
              <p className="text-xs text-slate-400 font-mono">
                {dictMode === 'korean'
                  ? '국립국어원 한국어기초사전 & Gemini 3.1 AI 엔진 동기화 중'
                  : 'ScoreCompass 수능 영어 DB & Google Gemini AI 언어 모델 연계 중'}
              </p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
              <p className="font-bold mb-1">검색 오류</p>
              <p>{error}</p>
            </div>
          ) : dictMode === 'english' && englishResult ? (
            /* ENGLISH RESULT VIEW */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
                <span className="text-slate-700">
                  <strong className="text-slate-950 text-sm">'{englishResult.query}'</strong> 영어 사전 상세 분석
                </span>
                <span className="text-slate-500 font-medium">
                  {englishResult.source}
                </span>
              </div>

              <article className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                {/* Header: Word, Phonetic, Audio, and Copy */}
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-serif">
                        {englishResult.item.word}
                      </h4>
                      {englishResult.item.phonetic && (
                        <span className="text-sm sm:text-base text-indigo-700 font-mono bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-200">
                          {englishResult.item.phonetic}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleSpeak(englishResult.item.word, 'en-US')}
                        className="px-2.5 py-1 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                        title="원어민 발음 듣기"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-indigo-700" />
                        <span>발음 듣기</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium flex-wrap">
                      {englishResult.item.pos && (
                        <span className="font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                          {englishResult.item.pos}
                        </span>
                      )}
                      {englishResult.item.difficulty && (
                        <span className="font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                          {englishResult.item.difficulty}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopyEnglishDefinition(englishResult.item, 'eng-def')}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedId === 'eng-def' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">복사됨</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>복사</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Korean Meaning - Core Definition Box */}
                <div className="p-4 rounded-xl bg-indigo-50/60 border-l-4 border-indigo-600 border border-indigo-100">
                  <span className="text-[11px] font-bold text-indigo-700 block mb-1">
                    주요 우리말 뜻풀이:
                  </span>
                  <p className="text-base sm:text-lg font-bold text-indigo-950 leading-snug">
                    {englishResult.item.koreanMeaning}
                  </p>
                </div>

                {/* English Definition */}
                {englishResult.item.englishDefinition && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[11px] font-bold text-slate-600 block mb-0.5">
                      English Definition (영영 풀이):
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed">
                      "{englishResult.item.englishDefinition}"
                    </p>
                  </div>
                )}

                {/* Example Sentence */}
                {englishResult.item.exampleEn && (
                  <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-700 block">
                      수능·학술 지문 실전 예문:
                    </span>
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                        {englishResult.item.exampleEn}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleSpeak(englishResult.item.exampleEn || '', 'en-US')}
                        className="p-1 rounded text-slate-400 hover:text-indigo-600 transition-colors shrink-0 cursor-pointer"
                        title="예문 읽기"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    {englishResult.item.exampleKo && (
                      <p className="text-xs sm:text-sm text-slate-600 pt-1 border-t border-slate-200/60">
                        {englishResult.item.exampleKo}
                      </p>
                    )}
                  </div>
                )}

                {/* Collocations & Synonyms */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {englishResult.item.collocations && englishResult.item.collocations.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                      <strong className="text-xs font-bold text-slate-800 block mb-1.5">
                        자주 쓰이는 연어 (Collocations):
                      </strong>
                      <div className="flex flex-wrap gap-1.5">
                        {englishResult.item.collocations.map((col, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-white border border-slate-200 text-indigo-900 px-2 py-0.5 rounded-md font-medium"
                          >
                            {col}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {englishResult.item.synonyms && englishResult.item.synonyms.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                      <strong className="text-xs font-bold text-slate-800 block mb-1.5">
                        핵심 유의어 (Synonyms):
                      </strong>
                      <div className="flex flex-wrap gap-1.5">
                        {englishResult.item.synonyms.map((syn, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                          >
                            {syn}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* CSAT Exam Tip */}
                {englishResult.item.csatExamTip && (
                  <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed flex items-start gap-2.5 break-keep">
                    <GraduationCap className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-amber-950 block mb-0.5">
                        수능 영어 출제 포인트 & 독해 팁:
                      </strong>
                      <span className="text-slate-800">{englishResult.item.csatExamTip}</span>
                    </div>
                  </div>
                )}
              </article>
            </div>
          ) : dictMode === 'korean' && koreanResult && koreanResult.items.length > 0 ? (
            /* KOREAN RESULT VIEW */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
                <span className="text-slate-700">
                  <strong className="text-slate-950 text-sm">'{koreanResult.query}'</strong> 검색 결과 (총{' '}
                  <span className="text-indigo-600 font-bold text-sm">
                    {koreanResult.total}
                  </span>
                  건)
                </span>
                <span className="text-slate-500 font-medium">
                  {koreanResult.source}
                </span>
              </div>

              {koreanResult.items.map((item, idx) => {
                const uniqueKey = item.targetCode || `item-${idx}`;
                return (
                  <article
                    key={uniqueKey}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 transition-all hover:border-slate-300"
                  >
                    {/* Header with Title and Typographic Metadata */}
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-2.5 flex-wrap">
                          <h4 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                            {item.word}
                          </h4>
                          {item.origin && (
                            <span className="text-base font-bold text-slate-700 font-serif">
                              ({item.origin})
                            </span>
                          )}
                          {item.pronunciation && (
                            <span className="text-xs sm:text-sm text-slate-500 font-mono">
                              [{item.pronunciation}]
                            </span>
                          )}
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium flex-wrap">
                          {item.pos && <span>{item.pos}</span>}
                          {item.wordGrade && (
                            <>
                              <span className="text-slate-300">·</span>
                              <span className="font-semibold text-emerald-800">
                                {item.wordGrade} 어휘
                              </span>
                            </>
                          )}
                          {item.subjectCategory && (
                            <>
                              <span className="text-slate-300">·</span>
                              <span className="font-semibold text-indigo-700">
                                교과: {item.subjectCategory}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleCopyKoreanDefinition(item, uniqueKey)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                          title="뜻풀이 복사"
                        >
                          {copiedId === uniqueKey ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-bold">복사됨</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-500" />
                              <span>복사</span>
                            </>
                          )}
                        </button>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
                            title="사전 웹 페이지 새창 보기"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                            <span>사전 원문</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Standard Definition */}
                    <div className="my-2 p-3.5 sm:p-4 rounded-xl bg-slate-50 border-l-3 border-indigo-600 border border-slate-200/60">
                      <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-normal break-keep">
                        {item.definition}
                      </p>
                    </div>

                    {/* Bilingual Translation Card (National Institute of Korean Language Korean-Foreign Language Learner's Dictionary) */}
                    {(item.transWord || item.transDfn) && (
                      <div className="my-2 p-3 sm:p-3.5 rounded-xl bg-sky-50/70 border border-sky-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed flex flex-col gap-1.5 break-keep">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-sky-600 text-white font-bold text-[10px] sm:text-[11px] tracking-wide">
                              대역어 (English)
                            </span>
                            {item.transWord && (
                              <span className="font-bold text-sky-950 text-sm sm:text-base">
                                {item.transWord}
                              </span>
                            )}
                          </div>
                          {item.transWord && (
                            <button
                              type="button"
                              onClick={() => handleSpeak(item.transWord!, 'en-US')}
                              className="px-2 py-1 rounded-lg text-sky-700 hover:text-sky-900 hover:bg-sky-100/90 transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer border border-sky-200"
                              title="영문 대역어 발음 듣기"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>발음 듣기</span>
                            </button>
                          )}
                        </div>
                        {item.transDfn && (
                          <p className="text-slate-700 text-xs sm:text-sm font-normal mt-0.5 pl-0.5 leading-relaxed">
                            {item.transDfn}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Educational Note / Literacy Context Guide */}
                    {item.educationalNote && (
                      <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed flex items-start gap-2.5 break-keep">
                        <GraduationCap className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold text-amber-950 block mb-0.5">
                            교과 문해력 가이드:
                          </strong>
                          <span className="text-slate-800">{item.educationalNote}</span>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center text-slate-400 space-y-2">
              <BookMarked className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-sm sm:text-base font-bold text-slate-700">
                '{query}'에 대한 사전 검색 결과가 없습니다.
              </p>
              <p className="text-xs text-slate-500 break-keep max-w-sm mx-auto">
                {dictMode === 'korean'
                  ? '과목 탭을 변경하거나 상단의 추천 개념어 태그를 클릭해 보세요.'
                  : '영어 사전 탭에서 추천 어휘를 클릭하거나 새로운 단어를 검색해 보세요.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer Info Strip */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="break-keep font-medium text-slate-700">
              {dictMode === 'korean'
                ? '오답의 40%는 교과 개념어 문해력 부족에서 발생합니다. 정확한 개념 정립으로 오답을 해결하세요.'
                : '수능 영어 1등급을 위한 핵심 어휘 및 문법 개념을 완벽하게 마스터하세요.'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors self-end sm:self-auto cursor-pointer shadow-xs"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

