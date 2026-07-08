import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Plus, RotateCcw, Edit2, Trash2, BookOpen, 
  X, Loader2, CheckCircle2, AlertTriangle, PlusCircle 
} from 'lucide-react';
import { db } from '../firebase';
import { 
  collection, getDocs, addDoc, updateDoc, deleteDoc, 
  doc, writeBatch, query, orderBy, serverTimestamp 
} from 'firebase/firestore';
import { WeeklySession } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {},
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const DEFAULT_WEEKLY_SESSIONS: Omit<WeeklySession, 'id'>[] = [
  // 1학기 (Spring)
  {
    week: 1,
    track: '정기 세미나',
    title: 'HIVE Orientation',
    description: '학회 이념, 글로벌 서비스 경영학 기초 개념 정리 및 팀 편성',
    deliverable: '팀별 연구 도메인 선정 보고서',
    semester: '1학기'
  },
  {
    week: 2,
    track: '실무 워크숍',
    title: 'Service Trend',
    description: '사용자 관점의 서비스 접점(Touchpoint) 진단 및 문제 정의 방법론',
    deliverable: '초안 Customer Journey Map',
    semester: '1학기'
  },
  {
    week: 3,
    track: '팀 프로젝트',
    title: 'Business Case Study',
    description: '무인 키오스크, 생체인식, IoT 기기 도입에 따른 서비스 블루프린트 개편',
    deliverable: 'DX 서비스 아키텍처 다이어그램',
    semester: '1학기'
  },
  {
    week: 4,
    track: '정기 세미나',
    title: '중간 학술 리포트 공유회',
    description: '연구 주제 중간 점검 및 학술적 피드백 수렴',
    deliverable: '중간 학술 리포트 피피티',
    semester: '1학기'
  },
  {
    week: 5,
    track: '실무 워크숍',
    title: 'UX/UI 서비스 분석',
    description: '디지털 헬스케어 및 스마트 팩토리 서비스의 사용자 경험 분석',
    deliverable: 'UX 평가 분석 보고서',
    semester: '1학기'
  },
  {
    week: 6,
    track: '팀 프로젝트',
    title: '스마트 시나리오 제안',
    description: 'HIVE 1차 프로젝트 최종 발표 및 혁신 서비스 시나리오 피칭',
    deliverable: '최종 학술 칼럼 초안',
    semester: '1학기'
  },
  // 2학기 (Fall)
  {
    week: 1,
    track: '정기 세미나',
    title: '2학기 Kick-off & 트렌드 전망',
    description: '하반기 호스피탈리티 테크 동향 공유 및 연구 주제 매칭',
    deliverable: '개인 연구 계획서',
    semester: '2학기'
  },
  {
    week: 2,
    track: '실무 워크숍',
    title: '빅데이터 분석 실무',
    description: 'R 및 Python을 이용한 글로벌 관광 행동 데이터 전처리 및 탐색적 분석',
    deliverable: '데이터 시각화 그래프',
    semester: '2학기'
  },
  {
    week: 3,
    track: '팀 프로젝트',
    title: 'AI 에이전트 서비스 기획',
    description: '관광/호텔 컨시어지 AI 에이전트 프롬프트 엔지니어링 및 시나리오 구축',
    deliverable: 'AI 가이드 시나리오 시연영상',
    semester: '2학기'
  },
  {
    week: 4,
    track: '정기 세미나',
    title: '2학기 중간 교류회',
    description: '타 학회 연계 학술 포럼 준비 및 합동 연구 점검',
    deliverable: '포럼 발표용 요약본',
    semester: '2학기'
  },
  {
    week: 5,
    track: '실무 워크숍',
    title: '플랫폼 비즈니스 고도화',
    description: '관광 유통 플랫폼(OTA) 비즈니스 모델 캔버스 고도화 및 분석',
    deliverable: 'OTA 비즈니스 개선 제안서',
    semester: '2학기'
  },
  {
    week: 6,
    track: '종합 학술제',
    title: '최종 HIVE 학술제',
    description: '한 해 연구 성과 공유 및 H&T Academic Portal 등재 심사',
    deliverable: '학회 보도자료 및 최종 논문',
    semester: '2학기'
  }
];

