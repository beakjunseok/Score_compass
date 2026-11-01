import {
  AchievementStandard,
  EdunetResource,
  PublicTopicData,
  NcsVocationalCurriculum,
} from '../types';

/**
 * 공공데이터 연계 통합 데이터 저장소
 * 1순위: 교육부 에듀넷 학습·평가자료
 * 2순위: 전국 초중등 교과주제별 학습자료 표준데이터
 * 3순위: 국가교육과정 성취기준 데이터 (NCIC)
 * 4순위: 한국산업인력공단 NCS 고교직업교육과정 정보 서비스 (특성화고·직업계고)
 */

export interface PublicDataBundle {
  conceptKey: string;
  achievementStandard: AchievementStandard;
  publicTopicData: PublicTopicData;
  edunetResource: EdunetResource;
  ncsVocationalData?: NcsVocationalCurriculum;
}

export const PUBLIC_EDUCATION_DATA: PublicDataBundle[] = [
  // 1. 수학 - 이차방정식
  {
    conceptKey: '이차방정식',
    achievementStandard: {
      code: '[9수02-04]',
      subjectGroup: '수학',
      grade: '중학교 3학년 / 고1 공통수학1',
      curriculum: '2022 개정',
      domain: '수와 연산 / 대수',
      standardText: '인수분해와 근의 공식을 이용하여 이차방정식을 풀 수 있고, 이를 실생활 문제에 적용하여 해결할 수 있다.',
    },
    publicTopicData: {
      datasetName: '전국초중등교과주제별학습자료표준데이터',
      subjectName: '중학교 3학년 수학 / 고등 공통수학1',
      chapterTitle: 'Ⅱ. 방정식과 부등식 > 1. 이차방정식의 풀이와 근의 판별',
      pageRange: '30쪽 ~ 34쪽',
      resourceTitle: '이차방정식의 해법과 근의 판별 단계별 탐구 학습지',
      keywords: ['이차방정식', '인수분해', '근의 공식', '판별식', '중근'],
      resourceType: '수업 보충 활동지 (PDF) / 교수학습지도안',
      url: 'https://www.data.go.kr/data/15077587/standard.do',
    },
    edunetResource: {
      materialId: 'EDUNET-MATH-3-0204',
      source: '교육부 에듀넷(EDUNET) 티-클리어',
      title: '에듀넷 티-클리어 3학년 수학: 이차방정식의 완전정복 형성평가',
      materialType: '형성평가 문항',
      learningGoal: '이차방정식의 두 근 중 조건에 맞는 근을 선택하고 해를 검증할 수 있다.',
      evalQuestionSnippet: '[에듀넷 공식 형성평가 4번] 이차방정식 3x² - 7x + 2 = 0의 두 근 중 작은 근을 α, 큰 근을 β라 할 때, 2α + β의 값은?',
      evalOptions: ['① 2', '② 8/3', '③ 3', '④ 7/2', '⑤ 4'],
      evalAnswer: '② 8/3 (풀이: (3x - 1)(x - 2) = 0 → α=1/3, β=2)',
      url: 'https://www.edunet.net/nsearch/totalSearch.do?query=%EC%9D%B4%EC%B0%A8%EB%B0%A9%EC%A0%95%EC%8B%9D',
    },
  },

  // 2-1. 수학 - 중2 일차함수 (사용자 권장 예시: 37쪽 틀림 -> 중학교 2학년 수학 -> 일차함수 -> 해당 성취기준)
  {
    conceptKey: '일차함수',
    achievementStandard: {
      code: '[9수03-02]',
      subjectGroup: '수학',
      grade: '중학교 2학년',
      curriculum: '2022 개정',
      domain: '함수 / 일차함수와 그래프',
      standardText: '일차함수의 의미를 알고, 그 그래프의 성질을 이해하며 일차함수의 그래프를 그릴 수 있다.',
    },
    publicTopicData: {
      datasetName: '전국초중등교과주제별학습자료표준데이터',
      subjectName: '중학교 2학년 수학',
      chapterTitle: 'Ⅱ. 함수 > 1. 일차함수와 그 그래프',
      pageRange: '36쪽 ~ 42쪽',
      resourceTitle: '일차함수 기울기(a)와 y절편(b)의 기하학적 성질 탐구 학습지',
      keywords: ['일차함수', '기울기', 'y절편', '그래프 성질', '중2수학', '성취기준'],
      resourceType: '수업 보충 탐구 활동지 (PDF) / Open API (JSON/XML)',
      url: 'https://www.data.go.kr/data/15077587/standard.do',
    },
    edunetResource: {
      materialId: 'EDUNET-MATH-2-0302',
      source: '교육부 에듀넷(EDUNET) 티-클리어',
      title: '에듀넷 중2 수학: 일차함수 그래프의 성질과 기울기 집중 형성평가',
      materialType: '형성평가 문항',
      learningGoal: '일차함수 y = ax + b에서 a의 부호에 따른 그래프 모양(우상향/우하향)과 y절편을 파악한다.',
      evalQuestionSnippet: '[에듀넷 공식 형성평가 3번] 일차함수 y = -2x + 4의 그래프가 지나지 않는 사분면은?',
      evalOptions: ['① 제1사분면', '② 제2사분면', '③ 제3사분면', '④ 제4사분면'],
      evalAnswer: '③ 제3사분면 (기울기<0, y절편>0 이므로 1, 2, 4사분면 통과)',
      url: 'https://www.edunet.net/nsearch/totalSearch.do?query=%EC%9D%BC%EC%B0%A8%ED%95%A8%EC%88%98+%EA%B7%B8%EB%9E%98%ED%94%84',
    },
  },

  // 2. 수학 - 이차함수의 최댓값과 최솟값
  {
    conceptKey: '이차함수',
    achievementStandard: {
      code: '[10공수01-03]',
      subjectGroup: '수학',
      grade: '고등학교 1학년 공통수학1 / 중3 수학',
      curriculum: '2022 개정',
      domain: '대수 / 함수',
      standardText: '이차함수의 그래프의 성질을 이해하고, 이차함수의 최대·최소를 이해하며 이를 활용할 수 있다.',
    },
    publicTopicData: {
      datasetName: '전국초중등교과주제별학습자료표준데이터',
      subjectName: '고등학교 공통수학1',
      chapterTitle: 'Ⅱ. 함수 > 2. 이차함수의 그래프와 최댓값·최솟값',
      pageRange: '35쪽 ~ 38쪽',
      resourceTitle: '이차함수 꼭짓점 표준형 변환 및 제한된 범위에서의 치역 분석',
      keywords: ['이차함수', '꼭짓점', '대칭축', '최댓값', '최솟값', 'y절편'],
      resourceType: '그래프 시뮬레이션 / 문제은행 문항',
      url: 'https://www.data.go.kr/data/15077587/standard.do',
    },
    edunetResource: {
      materialId: 'EDUNET-MATH-10-0103',
      source: '교육부 에듀넷(EDUNET) 티-클리어',
      title: '에듀넷 고교 공통수학: 이차함수 꼭짓점과 최댓값·최솟값 진단 클립',
      materialType: '개념클립',
      learningGoal: '완전제곱식 표준형 y = a(x - p)² + q 변형을 통해 꼭짓점과 축, 극값을 정확히 도출한다.',
      evalQuestionSnippet: '[에듀넷 보충 문항] 함수 y = 2x² - 8x + 5의 꼭짓점의 좌표와 최솟값을 바르게 짝지은 것은?',
      evalOptions: ['① (2, -3), 최솟값 -3', '② (2, 5), 최솟값 5', '③ (-2, -3), 최솟값 -3', '④ (4, 5), 최솟값 5'],
      evalAnswer: '① (2, -3), 최솟값 -3',
      url: 'https://www.edunet.net/nsearch/totalSearch.do?query=%EC%9D%B4%EC%B0%A8%ED%95%A8%EC%88%98+%EC%B5%9C%EC%86%9F%EA%B0%92',
    },
  },

  // 3. 수학 - 삼각비의 성질과 특수각
  {
    conceptKey: '삼각비',
    achievementStandard: {
      code: '[9수03-05]',
      subjectGroup: '수학',
      grade: '중학교 3학년 / 고1 대수',
      curriculum: '2022 개정',
      domain: '기하 / 삼각비',
      standardText: '삼각비의 뜻을 알고, 30°, 45°, 60°의 특수각의 삼각비의 값을 구할 수 있으며 실생활 높이와 거리를 측정할 수 있다.',
    },
    publicTopicData: {
      datasetName: '전국초중등교과주제별학습자료표준데이터',
      subjectName: '중학교 3학년 수학',
      chapterTitle: 'Ⅲ. 기하 > 1. 삼각비의 뜻과 특수각의 값',
      pageRange: '37쪽 ~ 40쪽',
      resourceTitle: '직각삼각형의 닮음과 특수각 삼각비(sin, cos, tan) 연산 워크시트',
      keywords: ['삼각비', '특수각', 'sin', 'cos', 'tan', '직각삼각형', '높이측정'],
      resourceType: '교사용 수준별 형성평가 문항지 (HWP/PDF)',
      url: 'https://www.data.go.kr/data/15077587/standard.do',
    },
    edunetResource: {
      materialId: 'EDUNET-MATH-3-0305',
      source: '교육부 에듀넷(EDUNET) 티-클리어',
      title: '에듀넷 중3 기하: 특수각 삼각비 값 암기 및 사칙연산 형성평가',
      materialType: '형성평가 문항',
      learningGoal: 'sin 30°, cos 60°, tan 45°의 상호 비율 관계를 사칙연산 순서에 맞추어 연산한다.',
      evalQuestionSnippet: '[에듀넷 표준 문항] 2 × sin 30° + tan 45° - cos 0° 의 계산 결과는?',
      evalOptions: ['① 0', '② 1', '③ 2', '④ √3', '⑤ 1/2'],
      evalAnswer: '② 1 (풀이: 2×(1/2) + 1 - 1 = 1)',
      url: 'https://www.edunet.net/nsearch/totalSearch.do?query=%EC%82%BC%EA%B0%81%EB%B9%84+%ED%8A%B9%EC%88%98%EA%B0%81',
    },
  },

  // 4. 수학 - 원과 접선, 원주각
  {
    conceptKey: '원주각',
    achievementStandard: {
      code: '[9수03-07]',
      subjectGroup: '수학',
      grade: '중학교 3학년',
      curriculum: '2022 개정',
      domain: '기하 / 원의 성질',
      standardText: '원주각과 중심각의 크기 사이의 관계(1/2)를 이해하고, 접선과 현이 이루는 각의 성질을 설명할 수 있다.',
    },
    publicTopicData: {
      datasetName: '전국초중등교과주제별학습자료표준데이터',
      subjectName: '중학교 3학년 수학',
      chapterTitle: 'Ⅲ. 기하 > 2. 원의 성질과 원주각',
      pageRange: '41쪽 ~ 44쪽',
      resourceTitle: '호에 대한 원주각의 크기와 원에 내접하는 사각형의 성질',
      keywords: ['원주각', '중심각', '원의접선', '현', '내접사각형'],
      resourceType: '지오지브라(GeoGebra) 동적 기하 탐구 자료',
      url: 'https://www.data.go.kr/data/15077587/standard.do',
    },
    edunetResource: {
      materialId: 'EDUNET-MATH-3-0307',
      source: '교육부 에듀넷(EDUNET) 티-클리어',
      title: '에듀넷 티-클리어: 원주각의 정리와 중심각의 1/2 증명 영상',
      materialType: '개념클립',
      learningGoal: '중심각 = 2 × 원주각 관계를 반대로 적용하지 않고 기하 도형에 응용한다.',
      evalQuestionSnippet: '[에듀넷 진단평가] 한 호에 대한 중심각이 110°일 때, 이에 대응하는 원주각의 크기는?',
      evalOptions: ['① 45°', '② 55°', '③ 110°', '④ 220°'],
      evalAnswer: '② 55° (원주각은 중심각의 1/2)',
      url: 'https://www.edunet.net/nsearch/totalSearch.do?query=%EC%9B%90%EC%A3%BC%EA%B0%81',
    },
  },

  // 5. 수학 - 대푯값과 산포도 (분산, 표준편차)
  {
    conceptKey: '분산',
    achievementStandard: {
      code: '[9수04-02]',
      subjectGroup: '수학',
      grade: '중학교 3학년',
      curriculum: '2022 개정',
      domain: '확률과 통계',
      standardText: '중앙값, 최빈값, 평균을 이해하고 편차의 제곱의 평균인 분산과 표준편차를 구하여 자료의 흩어진 정도를 비교할 수 있다.',
    },
    publicTopicData: {
      datasetName: '전국초중등교과주제별학습자료표준데이터',
      subjectName: '중학교 3학년 수학',
      chapterTitle: 'Ⅳ. 통계 > 1. 대푯값과 산포도',
      pageRange: '45쪽 ~ 48쪽',
      resourceTitle: '편차의 합(0)과 분산, 표준편차 계산 실습 활동지',
      keywords: ['대푯값', '산포도', '편차', '분산', '표준편차', '제곱평균'],
      resourceType: '통계 계산 실습지 / 스프레드시트 템플릿',
      url: 'https://www.data.go.kr/data/15077587/standard.do',
    },
    edunetResource: {
      materialId: 'EDUNET-MATH-3-0402',
      source: '교육부 에듀넷(EDUNET) 티-클리어',
      title: '에듀넷 중3 통계: 분산과 표준편차(루트 계산) 오개념 클리닉',
      materialType: '보충학습지',
      learningGoal: '편차의 제곱의 평균이 분산이고, 분산에 제곱근을 씌운 값이 표준편차임을 명확히 구분한다.',
      evalQuestionSnippet: '[에듀넷 평가 문항] 어떤 자료의 변량들의 편차가 -2, -1, 0, 1, 2일 때 이 자료의 분산은?',
      evalOptions: ['① 2', '② √2', '③ 4', '④ 10', '⑤ 0'],
      evalAnswer: '① 2 (편차제곱합: 4+1+0+1+4=10, 10/5 = 2)',
      url: 'https://www.edunet.net/nsearch/totalSearch.do?query=%EB%B6%84%EC%82%B0+%ED%91%9C%EC%84%A0%ED%8E%B8%EC%B0%A8',
    },
  },

  // 6. 과학 - 산화 환원 반응 (통합과학)
  {
    conceptKey: '산화',
    achievementStandard: {
      code: '[10통과01-02]',
      subjectGroup: '과학',
      grade: '고등학교 1학년 통합과학1',
      curriculum: '2022 개정',
      domain: '물질과 규칙성 / 화학 변화',
      standardText: '지구와 생명의 역사에 변화를 가져온 광합성, 철의 제련, 화석 연료의 연소 등을 산소의 이동과 전자의 이동으로 설명할 수 있다.',
    },
    publicTopicData: {
      datasetName: '전국초중등교과주제별학습자료표준데이터',
      subjectName: '고등학교 1학년 통합과학',
      chapterTitle: 'Ⅲ. 변화와 다양성 > 1. 화학 변화 (산화와 환원)',
      pageRange: '50쪽 ~ 54쪽',
      resourceTitle: '산소의 이동 및 전자의 이동에 따른 산화·환원의 동시성 실험 자료',
      keywords: ['산화', '환원', '산소이동', '전자이동', '산화구리', '철의제련', '연소'],
      resourceType: '가상 과학 실험 동영상 및 실험 관찰 보고서',
      url: 'https://www.data.go.kr/data/15077587/standard.do',
    },
    edunetResource: {
      materialId: 'EDUNET-SCI-10-0102',
      source: '교육부 에듀넷(EDUNET) 티-클리어',
      title: '에듀넷 통합과학: 산화 환원 반응과 산소·전자 이동 진단평가 5문항',
      materialType: '형성평가 문항',
      learningGoal: '산소를 얻는 물질(산화)과 산소를 잃는 물질(환원)을 화학 반응식에서 정확히 식별한다.',
      evalQuestionSnippet: '[에듀넷 표준 문항] 2Mg + O₂ → 2MgO 반응에서 산화되는 물질과 환원되는 물질로 옳은 것은?',
      evalOptions: ['① 산화: Mg, 환원: O₂', '② 산화: O₂, 환원: Mg', '③ 둘 다 산화됨', '④ 둘 다 환원됨'],
      evalAnswer: '① 산화: Mg (산소 결합), 환원: O₂ (전자 획득)',
      url: 'https://www.edunet.net/nsearch/totalSearch.do?query=%EC%82%B0%ED%99%94%ED%99%98%EC%9B%90',
    },
  },

  // 7. 과학 - 운동량과 충격량 (통합과학)
  {
    conceptKey: '충격량',
    achievementStandard: {
      code: '[10통과02-03]',
      subjectGroup: '과학',
      grade: '고등학교 1학년 통합과학2 / 물리학',
      curriculum: '2022 개정',
      domain: '역학과 에너지',
      standardText: '충돌이 일어날 때 물체가 받는 충격량을 이해하고, 충돌 시간을 길게 하여 충격력을 줄이는 안전장치의 원리를 설명할 수 있다.',
    },
    publicTopicData: {
      datasetName: '전국초중등교과주제별학습자료표준데이터',
      subjectName: '고등학교 1학년 통합과학',
      chapterTitle: 'Ⅱ. 시스템과 상호작용 > 1. 역학적 시스템과 안전',
      pageRange: '52쪽 ~ 56쪽',
      resourceTitle: '달걀 낙하 실험과 에어백/범퍼의 충돌 시간-충격력 관계 분석',
      keywords: ['운동량', '충격량', '충격력', '충돌시간', '에어백', '안전벨트'],
      resourceType: 'MBL 센서 측정 실험 데이터 및 분석지',
      url: 'https://www.data.go.kr/data/15077587/standard.do',
    },
    edunetResource: {
      materialId: 'EDUNET-SCI-10-0203',
      source: '교육부 에듀넷(EDUNET) 티-클리어',
      title: '에듀넷 과학: 충격량(I = FΔt)과 평균 힘 오개념 교정 클립',
      materialType: '개념클립',
      learningGoal: '동일한 충격량에서 시간이 늘어날 때 평균 힘이 줄어드는 메커니즘을 구별한다.',
      evalQuestionSnippet: '[에듀넷 고교 과학 3번] 질량이 같은 두 자동차가 동일한 속도로 벽과 짚더미에 부딪혀 정지할 때, 두 차가 받은 충격량의 비는?',
      evalOptions: ['① 1 : 1', '② 1 : 2', '③ 2 : 1', '④ 1 : 4'],
      evalAnswer: '① 1 : 1 (정지할 때까지 운동량 변화량이 같으므로 충격량은 동일함)',
      url: 'https://www.edunet.net/nsearch/totalSearch.do?query=%EC%B6%A9%EA%B2%A9%EB%9F%89+%EC%B6%A9%EA%B2%A9%EB%A0%A5',
    },
  },

  // 8. 사회 - 조선 후기 대동법과 상품 화폐 경제
  {
    conceptKey: '대동법',
    achievementStandard: {
      code: '[10한사02-04]',
      subjectGroup: '사회 / 한국사',
      grade: '고등학교 한국사 / 통합사회',
      curriculum: '2022 개정',
      domain: '한국사 / 수취 체제 개편',
      standardText: '조선 후기 수취 체제의 개편 과정(영정법, 대동법, 균역법)과 공인의 등장이 상품 화폐 경제의 발달에 미친 영향을 파악할 수 있다.',
    },
    publicTopicData: {
      datasetName: '전국초중등교과주제별학습자료표준데이터',
      subjectName: '고등학교 한국사',
      chapterTitle: 'Ⅱ. 조선 사회의 변동 > 1. 수취 체제의 개편과 상품 화폐 경제',
      pageRange: '62쪽 ~ 66쪽',
      resourceTitle: '방납의 폐단 극복을 위한 대동법의 전국적 확산과 공인의 활약 사료집',
      keywords: ['대동법', '공납', '토지결수', '공인', '상품화폐경제', '상평통보', '광해군'],
      resourceType: '국사편찬위원회 사료 탐구 활동지',
      url: 'https://www.data.go.kr/data/15077587/standard.do',
    },
    edunetResource: {
      materialId: 'EDUNET-SOC-10-0204',
      source: '교육부 에듀넷(EDUNET) 티-클리어',
      title: '에듀넷 한국사: 대동법과 균역법 비교 형성평가 및 사료 분석 문항',
      materialType: '형성평가 문항',
      learningGoal: '대동법(공납의 전세화)과 균역법(군포 2필→1필)의 차이 및 공인의 등장을 정확히 분석한다.',
      evalQuestionSnippet: '[에듀넷 수능형 문항] 다음 가상 대화의 배경이 된 법률의 영향으로 가장 적절한 것은? ("각 고을의 특산물 대신 토지 1결당 쌀 12말을 거두니 백성의 칭송이 자자합니다.")',
      evalOptions: ['① 지계가 발급되었다.', '② 결작이 징수되었다.', '③ 공인이 활약하여 장시가 발달하였다.', '④ 과전법이 공포되었다.'],
      evalAnswer: '③ 공인이 활약하여 장시가 발달하였다 (대동법의 결과)',
      url: 'https://www.edunet.net/nsearch/totalSearch.do?query=%EB%8C%80%EB%8F%99%EB%B2%95',
    },
  },

  // 9. 영어 - 대의 파악 및 필자의 주장
  {
    conceptKey: '주장',
    achievementStandard: {
      code: '[10영02-03]',
      subjectGroup: '영어',
      grade: '고등학교 1학년 영어',
      curriculum: '2022 개정',
      domain: '읽기 / 대의 파악',
      standardText: '일반적인 주제에 관한 글을 읽고 글의 중심 내용, 필자의 주장 및 글의 요지를 추론할 수 있다.',
    },
    publicTopicData: {
      datasetName: '전국초중등교과주제별학습자료표준데이터',
      subjectName: '고등학교 1학년 영어',
      chapterTitle: '수능형 독해 전략 > 3. 필자의 주장 및 요지 파악 기법',
      pageRange: '44쪽 ~ 48쪽',
      resourceTitle: '당위 표현(must, should, vital, imperative) 중심의 결론 도출 훈련지',
      keywords: ['독해전략', '필자의주장', '글의요지', '주제문찾기', '시그널워드'],
      resourceType: 'EBS 연계 독해 클리닉 워크북',
      url: 'https://www.data.go.kr/data/15077587/standard.do',
    },
    edunetResource: {
      materialId: 'EDUNET-ENG-10-0203',
      source: '교육부 에듀넷(EDUNET) 티-클리어',
      title: '에듀넷 고교 영어: 수능 독해 대의 파악(주장·주제·제목) 연습 3제',
      materialType: '형성평가 문항',
      learningGoal: '지문 후반부의 핵심 당위 문장과 선택지의 어휘 패러프레이징을 확인한다.',
      evalQuestionSnippet: '[에듀넷 실전 독해] 본문 결론부 "Setting clear daily limits on smartphone use is non-negotiable." 에서 필자가 주장하는 바로 알맞은 것은?',
      evalOptions: ['① 스마트폰 구매 연령 상향', '② 일일 스마트폰 사용 제한 규칙 확립', '③ 디지털 교과서 보급 확대'],
      evalAnswer: '② 일일 스마트폰 사용 제한 규칙 확립',
      url: 'https://www.edunet.net/nsearch/totalSearch.do?query=%EC%98%81%EC%96%B4+%EB%8F%85%ED%95%B4+%EC%A3%BC%EC%9E%A5',
    },
  },

  // 10. 특성화고/직업계고 NCS - 정보통신 프로그래밍 (화면 구현 및 SW엔지니어링)
  {
    conceptKey: '프로그래밍',
    achievementStandard: {
      code: '[12직정01-02]',
      subjectGroup: '정보·통신',
      grade: '특성화고 2·3학년 / 직업계고',
      curriculum: '2022 개정',
      domain: '응용SW엔지니어링 / 화면구현',
      standardText: 'UI 설계서 및 요구사항에 맞추어 화면 레이아웃과 이벤트 처리 로직을 구현할 수 있다.',
    },
    publicTopicData: {
      datasetName: '전국초중등교과주제별학습자료표준데이터',
      subjectName: '특성화고 정보통신 프로그래밍',
      chapterTitle: '웹·모바일 앱 개발 > 2. 이벤트 핸들러 및 데이터 바인딩',
      pageRange: '52쪽 ~ 58쪽',
      resourceTitle: '프론트엔드 비동기 통신과 API 응답 파싱 실습 워크시트',
      keywords: ['프로그래밍', 'UI구현', '이벤트', 'API연동', 'NCS능력단위'],
      resourceType: 'NCS 실무 실습 교재 (PDF)',
      url: 'https://www.data.go.kr/data/15077587/standard.do',
    },
    edunetResource: {
      materialId: 'EDUNET-VOC-20-0101',
      source: '교육부 에듀넷(EDUNET) 티-클리어',
      title: '에듀넷 직업계고 전문교과: 프로그래밍 알고리즘 및 조건문 형성평가',
      materialType: '형성평가 문항',
      learningGoal: '변수 유효범위(스코프)와 비동기 콜백 함수의 실행 순서를 분석할 수 있다.',
      evalQuestionSnippet: '[에듀넷 NCS 실무평가] JavaScript 이벤트 루프에서 Promise와 setTimeout의 실행 우선순위로 옳은 것은?',
      evalOptions: ['① setTimeout이 마이크로태스크로 먼저 실행된다', '② Promise 후속 처리(then)가 마이크로태스크 큐로 먼저 실행된다', '③ 둘 다 동기적으로 동시 실행된다'],
      evalAnswer: '② Promise 후속 처리(then)가 마이크로태스크 큐로 먼저 실행된다',
      url: 'https://www.edunet.net/nsearch/totalSearch.do?query=%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D',
    },
    ncsVocationalData: {
      datasetName: '한국산업인력공단_NCS고교직업교육과정 정보 서비스_GW',
      subjectGroup: '정보·통신',
      subjectName: '응용프로그래밍 개발',
      ncsLargeCode: '20',
      ncsLargeName: '정보통신',
      ncsMidCode: '01',
      ncsMidName: '정보기술',
      ncsSubCode: '01',
      ncsSubName: '정보기술개발',
      ncsDetailCode: '01',
      ncsDetailName: '응용SW엔지니어링',
      competencyUnitCode: '2001010101_16v3',
      competencyUnitName: '요구사항 확인 및 화면 구현',
      ncsClassificationCode: '20010101',
      learningGoal: 'UI/UX 설계 요구분석에 따라 프론트엔드 컴포넌트 구조를 작성하고 사용자 인터랙션을 구현한다.',
      url: 'https://apis.data.go.kr/B490007/ncsSchoolInfo',
    },
  },

  // 11. 특성화고/직업계고 NCS - 전기전자 전자회로 (아날로그/디지털 회로 해석)
  {
    conceptKey: '전자회로',
    achievementStandard: {
      code: '[12직전02-01]',
      subjectGroup: '전기·전자',
      grade: '특성화고 2·3학년 / 마이스터고',
      curriculum: '2022 개정',
      domain: '전자기기 / 전자회로해석',
      standardText: '트랜지스터 및 OP-Amp의 동작 원리를 이해하고 반전/비반전 증폭회로의 출력 전압을 계산할 수 있다.',
    },
    publicTopicData: {
      datasetName: '전국초중등교과주제별학습자료표준데이터',
      subjectName: '특성화고 전기전자 전자회로',
      chapterTitle: '연산 증폭기(OP-Amp)의 기초 > 1. 반전 증폭기와 이득 계산',
      pageRange: '74쪽 ~ 80쪽',
      resourceTitle: 'OP-Amp 가상 접지와 전압 이득(Gain) 해석 탐구 활동지',
      keywords: ['전자회로', '연산증폭기', 'OP-Amp', '전압이득', '피드백저항', 'NCS'],
      resourceType: 'NCS 실습 매뉴얼 및 회로 시뮬레이션 가이드',
      url: 'https://www.data.go.kr/data/15077587/standard.do',
    },
    edunetResource: {
      materialId: 'EDUNET-VOC-19-0101',
      source: '교육부 에듀넷(EDUNET) 티-클리어',
      title: '에듀넷 직업계고 전자회로: OP-Amp 반전 증폭기 계산 형성평가',
      materialType: '형성평가 문항',
      learningGoal: '반전 증폭기 Vout = -(Rf/Rin) * Vin 공식을 적용하여 출력 전압의 크기와 위상을 구한다.',
      evalQuestionSnippet: '[에듀넷 실무평가] Rin = 10kΩ, Rf = 50kΩ인 이상적인 반전 증폭기에 Vin = +1V를 입력할 때 출력 전압 Vout은?',
      evalOptions: ['① +5V', '② -5V', '③ +0.2V', '④ -0.2V'],
      evalAnswer: '② -5V (반전 증폭기 이득 = -Rf/Rin = -50/10 = -5, Vout = -5 * 1V = -5V)',
      url: 'https://www.edunet.net/nsearch/totalSearch.do?query=%EC%A0%84%EC%9E%90%ED%9A%8C%EB%A1%9C',
    },
    ncsVocationalData: {
      datasetName: '한국산업인력공단_NCS고교직업교육과정 정보 서비스_GW',
      subjectGroup: '전기·전자',
      subjectName: '전자회로',
      ncsLargeCode: '19',
      ncsLargeName: '전기전자',
      ncsMidCode: '01',
      ncsMidName: '전자기기일반',
      ncsSubCode: '01',
      ncsSubName: '전자부품개발',
      ncsDetailCode: '01',
      ncsDetailName: '전자회로설계',
      competencyUnitCode: '1901010101_14v2',
      competencyUnitName: '아날로그·디지털 전자회로 해석 및 설계',
      ncsClassificationCode: '19010101',
      learningGoal: '소자 규격서를 확인하여 능동소자 바이어스 회로를 설계하고 신호 왜곡을 검증한다.',
      url: 'https://apis.data.go.kr/B490007/ncsSchoolInfo',
    },
  },
];

