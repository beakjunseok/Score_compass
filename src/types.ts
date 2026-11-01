export type QuestionStatus = 'CORRECT' | 'INCORRECT' | 'UNCERTAIN';
export type QuestionType = 'MULTIPLE_CHOICE' | 'SHORT_ANSWER' | 'ESSAY';

/**
 * 공공데이터포털 3순위: 국가교육과정 성취기준 데이터 (NCIC)
 */
export interface AchievementStandard {
  code: string; // e.g. "[9수03-05]"
  subjectGroup: string; // e.g. "수학"
  grade: string; // e.g. "중학교 3학년" or "고등학교 1학년"
  curriculum: '2022 개정' | '2015 개정';
  domain: string; // e.g. "기하 / 삼각비"
  standardText: string; // 성취기준 공식 설명
}

/**
 * 공공데이터포털 1순위: 교육부 에듀넷 학습·평가자료
 */
export interface EdunetResource {
  materialId: string;
  source: '교육부 에듀넷(EDUNET) 티-클리어';
  title: string;
  materialType: '형성평가 문항' | '개념클립' | '보충학습지' | '심화탐구';
  learningGoal: string;
  evalQuestionSnippet?: string; // 에듀넷 공식 평가 문항 샘플
  evalOptions?: string[];
  evalAnswer?: string;
  url: string;
}

/**
 * 공공데이터포털 2순위: 전국 초중등 교과주제별 학습자료 표준데이터
 */
export interface PublicTopicData {
  datasetName: '전국초중등교과주제별학습자료표준데이터';
  subjectName: string;
  chapterTitle: string; // 목차명
  pageRange: string; // 교과서/학습자료 페이지 번호
  resourceTitle: string; // 학습자료명
  keywords: string[]; // 키워드명 배열
  resourceType: string; // PDF, 동영상, 활동지 등
  url?: string;
}

/**
 * 전국초중등교과주제별학습자료표준데이터 Open API 실시간 반환 항목
 */
export interface LivePublicDataRecord {
  lernDataNm: string; // 학습자료명
  pgNo?: string; // 페이지 번호 (쪽수)
  kwdNm?: string; // 키워드명
  cntntNm?: string; // 목차명 / 내용
  fileNm?: string;
  extnNm?: string;
  srcNm?: string;
  hmpgAddr?: string; // 에듀넷 티-클리어 링크
  crtrYmd?: string;
  insttNm?: string; // 한국교육학술정보원
}

export interface LivePublicApiResponse {
  status: 'SUCCESS' | 'ERROR';
  resultCode: string;
  resultMsg: string;
  endpoint: string;
  totalCount: number;
  items: LivePublicDataRecord[];
  queryKeyword?: string;
  pageNo: number;
  numOfRows: number;
  serviceInfo: {
    dataName: string;
    serviceType: string;
    approvalType: string;
    approvalStatus: string;
    validityPeriod: string;
    dataFormat: string;
    authKeyMasked: string;
    provider: string;
  };
}

/**
 * 국립국어원 한국어기초사전 교과 개념어 Open API
 */
export interface KoreanDictItem {
  targetCode?: string;
  word: string;
  origin?: string; // 원어 한자 (예: 演繹, 歸納, 恒常性)
  pronunciation?: string; // 발음 (예: 귀ː납)
  wordGrade?: string; // 초급, 중급, 고급
  pos?: string; // 품사 (명사, 동사, 관형사 등)
  definition: string; // 표준 사전 뜻풀이
  transWord?: string; // 국립국어원 한국어·외국어 학습사전 공식 영문 대역어 (예: induction)
  transDfn?: string; // 국립국어원 공식 영문 뜻풀이
  link?: string; // 국립국어원 사전 웹 상세 링크
  educationalNote?: string; // 수능/교과서 지문 출제 맥락 및 문해력 가이드
  subjectCategory?: string; // 교과 분류 (예: 국어/논리, 수학/대수, 과학/생명과학, 사회/경제 등)
}

export interface KoreanDictSearchResponse {
  status: 'SUCCESS' | 'ERROR';
  query: string;
  total: number;
  items: KoreanDictItem[];
  source: string;
  serviceInfo: {
    dataName: string;
    provider: string;
    endpoint: string;
    authKeyMasked: string;
    status: string;
  };
}

/**
 * 수능·내신 고교 영어 사전 & 문법 개념어
 */
export interface EnglishDictItem {
  word: string;
  phonetic?: string;
  pos?: string;
  koreanMeaning: string;
  englishDefinition?: string;
  difficulty?: string;
  exampleEn?: string;
  exampleKo?: string;
  collocations?: string[];
  synonyms?: string[];
  csatExamTip?: string;
  audioUrl?: string;
}

export interface EnglishDictResponse {
  status: 'SUCCESS' | 'ERROR';
  query: string;
  item: EnglishDictItem;
  source: string;
  serviceInfo: {
    engine: string;
    status: string;
    provider: string;
  };
}

/**
 * 한국산업인력공단 NCS 고교직업교육과정 정보 서비스 (공공데이터포털)
 */
