import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeader from '../components/SectionHeader';
import { FAQS } from '../constants';
import { Send, ChevronDown, Zap, Target, ArrowLeft, CheckCircle2, RotateCcw, AlertCircle, Upload, Image as ImageIcon, X } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Operation types for Firestore security requirements
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
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

// Global Firestore error handler with structured logging
function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const INTEREST_TRACKS = [
  { id: 'academic', title: '학술 및 연구 정보', desc: '학술 동향 및 국내외 관광·호스피탈리티 업계 리서치 분야' },
  { id: 'planning', title: '관광 컨텐츠 기획', desc: '세미나, 포럼, 서밋 및 각종 행사 현장 오퍼레이션 기획 분야' },
  { id: 'pr', title: '브랜딩 및 미디어 홍보', desc: '카드뉴스, SNS 홍보, 보도자료 배포 및 대외 브랜드 마케팅 분야' },
  { id: 'cooperation', title: '대외 연계 및 제휴', desc: '산업 연계 인턴십 교류, 대외 파트너사 발굴 및 네트워크 연계 분야' }
];

// Canvas-based image compressor to safe base64 format (< 100KB typical)
const compressAndGetBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const base64Url = canvas.toDataURL('image/jpeg', 0.7); // 70% quality JPEG
          resolve(base64Url);
        } else {
          resolve(img.src);
        }
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

