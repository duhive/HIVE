import { Member, CurriculumItem, FAQ } from './types';

export const REGULAR_CURRICULUM: CurriculumItem[] = [
  {
    id: 1,
    title: "Hospitality 세미나",
    period: "격주",
    description: "국내외 관광 산업의 최신 이슈와 트렌드를 다각도로 분석하고 시사점을 도출합니다.",
    kpi: "이슈 분석 리포트 발표 2회",
    outcomes: ["이슈 분석 보고서", "트렌드 브리핑"]
  },
  {
    id: 2,
    title: "Hospitality Case Study",
    period: "주간",
    description: "국내외 주요 호텔, 항공사, 플랫폼 및 혁신적인 관광 기업들의 실제 비즈니스 모델과 전략적 사례를 다각도로 분석하여 당면 과제에 대한 최적의 해결 방안을 도출합니다.",
    kpi: "글로벌 기업 비즈니스 혁신 사례 분석 및 연구 발표 2회",
    outcomes: ["사례 분석 리포트", "비즈니스 전략 제안서"]
  },
  {
    id: 3,
    title: "Academic Column & Magazine",
    period: "월간",
    description: "관광·호스피탈리티 산업 트렌드와 학회원들의 독창적인 통찰이 담긴 칼럼 및 학회 매거진을 기획하고 정기적으로 발행합니다.",
    kpi: "에세이 리서치 및 학회 매거진 기획안 구성",
    outcomes: ["학술 칼럼 리포트", "HIVE 매거진"]
  }
];

export const MAIN_ACTIVITIES: CurriculumItem[] = [
  {
    id: 1,
    title: "로컬 크리에이터 프로젝트",
    period: "1학기",
    description: "지역의 숨겨진 가치를 발굴하고 로컬 비즈니스 모델을 기획하여 지역 관광을 활성화합니다.",
    kpi: "로컬 비즈니스 제안서 완성 및 실무 검토",
    outcomes: ["로컬 크리에이터 로드맵", "프로젝트 포트폴리오"]
  },
  {
    id: 2,
    title: "H&T 학술연구제",
    period: "2학기",
    description: "1년 간의 자유 연구의 성과를 발표하고 공유하는 HIVE만의 학술축제입니다.",
    kpi: "최종 학술 발표 및 우수 연구 3편 시상",
    outcomes: ["학술지", "최종 발표 자료"]
  },
  {
    id: 3,
    title: "미스터리 쇼퍼 프로젝트",
    period: "시즌별",
    description: "호텔, 외식 기업 및 서비스 사업장을 대상으로 암행 평가를 실시하여 서비스 품질을 진단하고 실무적인 개선 전략을 수립합니다.",
    kpi: "서비스 품질 진단 리포트 및 개선 전략 제안서 완성",
    outcomes: ["비밀 감사 리포트", "서비스 블루프린트"]
  }
];

export const MEMBERS: Member[] = [
  {
    id: 1,
    name: "강경임",
    role: "1기 학회장",
    image: "https://i.ibb.co/v6z0pWtm/image.jpg",
    bio: "HIVE의 비전을 설계하고 학회의 성장을 주도합니다.",
    education: "호텔외식관광학과",
    skills: ["관광교육", "호텔경영"],
    contact: "rang4f58@naver.com"
  },
  {
    id: 2,
    name: "고승민",
    role: "YB",
    image: "https://i.ibb.co/ymb9d6wb/4.png",
    bio: "외부 파트너십을 강화하고 HIVE의 네트워크를 확장합니다.",
    education: "호텔외식관광학과",
    skills: ["MICE 경영", "호텔경영"],
    contact: "smko0619@naver.com"
  },
  {
    id: 3,
    name: "김민경",
    role: "PR",
    image: "https://i.ibb.co/TGvX4D7/28.png",
    bio: "HIVE의 브랜드 가치를 전달하고 소통의 창구를 만듭니다.",
    education: "호텔외식관광학과",
    skills: ["MICE 경영", "호텔경영"],
    contact: "min_0817@naver.com"
  },
  {
    id: 5,
    name: "김성학",
    role: "회계",
    image: "https://i.ibb.co/TGvX4D7/28.png",
    bio: "투명한 예산 관리로 학회의 안정적인 운영을 지원합니다.",
    education: "호텔외식관광학과",
    skills: ["MICE 경영", "항공서비스"],
    contact: "ksh0020203@naver.com"
  },
  {
    id: 6,
    name: "김재환",
    role: "YB",
    image: "https://i.ibb.co/v6rTnkYv/Kakao-Talk-20260322-200810881.jpg",
    bio: "글로벌 시장으로의 도약을 위한 대외 협력을 담당합니다.",
    education: "호텔관광경영학부",
    skills: ["글로벌 전략", "파트너십"],
    contact: "TBD"
  },
  {
    id: 7,
    name: "김하경",
    role: "대외협력",
    image: "https://i.ibb.co/mC5PxwhH/image.png",
    bio: "지역 관광 활성화를 위한 전략적 제휴를 추진합니다.",
    education: "관광항공경영학과",
    skills: ["지역관광개발", "항공서비스"],
    contact: "khkzz0802@naver.com"
  },
  {
    id: 8,
    name: "박예은",
    role: "교육",
    image: "https://i.ibb.co/9mTfw9zq/image.jpg",
    bio: "창의적인 콘텐츠로 HIVE의 연구 성과를 시각화합니다.",
    education: "호텔외식관광학과 / 일본어일본학과",
    skills: ["국제관광", "지역관광개발"],
    contact: "yeeun8556@naver.com"
  },
  {
    id: 10,
    name: "조석기",
    role: "YB",
    image: "https://i.ibb.co/TGvX4D7/28.png",
    bio: "현장 중심의 대외 활동으로 실무적 시너지를 창출합니다.",
    education: "호텔외식관광학과",
    skills: ["항공서비스", "호텔경영"],
    contact: "seokgi205@gmail.com"
  },
  {
    id: 11,
    name: "Jeanne Dickey",
    role: "대외협력",
    image: "https://i.ibb.co/TGvX4D7/28.png",
    bio: "글로벌 호스피탈리티 트렌드를 분석하고 공유합니다.",
    education: "호텔외식관광학과",
    skills: ["호텔경영", "관광서비스"],
    contact: "TBD"
  },
  {
    id: 12,
    name: "박지호",
    role: "Convergence Partner",
    image: "https://i.ibb.co/93V2Mn1T/image.jpg",
    bio: "Exploring the future of aviation through the fusion of English Education and Psychology.",
    education: "영어교육과 / 심리학과",
    skills: ["항공서비스", "항공경영"],
    contact: "jiho5690@naver.com"
  },
  {
    id: 13,
    name: "전나영",
    role: "Convergence Partner",
    image: "https://i.ibb.co/KxdRcy4B/image.jpg",
    bio: "Creating new value through the fusion of Geography Education and Aviation Service.",
    education: "지리교육과",
    skills: ["항공서비스", "지리교육"],
    contact: "pss76@naver.com"
  },
  {
    id: 14,
    name: "송수민",
    role: "Convergence Partner",
    image: "https://i.ibb.co/TGvX4D7/28.png",
    bio: "Creating synergistic value through various interdisciplinary approaches in Hospitality.",
    education: "경영학과",
    skills: ["항공서비스", "항공경영"],
    contact: "TBD"
  }
];

