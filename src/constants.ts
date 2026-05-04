import { Member, CurriculumItem, FAQ } from './types';

export const REGULAR_CURRICULUM: CurriculumItem[] = [
  {
    id: 1,
    title: "자유주제연구",
    period: "Weekly",
    description: "학회원들이 직접 선정한 관광 및 호스피탈리티 관련 주제를 심도 있게 탐구하고 분석합니다.",
    kpi: "주간 연구 리포트 발행 및 피드백",
    outcomes: ["Research Paper", "Insight Deck"]
  },
  {
    id: 2,
    title: "글로벌 관광 이슈분석",
    period: "Bi-weekly",
    description: "국내외 관광 산업의 최신 이슈와 트렌드를 다각도로 분석하고 시사점을 도출합니다.",
    kpi: "이슈 분석 리포트 발표 4회",
    outcomes: ["Issue Analysis Report", "Trend Briefing"]
  },
  {
    id: 3,
    title: "Reading & Idea Development",
    period: "Monthly",
    description: "호스피탈리티와 인문학적 텍스트를 통해 새로운 관점을 도출하고 창의적인 아이디어를 개발합니다.",
    kpi: "독서 토론 및 아이디어 제안서",
    outcomes: ["Book Review Report", "Idea Deck"]
  }
];

export const MAIN_ACTIVITIES: CurriculumItem[] = [
  {
    id: 1,
    title: "로컬 크리에이터 프로젝트",
    period: "1st Semester",
    description: "지역의 숨겨진 가치를 발굴하고 로컬 비즈니스 모델을 기획하여 지역 관광을 활성화합니다.",
    kpi: "로컬 비즈니스 제안서 완성 및 실무 검토",
    outcomes: ["Local Creator Roadmap", "Project Portfolio"]
  },
  {
    id: 2,
    title: "H&T 학술연구제",
    period: "2nd Semester",
    description: "1년 간의 자유 연구의 성과를 발표하고 공유하는 HIVE만의 학술축제입니다.",
    kpi: "최종 학술 발표 및 우수 연구 3편 시상",
    outcomes: ["Academic Journal", "Final Presentation Deck"]
  },
  {
    id: 3,
    title: "미스터리 쇼퍼 프로젝트",
    period: "Seasonal",
    description: "호텔, 외식 기업 및 서비스 사업장을 대상으로 암행 평가를 실시하여 서비스 품질을 진단하고 실무적인 개선 전략을 수립합니다.",
    kpi: "서비스 품질 진단 리포트 및 개선 전략 제안서 완성",
    outcomes: ["Secret Audit Report", "Service Blueprint"]
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
    skills: ["Tourism Education", "Hotel Management"],
    contact: "rang4f58@naver.com"
  },
  {
    id: 2,
    name: "고승민",
    role: "YB",
    image: "https://i.ibb.co/ymb9d6wb/4.png",
    bio: "외부 파트너십을 강화하고 HIVE의 네트워크를 확장합니다.",
    education: "호텔외식관광학과",
    skills: ["MICE Management", "Hotel Management"],
    contact: "smko0619@naver.com"
  },
  {
    id: 3,
    name: "김민경",
    role: "PR",
    image: "https://i.ibb.co/TGvX4D7/28.png",
    bio: "HIVE의 브랜드 가치를 전달하고 소통의 창구를 만듭니다.",
    education: "호텔외식관광학과",
    skills: ["MICE Management", "Hotel Management"],
    contact: "min_0817@naver.com"
  },
  {
    id: 5,
    name: "김성학",
    role: "회계",
    image: "https://i.ibb.co/TGvX4D7/28.png",
    bio: "투명한 예산 관리로 학회의 안정적인 운영을 지원합니다.",
    education: "호텔외식관광학과",
    skills: ["MICE Management", "Aviation Service"],
    contact: "ksh0020203@naver.com"
  },
  {
    id: 6,
    name: "김재환",
    role: "YB",
    image: "https://i.ibb.co/v6rTnkYv/Kakao-Talk-20260322-200810881.jpg",
    bio: "글로벌 시장으로의 도약을 위한 대외 협력을 담당합니다.",
    education: "호텔관광경영학부",
    skills: ["Global Strategy", "Partnership"],
    contact: "TBD"
  },
  {
    id: 7,
    name: "김하경",
    role: "대외협력",
    image: "https://i.ibb.co/mC5PxwhH/image.png",
    bio: "지역 관광 활성화를 위한 전략적 제휴를 추진합니다.",
    education: "관광항공경영학과",
    skills: ["Regional Tourism Development", "Aviation Service"],
    contact: "khkzz0802@naver.com"
  },
  {
    id: 8,
    name: "박예은",
    role: "교육",
    image: "https://i.ibb.co/9mTfw9zq/image.jpg",
    bio: "창의적인 콘텐츠로 HIVE의 연구 성과를 시각화합니다.",
    education: "호텔외식관광학과",
    skills: ["International Tourism", "Regional Tourism Development"],
    contact: "yeeun8556@naver.com"
  },
  {
    id: 10,
    name: "조석기",
    role: "YB",
    image: "https://i.ibb.co/TGvX4D7/28.png",
    bio: "현장 중심의 대외 활동으로 실무적 시너지를 창출합니다.",
    education: "호텔외식관광학과",
    skills: ["Aviation Service", "Hotel Management"],
    contact: "seokgi205@gmail.com"
  },
  {
    id: 11,
    name: "Jeanne Dickey",
    role: "대외협력",
    image: "https://i.ibb.co/TGvX4D7/28.png",
    bio: "글로벌 호스피탈리티 트렌드를 분석하고 공유합니다.",
    education: "호텔외식관광학과",
    skills: ["Hotel Management", "Tourism Service"],
    contact: "TBD"
  }
];