const Join = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [isApplying, setIsApplying] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [submissionId, setSubmissionId] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    studentId: '',
    motivation: '',
    strengths: '',
    interestTrack: '학술 및 연구 정보',
    photo: '' // base64 representation
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const selectTrack = (trackName: string) => {
    setFormData(prev => ({
      ...prev,
      interestTrack: trackName
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        setErrorMessage('이미지 파일지만 업로드할 수 있습니다.');
        return;
      }
      try {
        const base64 = await compressAndGetBase64(file);
        setFormData(prev => ({
          ...prev,
          photo: base64
        }));
        setErrorMessage('');
      } catch (err) {
        setErrorMessage('이미지를 처리하는 중 오류가 발생했습니다.');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith('image/')) {
        setErrorMessage('이미지 파일지만 업로드할 수 있습니다.');
        return;
      }
      try {
        const base64 = await compressAndGetBase64(file);
        setFormData(prev => ({
          ...prev,
          photo: base64
        }));
        setErrorMessage('');
      } catch (err) {
        setErrorMessage('이미지를 처리하는 중 오류가 발생했습니다.');
      }
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({
      ...prev,
      photo: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Soft validation rules
  const isFormValid = () => {
    const { name, email, phone, department, studentId, motivation, strengths, photo } = formData;
    return (
      name.trim().length >= 2 && name.trim().length <= 50 &&
      email.trim().includes('@') && email.trim().length >= 5 && email.trim().length <= 100 &&
      phone.trim().length >= 8 && phone.trim().length <= 20 &&
      department.trim().length >= 2 && department.trim().length <= 50 &&
      studentId.trim().length >= 4 && studentId.trim().length <= 20 &&
      motivation.trim().length >= 10 && motivation.trim().length <= 2000 &&
      strengths.trim().length >= 10 && strengths.trim().length <= 2000 &&
      photo.length > 0 // Photo is strictly required in our rules specification
    );
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      setErrorMessage('모든 항목과 자기소개용 이미지를 올바르게 작성 및 업로드해 주세요.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Create random cryptographic-style 12-char application code for the user
      const codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let randomCode = 'HIVE-';
      for (let i = 0; i < 6; i++) {
        randomCode += codeChars.charAt(Math.floor(Math.random() * codeChars.length));
      }

      // Prepare target path in Firestore matching our rules spec
      const collectionPath = 'applications';
      const docRef = doc(collection(db, collectionPath), randomCode);

      // Save application document
      await setDoc(docRef, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        department: formData.department.trim(),
        studentId: formData.studentId.trim(),
        motivation: formData.motivation.trim(),
        strengths: formData.strengths.trim(),
        interestTrack: formData.interestTrack,
        photo: formData.photo,
        submittedAt: serverTimestamp() // strictly checked as request.time on rules
      });

      setSubmissionId(randomCode);
      setSubmitSuccess(true);
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.CREATE, `applications/${formData.studentId}`);
      } catch (logErr) {
        // Printed in dev console
      }
      setErrorMessage('지원서 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormState = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      studentId: '',
      motivation: '',
      strengths: '',
      interestTrack: '학술 및 연구 정보',
      photo: ''
    });
    setSubmitSuccess(false);
    setSubmissionId('');
    setErrorMessage('');
    setIsApplying(false);
  };

  return (
    <div className="pt-32 pb-24 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Copy recruitment info */}
          <div>
            <SectionHeader title="Become a Future Leader" subtitle="Recruitment 2026" />
            
            <div className="prose prose-navy max-w-none mb-12">
              <h3 className="text-2xl font-serif font-bold mb-4 text-navy-900">
                우리는 단순한 '스펙'을 넘어선 '성장'을 찾습니다.
              </h3>
              <p className="text-navy-900/70 leading-relaxed mb-6 font-sans">
                HIVE는 Hospitality 산업의 미래를 설계할 전략가들을 모집합니다. 
                우리는 호텔관광경영학부의 학문적 깊이를 바탕으로 다양한 관점에서 문제를 바라보며 
                실질적인 솔루션을 도출할 수 있는 실행력을 가진 인재를 기다립니다.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-white border border-navy-900/5 shadow-sm rounded-xl">
                  <Zap size={24} className="text-hive-light-green mb-4" />
                  <h4 className="font-bold mb-2 text-navy-900">Strategic Mindset</h4>
                  <p className="text-xs text-navy-900/60 font-sans leading-relaxed">현상을 분석하고 논리적인 대안을 제시하는 사고방식</p>
                </div>
                <div className="p-6 bg-white border border-navy-900/5 shadow-sm rounded-xl">
                  <Target size={24} className="text-hive-light-green mb-4" />
                  <h4 className="font-bold mb-2 text-navy-900">Execution Power</h4>
                  <p className="text-xs text-navy-900/60 font-sans leading-relaxed">아이디어를 현실로 바꾸는 강력한 실행력과 책임감</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-navy-900/40 font-bold mb-4">Recruitment Process</h4>
              {[
                { step: "01", title: "Application Submission", desc: "서류 전형 및 자기소개 포트폴리오 확인" },
                { step: "02", title: "Strategic Interview", desc: "면접 (역량 및 가치관 확인)" },
                { step: "03", title: "Final Selection", desc: "최종 합격자 발표 및 오리엔테이션" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center p-4 bg-navy-900/5 border-l-2 border-hive-green rounded-r-xl">
                  <span className="text-xl font-serif font-bold mr-6 text-hive-green/30">{item.step}</span>
                  <div>
                    <h5 className="font-bold text-sm text-navy-900">{item.title}</h5>
                    <p className="text-xs text-navy-900/60 font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Toggle between Application Form Workroom & FAQ Panel */}
          <div className="space-y-12">
            <AnimatePresence mode="wait">
              {!isApplying ? (
                // Step 0: Recruitment Intro Card
                <motion.div
                  key="intro-card"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-hive-green p-8 md:p-12 text-white shadow-xl rounded-2xl relative overflow-hidden"
                >
                  <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none blur-xl" />
                  <h3 className="text-2xl font-serif mb-6 leading-tight">Apply Now</h3>
                  <p className="text-white/80 text-sm mb-10 leading-relaxed font-sans">
                    호스피탈리티 경영학회 HIVE 2기/3기 모집에 지원하시겠습니까? <br/>
                    아래 버튼을 통하여 본인 사진이나 대표 이미지가 포함된 상세 자기소개 지원서를 간편하게 온라인 제출할 수 있습니다.
                  </p>
                  <button
                    onClick={() => setIsApplying(true)}
                    className="w-full py-4 bg-white text-hive-green font-bold uppercase tracking-widest hover:bg-white/90 active:scale-[0.99] transition-all flex items-center justify-center rounded-xl shadow-md cursor-pointer"
                  >
                    Application Form <Send size={18} className="ml-2" />
                  </button>
                  <p className="mt-4 text-[10px] text-center text-white/50 uppercase tracking-widest font-mono">
                    Deadline: 2026.03.31 23:59
                  </p>
                </motion.div>
              ) : submitSuccess ? (
                // Success Badge Card
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-8 md:p-12 border border-blue-100 shadow-xl rounded-2xl text-center"
                >
                  <div className="w-16 h-16 bg-blue-50 text-hive-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={36} className="text-hive-green" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-2">지원서 제출 완료!</h3>
                  <p className="text-sm text-navy-900/60 font-sans mb-8 leading-relaxed">
                    학회 자기소개 지원서가 정상적으로 데이터베이스에 제출되었습니다.<br/>
                    서류 전형 결과는 기재해 주신 연락처 및 이메일로 개별 안내됩니다.
                  </p>
                  
                  <div className="bg-ivory py-4 px-6 rounded-xl border border-navy-900/10 mb-8 max-w-sm mx-auto">
                    <p className="text-[10px] text-navy-900/40 uppercase tracking-wider font-mono mb-1">지원서 접수번호</p>
                    <p className="text-xl font-mono font-bold text-hive-green select-all">{submissionId}</p>
                  </div>
                  
                  <button
                    onClick={resetFormState}
                    className="inline-flex items-center justify-center px-6 py-3 bg-hive-green text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                  >
                    돌아가기 <RotateCcw size={14} className="ml-2" />
                  </button>
                </motion.div>
              ) : (
                // Beautiful Forms Worksheet
                <motion.div
                  key="form-card"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white p-6 md:p-8 border border-navy-900/10 shadow-xl rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy-900/10">
                    <button
                      onClick={() => setIsApplying(false)}
                      className="inline-flex items-center text-xs text-navy-900/40 hover:text-navy-900 tracking-wider font-bold uppercase transition-colors"
                    >
                      <ArrowLeft size={16} className="mr-1" /> Back
                    </button>
                    <span className="text-[10px] font-mono font-bold bg-hive-green/10 text-hive-green px-3 py-1 rounded-full uppercase">
                      자기소개 온라인 지원서
                    </span>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    {errorMessage && (
                      <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-start gap-3">
                        <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-red-700 leading-relaxed font-sans">{errorMessage}</p>
                      </div>
                    )}

                    {/* Image Upload section for visual beautiful Resume */}
                    <div>
                      <label className="block text-xs font-bold text-navy-900 mb-2 uppercase tracking-wide">
                        자기소개 프로필 / 대표 이미지 <span className="text-red-500">*</span>
                      </label>
                      
                      {!formData.photo ? (
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                            isDragging 
                              ? 'border-hive-green bg-hive-green/5' 
                              : 'border-navy-900/10 hover:border-navy-900/30 hover:bg-navy-900/5'
                          }`}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                          />
                          <Upload className="mx-auto w-8 h-8 text-navy-900/40 mb-3" />
                          <p className="text-sm font-sans text-navy-900/80 font-semibold mb-1">컴퓨터에서 파일 선택 또는 드래그</p>
                          <p className="text-xs text-navy-900/40 font-sans">지원자 확인용 사진 혹은 관련 대표 예시 이미지 (PNG, JPG)</p>
                        </div>
                      ) : (
                        <div className="relative rounded-xl overflow-hidden border border-navy-900/10 bg-navy-900/5 p-4 flex items-center gap-4">
                          <img 
                            src={formData.photo} 
                            alt="Applicant portrait" 
                            className="w-20 h-20 object-cover rounded-lg border border-navy-900/20"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1">
                            <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
                              <CheckCircle2 size={12} /> 이미지 업로드 완료
                            </p>
                            <p className="text-[10px] text-navy-900/40 mt-1 font-sans">데이터베이스 저장용 최적화 압축 적용됨</p>
                          </div>
                          <button
                            type="button"
                            onClick={removePhoto}
                            className="p-2 bg-navy-900/10 hover:bg-red-500 hover:text-white rounded-full transition-all cursor-pointer text-navy-900/60"
                            title="사진 제거"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-navy-900 mb-2 uppercase tracking-wide">
                          이름 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          maxLength={50}
                          placeholder="홍길동"
                          className="w-full bg-ivory border border-navy-900/10 focus:border-hive-green focus:outline-none rounded-xl px-4 py-3 text-sm font-sans transition-all"
                        />
                      </div>

                      {/* Student ID */}
                      <div>
                        <label className="block text-xs font-bold text-navy-900 mb-2 uppercase tracking-wide">
                          학번 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="studentId"
                          value={formData.studentId}
                          onChange={handleInputChange}
                          required
                          maxLength={20}
                          placeholder="202612345"
                          className="w-full bg-ivory border border-navy-900/10 focus:border-hive-green focus:outline-none rounded-xl px-4 py-3 text-sm font-sans transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Department */}
                      <div>
                        <label className="block text-xs font-bold text-navy-900 mb-2 uppercase tracking-wide">
                          학과 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          required
                          maxLength={50}
                          placeholder="호텔외식관광학과"
                          className="w-full bg-ivory border border-navy-900/10 focus:border-hive-green focus:outline-none rounded-xl px-4 py-3 text-sm font-sans transition-all"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-bold text-navy-900 mb-2 uppercase tracking-wide">
                          연락처 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          maxLength={20}
                          placeholder="010-1234-5678"
                          className="w-full bg-ivory border border-navy-900/10 focus:border-hive-green focus:outline-none rounded-xl px-4 py-3 text-sm font-sans transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-navy-900 mb-2 uppercase tracking-wide">
                        이메일 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        maxLength={100}
                        placeholder="example@gmail.com"
                        className="w-full bg-ivory border border-navy-900/10 focus:border-hive-green focus:outline-none rounded-xl px-4 py-3 text-sm font-sans transition-all"
                      />
                    </div>

                    {/* Track Selection Card Grid */}
                    <div>
                      <label className="block text-xs font-bold text-navy-900 mb-3 uppercase tracking-wide">
                        관심 분야 <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {INTEREST_TRACKS.map(track => {
                          const isSelected = formData.interestTrack === track.title;
                          return (
                            <button
                              key={track.id}
                              type="button"
                              onClick={() => selectTrack(track.title)}
                              className={`p-4 text-left border rounded-xl flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? 'bg-hive-green/5 border-hive-green shadow-sm'
                                  : 'bg-white border-navy-900/10 hover:border-navy-900/30'
                              }`}
                            >
                              <div>
                                <h5 className={`font-bold text-sm ${isSelected ? 'text-hive-green' : 'text-navy-900'}`}>
                                  {track.title}
                                </h5>
                                <p className="text-[11px] text-navy-900/60 mt-1 font-sans leading-relaxed">
                                  {track.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Motivation Textarea with Interactive Counts */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-navy-900 uppercase tracking-wide">
                          지원 동기 <span className="text-red-500">* (최소 10자)</span>
                        </label>
                        <span className={`text-[10px] font-mono ${formData.motivation.length > 2000 ? 'text-red-500' : 'text-navy-900/40'}`}>
                          {formData.motivation.length.toLocaleString()} / 2,000자
                        </span>
                      </div>
                      <textarea
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleInputChange}
                        required
                        minLength={10}
                        maxLength={2000}
                        rows={5}
                        placeholder="호스피탈리티 경영학회 HIVE에 지원하게 된 솔직한 동기를 기술해 주세요."
                        className="w-full bg-ivory border border-navy-900/10 focus:border-hive-green focus:outline-none rounded-xl p-4 text-sm font-sans resize-none transition-all"
                      />
                    </div>

                    {/* Strengths Textarea with Interactive Counts */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-navy-900 uppercase tracking-wide">
                          본인의 강점 및 관련 경험 <span className="text-red-500">* (최소 10자)</span>
                        </label>
                        <span className={`text-[10px] font-mono ${formData.strengths.length > 2000 ? 'text-red-500' : 'text-navy-900/40'}`}>
                          {formData.strengths.length.toLocaleString()} / 2,000자
                        </span>
                      </div>
                      <textarea
                        name="strengths"
                        value={formData.strengths}
                        onChange={handleInputChange}
                        required
                        minLength={10}
                        maxLength={2000}
                        rows={5}
                        placeholder="관심 분야와 관련하여 본인의 강점과 기획/소통/활동 등 성취한 과거 경험을 작성해 주세요."
                        className="w-full bg-ivory border border-navy-900/10 focus:border-hive-green focus:outline-none rounded-xl p-4 text-sm font-sans resize-none transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !isFormValid()}
                      className={`w-full py-4 text-white font-bold rounded-xl tracking-widest text-xs uppercase transition-all flex items-center justify-center shadow-lg cursor-pointer ${
                        isSubmitting || !isFormValid()
                          ? 'bg-navy-900/10 shadow-none cursor-not-allowed text-navy-900/30'
                          : 'bg-hive-green hover:opacity-95 text-white shadow-hive-green/10'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          제출하는 중...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          지원하기 <Send size={14} className="ml-2" />
                        </div>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* General FAQ section rendering */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-navy-900/40 font-bold mb-6">Frequently Asked Questions</h4>
              <div className="space-y-2">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="border-b border-navy-900/10">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full py-4 flex justify-between items-center text-left hover:text-hive-green transition-colors"
                    >
                      <span className="font-semibold text-sm text-navy-900">{faq.question}</span>
                      <ChevronDown size={16} className={`transition-transform text-navy-900/40 ${openFaq === idx ? 'rotate-180 text-hive-green' : ''}`} />
                    </button>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="pb-4 text-xs text-navy-900/60 leading-relaxed font-sans"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