export const BRAND_STORY = {
  origin: "HIVE는 대구대학교 호텔외식관광학과를 대표하는 호스피탈리티 경영학회로, 서비스 산업의 본질을 탐구하고 변화하는 미래 가치를 공유하기 위해 설립되었습니다.",
  problem: "전통적인 교육과 실무 사이의 연결을 고민하며, 현대 사회의 다양한 접점에서 발생하는 경험을 이해하고 혁신적인 환대의 가치를 제안하는 것이 우리의 목표입니다.",
  difference: "우리는 단순히 지식을 쌓는 데 그치지 않고, 실질적인 프로젝트와 창의적인 기획을 통해 따스한 성품과 전문성을 갖춘 호스피탈리티 리더로서 함께 성장합니다.",
  vision: "환대(Hospitality), 혁신(Innovation), 가치(Value), 경험(Experience) - 이것이 HIVE가 지향하는 본질입니다."
};

export const PARTNER_MEMBERS: Member[] = [
  {
    id: 102,
    name: "이정현",
    role: "Partner",
    category: "Alumni Partners",
    image: "https://i.ibb.co/TGvX4D7/28.png",
    bio: "HIVE의 성장을 함께 응원하는 졸업생 파트너입니다.",
    education: "부산세연고등학교 교사",
    skills: ["호스피탈리티", "네트워킹"],
    contact: "TBD"
  },
  {
    id: 104,
    name: "김보민",
    role: "Partner",
    category: "Alumni Partners",
    image: "https://i.ibb.co/TGvX4D7/28.png",
    bio: "데이터 기반의 관광 연구를 통해 학문적 깊이를 더합니다.",
    education: "대구대학교 호텔관광연구실",
    skills: ["인공지능", "스마트관광"],
    contact: "kbm010525@naver.com",
    experience: [
      "2024. 08 경상남도 산청군 관광개발 예비사업 연구개발과제 인턴"
    ]
  },
  {
    id: 105,
    name: "박유진",
    role: "Partner",
    category: "Alumni Partners",
    image: "https://i.ibb.co/Z1Tk4T4L/2026-05-05-160901.png",
    bio: "사용자 경험 중심의 서비스 디자인을 연구합니다.",
    education: "대구대학교 호텔관광연구실",
    skills: ["지역관광개발", "서비스 경험 디자인"],
    contact: "yujinpark0311@naver.com",
    experience: [
      "2023. 08 한국관광공사 주관, 국제이벤트 지원사업 전문가 평가단",
      "2024. 08 경상남도 산청군 관광개발 예비사업 연구개발과제 인턴",
      "2026. 04 ~ : 대구관광고등학교 시간강사(관광문화와자원, 웨딩)"
    ]
  }
];

export const FAQS: FAQ[] = [
  {
    question: "어떤 전공이 지원 가능한가요?",
    answer: "호텔외식관광전공 학부생이 지원 가능합니다."
  },
  {
    question: "선발 프로세스는 어떻게 되나요?",
    answer: "서류 전형과 면접 전형을 거쳐 최종 선발됩니다. 단순 스펙보다는 학회 활동에 대한 몰입도와 성장 가능성을 중점적으로 평가합니다."
  },
  {
    question: "활동 기간은 어떻게 되나요?",
    answer: "기본적으로 1년(2학기) 활동을 원칙으로 합니다. 이는 프로젝트의 연속성과 심도 있는 성장을 위함입니다."
  }
];