export const BRAND_STORY = {
  origin: "Hospitality경영학회 HIVE는 2026년 호텔외식관광학과에 신설된 학회로 호스피탈리티산업 전반과 관광산업을 중심으로 여가 • 엔터테인먼트, 핀테크 등 경영 기획 역량과 디지털 기술을 융합한 실무형 인재 양성을 목표로 하는 학회입니다.",
  problem: "급변하는 산업 환경에서 단순한 서비스 역량을 넘어, 데이터와 기술을 이해하고 비즈니스를 설계할 수 있는 융합형 전문가에 대한 수요가 급증하고 있습니다.",
  difference: "우리는 호스피탈리티의 본질에 핀테크, 엔터테인먼트 등 이종 산업의 기술을 결합하여 새로운 가치를 창출하는 프로젝트 중심의 실무 커뮤니티입니다.",
  vision: "Vision 2026-2035: 글로벌 Hospitality 전략 컨설팅 네트워크의 중심"
};

export const PARTNER_MEMBERS: Member[] = [
  {
    id: 102,
    name: "이정현",
    role: "Partner",
    category: "Alumni Partners",
    image: "https://i.ibb.co/TGvX4D7/28.png",
    bio: "HIVE의 성장을 함께 응원하는 졸업생 파트너입니다.",
    education: "부산세연고등학교",
    skills: ["Hospitality", "Networking"],
    contact: "TBD"
  },
  {
    id: 103,
    name: "박지호",
    role: "Partner",
    category: "Convergence Partners",
    image: "https://i.ibb.co/93V2Mn1T/image.jpg",
    bio: "Exploring the future of aviation through the fusion of English Education and Psychology.",
    education: "영어교육과 & 심리학과",
    skills: ["Aviation Service", "Aviation Management"],
    contact: "jiho5690@naver.com"
  },
  {
    id: 104,
    name: "김보민",
    role: "Partner",
    category: "Alumni Partners",
    image: "https://i.ibb.co/TGvX4D7/28.png",
    bio: "데이터 기반의 관광 연구를 통해 학문적 깊이를 더합니다.",
    education: "일반대학원 관광경영학과",
    skills: ["AI", "Smart Tourism"],
    contact: "kbm010525@naver.com"
  },
  {
    id: 105,
    name: "박유진",
    role: "Partner",
    category: "Alumni Partners",
    image: "https://i.ibb.co/FLWQ3Y8Z/me.png",
    bio: "사용자 경험 중심의 서비스 디자인을 연구합니다.",
    education: "일반대학원 관광경영학과",
    skills: ["Regional Tourism Development", "Foodservice Management"],
    contact: "yujinpark0311@naver.com"
  },
  {
    id: 106,
    name: "전나영",
    role: "Partner",
    category: "Convergence Partners",
    image: "https://i.ibb.co/KxdRcy4B/image.jpg",
    bio: "Creating new value through the fusion of Geography Education and Aviation Service.",
    education: "지리교육과",
    skills: ["Aviation Service", "Geography Education"],
    contact: "pss76@naver.com"
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