/**
 * Helper to match any question to the 4 public datasets (3 general + 1 NCS vocational)
 */
export function matchPublicData(conceptSnippet: string = '', questionText: string = ''): PublicDataBundle {
  const combined = (conceptSnippet + ' ' + questionText).toLowerCase();

  for (const item of PUBLIC_EDUCATION_DATA) {
    if (combined.includes(item.conceptKey.toLowerCase())) {
      return item;
    }
  }

  // Fallback to vocational if vocational terms present
  if (combined.includes('프로그래밍') || combined.includes('코딩') || combined.includes('소프트웨어') || combined.includes('개발') || combined.includes('it')) {
    return PUBLIC_EDUCATION_DATA[9];
  } else if (combined.includes('전자') || combined.includes('회로') || combined.includes('op-amp') || combined.includes('다이오드') || combined.includes('트랜지스터')) {
    return PUBLIC_EDUCATION_DATA[10];
  } else if (combined.includes('수학') || combined.includes('방정식') || combined.includes('계산') || combined.includes('함수')) {
    return PUBLIC_EDUCATION_DATA[0];
  } else if (combined.includes('과학') || combined.includes('물리') || combined.includes('화학') || combined.includes('실험')) {
    return PUBLIC_EDUCATION_DATA[5];
  } else if (combined.includes('사회') || combined.includes('역사') || combined.includes('조선') || combined.includes('헌법')) {
    return PUBLIC_EDUCATION_DATA[7];
  } else if (combined.includes('영어') || combined.includes('english')) {
    return PUBLIC_EDUCATION_DATA[8];
  }

  return PUBLIC_EDUCATION_DATA[0];
}