interface PresentationTopic {
  title: string;
  category: string;
  description: string;
  round: number; // 1 or 2
}

const FIRST_SEMESTER_TOPICS: PresentationTopic[] = [
  // Round 1
  {
    title: '제주특별자치도 관광 산업의 발전 전략',
    category: '로컬 관광 개발',
    description: '제주 관광 산업의 지속 가능한 미래 발전 방안 및 인프라 고도화 연구',
    round: 1
  },
  {
    title: '스포츠 메가 이벤트(마라톤 축제)와 관광산업 시너지',
    category: '스포츠 레저 관광',
    description: '참여형 스포츠 이벤트 활성화가 지역 목적지 관광 수요 및 상권에 미치는 효과',
    round: 1
  },
  {
    title: '지역 대표 축제의 경제적 효과와 지속 가능성',
    category: '축제 경제학',
    description: '로컬 축제의 실질적 경제 파급 효과 측정 모델 및 지속 가능한 친환경 관리 설계',
    round: 1
  },
  {
    title: '글로벌 호스피탈리티 호텔 서비스 오퍼레이션의 이해',
    category: '호스피탈리티',
    description: '현대 호텔 산업 내 핵심 서비스 접점 및 효율적 고객 여정 관리 모델링',
    round: 1
  },
  {
    title: '축제/이벤트가 도시 목적지 브랜드 이미지에 미치는 영향',
    category: '목적지 브랜딩',
    description: '메가 이벤트 기획과 브랜딩 활동이 도시 이미지 및 관광객 재방문 의도에 미치는 영향',
    round: 1
  },
  {
    title: '서비스 여정 단계별 맞춤형 고객 경험(CX) 설계',
    category: '경험 디자인 (CX)',
    description: '디지털 및 대면 터치포인트 진단을 통한 고객 여정 지도(CJM) 고도화 방법론',
    round: 1
  },
  {
    title: '지방 소도시 활성화를 위한 로컬 관광 콘텐츠 제안',
    category: '소도시 활성화',
    description: '인구 감소 지역의 생존을 위한 특색 있는 로컬 콘텐츠 발굴 및 관광 생태계 활성화',
    round: 1
  },
  {
    title: '국내 크루즈 관광 산업 분석 및 연계 고도화',
    category: '모빌리티 & 크루즈',
    description: '크루즈 관광 시장 동향 및 국내 주요 기항지 연계 관광 활성화 서비스 프레임워크',
    round: 1
  },
  // Round 2
  {
    title: '국제 지정학적 리스크 및 유가 상승과 글로벌 관광 산업 영향',
    category: '거시경제 분석',
    description: '거시 정세 변화와 에너지 비용 변동이 국제 관광 수요 및 교통 인프라에 미치는 복합 영향',
    round: 2
  },
  {
    title: '역사·문화유산 보존과 지속 가능한 관광 수요의 상관관계',
    category: '문화유산 연계',
    description: '역사 문화재 보존 상태 및 매력도가 글로벌 관광 수요 촉진에 미치는 인과 분석',
    round: 2
  },
  {
    title: '저비용 항공사(LCC) 성장과 아웃바운드 관광 확대',
    category: '항공 모빌리티',
    description: 'LCC 신규 취항 및 요금 전략이 글로벌 관광객 행동 및 여행 접근성 개선에 미치는 영향',
    round: 2
  },
  {
    title: '가상자산(Blockchain, BTC, ETH)의 이해와 호스피탈리티 접목',
    category: '핀테크 융합',
    description: '분산 원장 기술 및 가상자산 결제 도입이 관광 서비스 접점 편의성에 미치는 변화 예측',
    round: 2
  },
  {
    title: '한·미 호스피탈리티 서비스 스타일과 접대 문화 비교',
    category: '글로벌 서비스 비교',
    description: '한국 고유의 인적 서비스 강점과 미국의 비즈니스 지향적 프로페셔널 서비스 강단 분석',
    round: 2
  },
  {
    title: 'MZ세대의 새로운 소셜 네트워크와 글로벌 주류 소비 시장 변화',
    category: '주류 소비 트렌드',
    description: '글로벌 주류 트렌드와 웰니스 음주 소비 패턴(스마도리 등)의 변화가 미치는 상업적 가치',
    round: 2
  },
  {
    title: '호스피탈리티 근무환경이 직무만족 및 이직의도에 미치는 인과 분석',
    category: '인적 자원 관리',
    description: '서비스 직무 몰입에 영향을 미치는 내부 마케팅 및 근무 만족도 제고 전략 제안',
    round: 2
  }
];