export interface NcsVocationalCurriculum {
  datasetName: '한국산업인력공단_NCS고교직업교육과정 정보 서비스_GW';
  subjectGroup: string; // 교과군명 (예: 정보·통신, 전기·전자, 경영·금융, 기계, 보건·복지)
  subjectName: string; // 교과목명 (예: 프로그래밍, 전자회로, 회계실무)
  ncsLargeCode?: string; // 대분류코드
  ncsLargeName?: string; // 대분류명
  ncsMidCode?: string; // 중분류코드
  ncsMidName?: string; // 중분류명
  ncsSubCode?: string; // 소분류코드
  ncsSubName?: string; // 소분류명
  ncsDetailCode?: string; // 세분류코드
  ncsDetailName?: string; // 세분류명
  competencyUnitCode: string; // 고교능력단위코드 (예: 2001010101_16v3)
  competencyUnitName: string; // 고교능력단위명 (예: 애플리케이션 요구사항 분석 및 화면 구현)
  ncsClassificationCode: string; // NCS분류코드
  learningGoal?: string; // 학습목표 및 직무평가 기준
  url?: string;
}

export interface LiveNcsRecord {
  sbjGrpNm?: string; // 교과군명
  sbjNm?: string; // 교과목명
  lrgClsfCd?: string; // 대분류코드
  lrgClsfNm?: string; // 대분류명
  midClsfCd?: string; // 중분류코드
  midClsfNm?: string; // 중분류명
  smClsfCd?: string; // 소분류코드
  smClsfNm?: string; // 소분류명
  dtlClsfCd?: string; // 세분류코드
  dtlClsfNm?: string; // 세분류명
  schAbilUnitCd?: string; // 고교능력단위코드
  schAbilUnitNm?: string; // 고교능력단위명
  ncsClsfCd?: string; // NCS분류코드
}

export interface LiveNcsVocationalApiResponse {
  status: 'SUCCESS' | 'ERROR';
  resultCode: string;
  resultMsg: string;
  endpoint: string;
  liveGateway?: {
    httpStatus: number;
    code: string;
    msg: string;
  };
  totalCount: number;
  items: LiveNcsRecord[];
  queryKeyword?: string;
  pageNo: number;
  numOfRows: number;
  serviceInfo: {
    dataName: string;
    serviceType: string;
    approvalType: string;
    approvalStatus: string;
    validityPeriod: string;
    dataFormat: string;
    authKeyMasked: string;
    provider: string;
  };
}

export interface GradingQuestion {
  id: string;
  page: string; // e.g. "32쪽"
  questionNumber: number; // e.g. 3
  questionType: QuestionType;
  questionSnippet: string;
  studentAnswer: string; // e.g. "②" or "2"
  correctAnswer: string; // e.g. "③" or "3"
  status: QuestionStatus;
  confidence: number; // 0 - 100
  explanation: string;
  hint?: string;
  conceptTag?: string;
  isManuallyEdited?: boolean;
  studentNotes?: string;
  retestSolved?: boolean;
  retestAnswer?: string;
  retestIsCorrect?: boolean;
  // 공공데이터 연계 항목 (일반 초·중·고 3대 공공데이터 + 직업계고 NCS 데이터)
  achievementStandard?: AchievementStandard; // 3순위 국가 성취기준
  edunetResource?: EdunetResource; // 1순위 에듀넷 평가문항 및 학습자료
  publicTopicData?: PublicTopicData; // 2순위 교과주제별 학습자료 표준데이터
  ncsVocationalData?: NcsVocationalCurriculum; // 4순위 한국산업인력공단 NCS 고교직업교육과정 정보
  // 단계별 상세 풀이 데이터 (모르는 문제 전용)
  solutionBreakdown?: StepByStepSolution;
  isFlaggedAsUnknown?: boolean; // 사용자가 '모르는 문제'로 직접 체크한 여부
}

export interface SolutionStep {
  stepNumber: number;
  title: string;
  formula?: string;
  content: string;
}

export interface StepByStepSolution {
  problemSummary: string;
  keyConcept: string;
  steps: SolutionStep[];
  finalAnswer: string;
  whyIncorrectExplanation?: string;
  trapWarning?: string;
  twinProblem?: {
    problem: string;
    options?: string[];
    answer: string;
    explanation: string;
  };
}

export interface AITutorMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  questionContext?: {
    page: string;
    questionNumber: number;
    subject: string;
    conceptTag?: string;
    studentAnswer?: string;
    correctAnswer?: string;
  };
}

export interface LearningAnalysis {
  weakPoints: string[];
  teacherAdvice: string;
  recommendedReviewTimeMin: number;
}

export interface GradingResult {
  id: string;
  createdAt: string;
  workbookTitle: string;
  subject: string;
  pageNumbers: string[];
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  uncertainCount: number;
  accuracyRate: number; // 0 - 100
  questions: GradingQuestion[];
  learningAnalysis: LearningAnalysis;
  workbookImages?: string[];
  answerKeyImages?: string[];
}

export interface PresetSample {
  id: string;
  title: string;
  subject: string;
  badge: string;
  pages: string;
  description: string;
  questionCount: number;
  accuracy: number;
  incorrectHighlights: string[]; // e.g. ["32쪽 ③번", "35쪽 ⑤번"]
  mockWorkbookSvgUrl?: string;
  sampleData: GradingResult;
}

export type ViewTab = 'home' | 'upload' | 'result' | 'notebook' | 'analytics';