export const WeeklyRoadmap = () => {
  const [sessions, setSessions] = useState<WeeklySession[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>('1학기');
  const [presentationRound, setPresentationRound] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingSession, setEditingSession] = useState<WeeklySession | null>(null);
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState<boolean>(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState<boolean>(false);
  const [sessionToDelete, setSessionToDelete] = useState<WeeklySession | null>(null);

  // Form Fields
  const [formWeek, setFormWeek] = useState<number>(1);
  const [formTrack, setFormTrack] = useState<string>('공통 (Common)');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formDeliverable, setFormDeliverable] = useState<string>('');
  const [formSemester, setFormSemester] = useState<string>('1학기');

  const fetchSessions = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const q = query(collection(db, 'weeklySessions'), orderBy('week', 'asc'));
      const snapshot = await getDocs(q);
      const fetched: WeeklySession[] = [];
      snapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() } as WeeklySession);
      });

      // If no sessions exist in DB, pre-seed them for an exquisite user experience!
      if (fetched.length === 0) {
        await seedDefaultSessions();
      } else {
        setSessions(fetched);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'weeklySessions');
      setErrorMsg('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const seedDefaultSessions = async () => {
    setIsSaving(true);
    try {
      const batch = writeBatch(db);
      DEFAULT_WEEKLY_SESSIONS.forEach((session) => {
        const newDocRef = doc(collection(db, 'weeklySessions'));
        batch.set(newDocRef, {
          ...session,
          createdAt: serverTimestamp()
        });
      });
      await batch.commit();
      
      // Re-fetch
      const q = query(collection(db, 'weeklySessions'), orderBy('week', 'asc'));
      const snapshot = await getDocs(q);
      const fetched: WeeklySession[] = [];
      snapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() } as WeeklySession);
      });
      setSessions(fetched);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'weeklySessions');
      setErrorMsg('초기 데이터 생성 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    setIsSaving(true);
    setErrorMsg(null);
    try {
      // 1. Delete all current
      const snapshot = await getDocs(collection(db, 'weeklySessions'));
      const batch = writeBatch(db);
      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      // 2. Seed default
      await seedDefaultSessions();
      setIsConfirmResetOpen(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'weeklySessions');
      setErrorMsg('초기화 도중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenAddForm = () => {
    setEditingSession(null);
    // Find next week number for convenience
    const currentSemesterSessions = sessions.filter(s => s.semester === selectedSemester);
    const maxWeek = currentSemesterSessions.reduce((max, s) => s.week > max ? s.week : max, 0);
    
    setFormWeek(maxWeek + 1);
    setFormTrack('정기 세미나');
    setFormTitle('');
    setFormDescription('');
    setFormDeliverable('');
    setFormSemester(selectedSemester);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (session: WeeklySession) => {
    setEditingSession(session);
    setFormWeek(session.week);
    setFormTrack(session.track);
    setFormTitle(session.title);
    setFormDescription(session.description);
    setFormDeliverable(session.deliverable);
    setFormSemester(session.semester);
    setIsFormOpen(true);
  };

  const handleSaveSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    setIsSaving(true);
    setErrorMsg(null);
    try {
      if (editingSession?.id) {
        // Edit Mode
        const docRef = doc(db, 'weeklySessions', editingSession.id);
        const updateData = {
          week: Number(formWeek),
          track: formTrack,
          title: formTitle,
          description: formDescription,
          deliverable: formDeliverable,
          semester: formSemester,
        };
        await updateDoc(docRef, updateData);
        
        setSessions(prev => prev.map(s => s.id === editingSession.id ? { ...s, ...updateData } : s));
      } else {
        // Add Mode
        const docRef = await addDoc(collection(db, 'weeklySessions'), {
          week: Number(formWeek),
          track: formTrack,
          title: formTitle,
          description: formDescription,
          deliverable: formDeliverable,
          semester: formSemester,
          createdAt: serverTimestamp()
        });

        const newSession: WeeklySession = {
          id: docRef.id,
          week: Number(formWeek),
          track: formTrack,
          title: formTitle,
          description: formDescription,
          deliverable: formDeliverable,
          semester: formSemester,
        };
        setSessions(prev => [...prev, newSession]);
      }
      setIsFormOpen(false);
    } catch (err) {
      handleFirestoreError(err, editingSession ? OperationType.UPDATE : OperationType.CREATE, 'weeklySessions');
      setErrorMsg('세션을 저장하는 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = (session: WeeklySession) => {
    setSessionToDelete(session);
    setIsConfirmDeleteOpen(true);
  };

  const handleDeleteSession = async () => {
    if (!sessionToDelete?.id) return;
    setIsSaving(true);
    setErrorMsg(null);
    try {
      await deleteDoc(doc(db, 'weeklySessions', sessionToDelete.id));
      setSessions(prev => prev.filter(s => s.id !== sessionToDelete.id));
      setIsConfirmDeleteOpen(false);
      setSessionToDelete(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'weeklySessions');
      setErrorMsg('세션을 삭제하는 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  // Filter and sort sessions
  const filteredSessions = sessions
    .filter(s => s.semester === selectedSemester)
    .sort((a, b) => a.week - b.week);

  // Track colors helper
  const getTrackBadgeClass = (track: string) => {
    if (track.includes('세미나')) {
      return 'bg-navy-900/5 text-navy-900 border-navy-900/10';
    } else if (track.includes('워크숍')) {
      return 'bg-hive-green/5 text-hive-green border-hive-green/20';
    } else if (track.includes('프로젝트')) {
      return 'bg-hive-green text-white border-transparent';
    } else if (track.includes('학술제')) {
      return 'bg-navy-900 text-white border-transparent';
    }
    return 'bg-navy-900/5 text-navy-900 border-navy-900/10';
  };

  return (
    <div className="w-full">
      {/* Semester Header & Controls in one bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-hive-green" />
          <h4 className="text-xl font-bold text-navy-900 font-display">
            {selectedSemester} 주차별 학술 세션 계획
          </h4>
          <span className="text-xs bg-navy-900/5 text-navy-900/60 font-bold px-2.5 py-1 rounded-full">
            총 {filteredSessions.length}개 세션
          </span>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center">
          {/* Semester selection */}
          <div className="bg-navy-900/5 p-1 rounded-xl flex">
            <button
              onClick={() => setSelectedSemester('1학기')}
              className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-300 cursor-pointer ${
                selectedSemester === '1학기'
                  ? 'bg-hive-green text-white shadow-xs'
                  : 'text-navy-900/50 hover:text-navy-900 hover:bg-hive-green/5'
              }`}
            >
              1학기 (Spring)
            </button>
            <button
              onClick={() => setSelectedSemester('2학기')}
              className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-300 cursor-pointer ${
                selectedSemester === '2학기'
                  ? 'bg-hive-green text-white shadow-xs'
                  : 'text-navy-900/50 hover:text-navy-900 hover:bg-hive-green/5'
              }`}
            >
              2학기 (Fall)
            </button>
          </div>

          {/* Create Button */}
          <button
            onClick={handleOpenAddForm}
            className="flex items-center gap-1 bg-navy-900 text-white px-3.5 py-2 rounded-xl text-xs font-extrabold hover:bg-black transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>주차 세션 추가</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={() => setIsConfirmResetOpen(true)}
            className="flex items-center gap-1 bg-white text-rose-600 border border-rose-200 px-3.5 py-2 rounded-xl text-xs font-extrabold hover:bg-rose-50 transition-all shrink-0 cursor-pointer"
            title="기본 커리큘럼으로 초기화"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>초기화</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <p className="text-sm text-rose-700 font-semibold">{errorMsg}</p>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-navy-900/10">
          <Loader2 className="w-8 h-8 text-hive-green animate-spin mb-3" />
          <p className="text-sm text-navy-900/50 font-bold">주차별 세션을 불러오는 중입니다...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredSessions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-dashed border-navy-900/20"
              >
                <Calendar className="w-10 h-10 text-navy-900/30 mb-2" />
                <p className="text-sm text-navy-900/60 font-bold">등록된 세션이 없습니다.</p>
                <button
                  onClick={handleOpenAddForm}
                  className="mt-4 text-xs font-extrabold text-hive-green flex items-center gap-1 hover:underline"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  첫 주차 세션 추가하기
                </button>
              </motion.div>
            ) : (
              filteredSessions.map((session, idx) => (
                <motion.div
                  key={session.id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  className="bg-white rounded-2xl p-5 border border-navy-900/5 shadow-xs hover:shadow-md hover:border-navy-900/10 transition-all duration-300 flex flex-col sm:flex-row items-start gap-5 group"
                >
                  {/* Left Week Square badge */}
                  <div className="w-16 h-16 rounded-xl bg-navy-900 text-white flex flex-col items-center justify-center shrink-0 shadow-xs">
                    <span className="text-[9px] font-bold tracking-widest text-white/60">WEEK</span>
                    <span className="text-2xl font-black font-display leading-none mt-0.5">{session.week}</span>
                  </div>

                  {/* Content area */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 text-[10px] font-extrabold border rounded-md uppercase tracking-wider ${getTrackBadgeClass(session.track)}`}>
                        {session.track}
                      </span>
                    </div>

                    <h5 className="text-base font-extrabold text-navy-900 mb-1.5 leading-snug">
                      {session.title}
                    </h5>
                    
                    <p className="text-xs text-navy-900/60 font-semibold mb-3 leading-relaxed">
                      {session.description}
                    </p>

                    {session.deliverable && (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-black text-navy-900 shrink-0">산출물:</span>
                        <span className="px-2.5 py-1 text-[10px] font-bold bg-[#f8fafc] text-navy-900/80 border border-slate-200 rounded-md">
                          {session.deliverable}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions buttons */}
                  <div className="flex sm:flex-col items-center gap-1.5 sm:self-center self-end shrink-0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleOpenEditForm(session)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-navy-900/60 bg-navy-900/5 hover:bg-navy-900/10 hover:text-navy-900 transition-all cursor-pointer"
                      title="세션 수정"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>수정</span>
                    </button>
                    <button
                      onClick={() => handleConfirmDelete(session)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-all cursor-pointer"
                      title="세션 삭제"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>삭제</span>
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 1학기 학술 세미나 연구 주제 Section */}
      {selectedSemester === '1학기' && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 pt-16 border-t border-navy-900/10"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
            <div>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-hive-green/10 text-hive-green text-[10px] font-bold rounded-full mb-3 uppercase tracking-wider">
                💡 Academic Seminar Topics
              </span>
              <h4 className="text-2xl font-bold text-navy-900 font-display">
                1학기 학회원 학술 세미나 연구 주제
              </h4>
              <p className="text-xs text-navy-900/50 font-semibold mt-1">
                학회원들이 1학기 동안 진행한 개인별 연구 주제 및 글로벌 서비스 관광 이슈 분석 세션의 실무 발표 아카이브입니다.
              </p>
            </div>
            
            {/* Round Filter Tabs */}
            <div className="flex gap-1 bg-navy-900/5 p-1 rounded-xl self-start lg:self-end">
              <button
                type="button"
                onClick={() => setPresentationRound(1)}
                className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all duration-300 cursor-pointer ${
                  presentationRound === 1
                    ? 'bg-hive-green text-white shadow-xs'
                    : 'text-navy-900/50 hover:text-navy-900 hover:bg-hive-green/5'
                }`}
              >
                1차 학술 세미나 발표
              </button>
              <button
                type="button"
                onClick={() => setPresentationRound(2)}
                className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all duration-300 cursor-pointer ${
                  presentationRound === 2
                    ? 'bg-hive-green text-white shadow-xs'
                    : 'text-navy-900/50 hover:text-navy-900 hover:bg-hive-green/5'
                }`}
              >
                2차 글로벌 관광 이슈 분석
              </button>
            </div>
          </div>

          {/* Grid of Topics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FIRST_SEMESTER_TOPICS.filter(t => t.round === presentationRound).map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-navy-900/5 shadow-xs hover:shadow-md hover:border-hive-green/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2.5 py-0.5 bg-navy-900/5 text-navy-900/70 border border-navy-900/10 text-[9px] font-extrabold rounded-md mb-3.5 tracking-wider uppercase">
                    {topic.category}
                  </span>
                  <h5 className="text-sm font-extrabold text-navy-900 mb-2 leading-snug">
                    {topic.title}
                  </h5>
                  <p className="text-[11px] text-navy-900/60 font-semibold leading-relaxed">
                    {topic.description}
                  </p>
                </div>
                <div className="mt-5 pt-3.5 border-t border-navy-900/5 flex items-center justify-between">
                  <span className="text-[9px] font-black text-hive-green uppercase tracking-wider">
                    {presentationRound === 1 ? 'Academic Research' : 'Global Issues'}
                  </span>
                  <span className="text-[10px] font-bold text-navy-900/30 font-mono">
                    HIVE-{presentationRound === 1 ? 'R1' : 'R2'}-0{i + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* MODAL: Add/Edit Form */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-xl overflow-hidden border border-navy-900/10"
            >
              <div className="p-6 border-b border-navy-900/5 flex items-center justify-between bg-[#f8fafc]">
                <h5 className="font-extrabold text-navy-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-hive-green" />
                  <span>{editingSession ? '주차 세션 수정' : '새 주차 세션 추가'}</span>
                </h5>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-navy-900/5 text-navy-900/40 hover:text-navy-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveSession} className="p-6 space-y-4">
                {/* Semester and Week */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black text-navy-900 uppercase tracking-wider mb-1.5">
                      학기 구분 *
                    </label>
                    <select
                      value={formSemester}
                      onChange={(e) => setFormSemester(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-navy-900/10 text-xs font-bold focus:outline-hidden focus:border-hive-green"
                    >
                      <option value="1학기">1학기 (Spring)</option>
                      <option value="2학기">2학기 (Fall)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-navy-900 uppercase tracking-wider mb-1.5">
                      주차 (Week) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={52}
                      value={formWeek}
                      onChange={(e) => setFormWeek(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-navy-900/10 text-xs font-bold focus:outline-hidden focus:border-hive-green"
                    />
                  </div>
                </div>

                {/* Track */}
                <div>
                  <label className="block text-[11px] font-black text-navy-900 uppercase tracking-wider mb-1.5">
                    세션 구분 (분류) *
                  </label>
                  <select
                    value={formTrack}
                    onChange={(e) => setFormTrack(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-navy-900/10 text-xs font-bold focus:outline-hidden focus:border-hive-green mb-2"
                  >
                    <option value="정기 세미나">정기 세미나</option>
                    <option value="실무 워크숍">실무 워크숍</option>
                    <option value="팀 프로젝트">팀 프로젝트</option>
                    <option value="종합 학술제">종합 학술제</option>
                    <option value="기타">기타 (직접 입력)</option>
                  </select>
                  {formTrack === '기타' && (
                    <input
                      type="text"
                      placeholder="구분명을 입력하세요 (예: 특별 강연)"
                      required
                      onChange={(e) => setFormTrack(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-navy-900/10 text-xs font-bold focus:outline-hidden focus:border-hive-green"
                    />
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-[11px] font-black text-navy-900 uppercase tracking-wider mb-1.5">
                    세션 제목 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="세션 제목을 입력해주세요"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-navy-900/10 text-xs font-bold focus:outline-hidden focus:border-hive-green"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[11px] font-black text-navy-900 uppercase tracking-wider mb-1.5">
                    활동 및 연구 내용 *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="해당 주차에 진행할 활동 또는 교육 내용을 구체적으로 작성하세요"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-navy-900/10 text-xs font-bold focus:outline-hidden focus:border-hive-green resize-none"
                  />
                </div>

                {/* Deliverable */}
                <div>
                  <label className="block text-[11px] font-black text-navy-900 uppercase tracking-wider mb-1.5">
                    산출물 (선택)
                  </label>
                  <input
                    type="text"
                    placeholder="예: 팀별 연구 도메인 선정 보고서"
                    value={formDeliverable}
                    onChange={(e) => setFormDeliverable(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-navy-900/10 text-xs font-bold focus:outline-hidden focus:border-hive-green"
                  />
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-2 pt-4 border-t border-navy-900/5">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-extrabold text-navy-900/60 bg-navy-900/5 hover:bg-navy-900/10 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-2 rounded-xl text-xs font-extrabold bg-navy-900 text-white hover:bg-navy-800 transition-colors flex items-center gap-1.5"
                  >
                    {isSaving && <Loader2 className="w-3 h-3 animate-spin" />}
                    <span>저장</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Confirm Reset */}
      <AnimatePresence>
        {isConfirmResetOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-xl border border-navy-900/10 space-y-4"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-extrabold text-navy-900 text-base">커리큘럼 로드맵 초기화</h5>
                <p className="text-xs text-navy-900/60 font-semibold mt-2 leading-relaxed">
                  현재 등록된 모든 주차별 세션 정보가 삭제되며, HIVE 공식 기본 학술 세션 커리큘럼(12개 세션)으로 다시 세팅됩니다. 이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => setIsConfirmResetOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-navy-900/60 bg-navy-900/5 hover:bg-navy-900/10 transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  onClick={handleReset}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold bg-rose-600 text-white hover:bg-rose-700 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  {isSaving && <Loader2 className="w-3 h-3 animate-spin" />}
                  <span>네, 초기화합니다</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Confirm Delete */}
      <AnimatePresence>
        {isConfirmDeleteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-xl border border-navy-900/10 space-y-4"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-extrabold text-navy-900 text-base">주차 세션 삭제</h5>
                <p className="text-xs text-navy-900/60 font-semibold mt-2 leading-relaxed">
                  정말로 {sessionToDelete?.semester} {sessionToDelete?.week}주차 세션 <span className="font-bold text-navy-900">"{sessionToDelete?.title}"</span>을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => setIsConfirmDeleteOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-navy-900/60 bg-navy-900/5 hover:bg-navy-900/10 transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  onClick={handleDeleteSession}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold bg-rose-600 text-white hover:bg-rose-700 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  {isSaving && <Loader2 className="w-3 h-3 animate-spin" />}
                  <span>삭제</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
