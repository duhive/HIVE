import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  url: string;
  urls?: string[];
  location: string;
  participants: string;
  takeaway: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 4,
    title: "Hospitality 세미나",
    category: "Regular Curriculums",
    date: "2026.03.14",
    description: "지능화되어가는 현대 관광 산업의 흐름을 분석하고 스마트 투어리즘 및 디지털 미디어 서비스 사례를 발굴하는 정기 연구회입니다. 핵심 트렌드 브리핑 리포트를 매주 제작 및 토의하고 데이터와 기술이 결합한 새로운 경험 영역에 관한 인사이트를 교환합니다.",
    url: "https://i.ibb.co/4nfnKKkj/Kakao-Talk-20260507-182539464-08.jpg",
    urls: [
      "https://i.ibb.co/4nfnKKkj/Kakao-Talk-20260507-182539464-08.jpg",
      "https://i.ibb.co/HDJWNNXB/image4.png",
      "https://i.ibb.co/zVCVtKLS/image3.png"
    ],
    location: "대구대학교 사회과학관 공동 연구 센터",
    participants: "HIVE 1기 구성원 및 신규 연구진",
    takeaway: "경쟁력 지표 분석 중심의 글로벌 관광 비즈니스 혁신 사례 리서치 완료"
  },
  {
    id: 5,
    title: "Hospitality 세미나(1)",
    category: "Idea Ideation",
    date: "2026.04.10",
    description: "인문학적 통찰과 환대 서비스 설계의 기본 정신을 정립하기 위해 문화적 가치 서적들을 논평하고 교의적인 고객 분석 프레임워크를 심층 복합 기안한 스터디입니다. 이론적 기반에 그치지 않고, 고객 심리를 아우르는 서비스 블루프린트 프로토타이핑을 구현하였습니다.",
    url: "https://images.unsplash.com/photo-1531535934202-f022eeee25c2?auto=format&fit=crop&q=80&w=1200",
    urls: [
      "https://images.unsplash.com/photo-1531535934202-f022eeee25c2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1552581230-c01bc03a4495?auto=format&fit=crop&q=80&w=1200"
    ],
    location: "교내 창의 아이디어 도서 협업 라운지",
    participants: "HIVE 독서 토론 및 브랜딩 소모임",
    takeaway: "가치 중심 공간 기획서 도출 및 융합 실무 프로토타입 디자인 완성"
  },
  {
    id: 6,
    title: "호스피탈리티 경영학회 OT",
    category: "Human Network",
    date: "2026.03.02",
    description: "학회 활동의 공식적인 시작을 알리는 HIVE 호스피탈리티 경영학회 오리엔테이션입니다. 학업적 비전과 향후 1년간 진행될 정기 커리큘럼 계획을 공유하고, 창의적인 아이스 브레이킹 및 팀 빌딩 게임을 통해 서로의 관심사를 나누며 학회원 간의 끈끈한 네트워크를 다지는 뜻깊은 시간이었습니다.",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
    urls: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=1200"
    ],
    location: "대구대학교 사회과학관 비즈니스 네트워킹룸",
    participants: "HIVE 1기 전체 학회원 및 임원진",
    takeaway: "학회 공동체 비전 정렬 및 네트워킹 아이스브레이킹 완료"
  }
];

const Photo = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handlePrev = (urlsLength: number) => {
    setCurrentImgIndex((prev) => (prev === 0 ? urlsLength - 1 : prev - 1));
  };

  const handleNext = (urlsLength: number) => {
    setCurrentImgIndex((prev) => (prev === urlsLength - 1 ? 0 : prev + 1));
  };

  return (
    <div className="pt-20">
      <section className="py-24 bg-white min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title="Photo Gallery"
            subtitle="포토 갤러리"
            description="HIVE의 다양한 활동과 프로젝트의 순간들을 기록합니다. 인상 깊은 결과와 성장의 궤적을 만나보세요."
          />

          <div id="gallery-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {GALLERY_IMAGES.map((image, i) => (
              <motion.div
                id={`gallery-card-${image.id}`}
                key={image.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                onClick={() => {
                  setSelectedImage(image);
                  setCurrentImgIndex(0);
                }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-900/5 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-navy-900/5"
              >
                <img 
                  src={image.url}
                  alt={image.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Text Panel Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-white">
                  <span className="mb-2 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-hive-green">
                    {image.category}
                  </span>
                  <h3 className="text-lg font-bold leading-tight line-clamp-1 mb-1 transition-colors duration-300 group-hover:text-hive-green">
                    {image.title}
                  </h3>
                  <span className="text-[10px] text-white/50 font-mono tracking-wider font-semibold">
                    {image.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Showcase Modal / Page Overlays */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            id="photo-details-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              id="photo-details-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row h-auto max-h-[90vh] text-navy-900"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image View Section (Left Side) */}
              <div className="relative w-full lg:w-3/5 bg-navy-950 flex flex-col justify-center overflow-hidden aspect-[4/3] lg:aspect-auto">
                <motion.img
                  key={currentImgIndex}
                  src={(selectedImage.urls || [selectedImage.url])[currentImgIndex]}
                  alt={`${selectedImage.title} - ${currentImgIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                
                {/* Back / Next Navigation Helpers within image view */}
                {(selectedImage.urls || [selectedImage.url]).length > 1 && (
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                    <button
                      onClick={() => handlePrev((selectedImage.urls || [selectedImage.url]).length)}
                      className="p-3 rounded-full bg-black/60 hover:bg-hive-green text-white transition-all pointer-events-auto transform active:scale-90 hover:scale-105 cursor-pointer"
                      aria-label="Previous Image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => handleNext((selectedImage.urls || [selectedImage.url]).length)}
                      className="p-3 rounded-full bg-black/60 hover:bg-hive-green text-white transition-all pointer-events-auto transform active:scale-90 hover:scale-105 cursor-pointer"
                      aria-label="Next Image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}

                {/* Dots indicator */}
                {(selectedImage.urls || [selectedImage.url]).length > 1 && (
                  <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-1.5 z-10 pointer-events-none">
                    {(selectedImage.urls || [selectedImage.url]).map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          dotIdx === currentImgIndex
                            ? 'bg-hive-green w-3'
                            : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Corner Category overlay on Image */}
                <span className="absolute top-6 left-6 px-4 py-1.5 bg-hive-green text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-lg">
                  {selectedImage.category}
                </span>
              </div>

              {/* Information View Section (Right Side) */}
              <div className="w-full lg:w-2/5 p-8 lg:p-10 flex flex-col justify-between bg-white overflow-y-auto max-h-full">
                {/* Close Button */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono text-navy-900/40 tracking-wider font-semibold">
                    Gallery Detail View
                  </span>
                  <button
                    id="close-modal-btn"
                    onClick={() => setSelectedImage(null)}
                    className="p-2 text-navy-900/40 hover:text-red-500 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Main Text Content */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-display font-bold leading-snug tracking-tight text-navy-900">
                      {selectedImage.title}
                    </h2>
                  </div>

                  <p className="text-navy-900/70 text-sm leading-relaxed whitespace-pre-line text-justify font-normal">
                    {selectedImage.description}
                  </p>

                  <hr className="border-navy-900/10" />

                  {/* Metadata fields */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-1 rounded-md bg-navy-900/5 text-hive-green flex-shrink-0">
                        <Calendar size={15} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-navy-900/40 mb-0.5">활동 일시</h4>
                        <p className="text-xs font-medium text-navy-900/80">{selectedImage.date}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-1 rounded-md bg-navy-900/5 text-hive-green flex-shrink-0">
                        <MapPin size={15} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-navy-900/40 mb-0.5">진행 장소</h4>
                        <p className="text-xs font-medium text-navy-900/80">{selectedImage.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-1 rounded-md bg-navy-900/5 text-hive-green flex-shrink-0">
                        <Users size={15} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-navy-900/40 mb-0.5">참가 학회원</h4>
                        <p className="text-xs font-medium text-navy-900/80">{selectedImage.participants}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-1 rounded-md bg-navy-900/5 text-hive-green flex-shrink-0">
                        <Award size={15} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-navy-900/40 mb-0.5">핵심 성과 (Core Takeaway)</h4>
                        <p className="text-xs font-medium text-hive-green">{selectedImage.takeaway}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer buttons for cycling images inside modal */}
                <div className="mt-8 pt-6 border-t border-navy-900/5 flex justify-between items-center">
                  <button
                    onClick={() => handlePrev((selectedImage.urls || [selectedImage.url]).length)}
                    disabled={(selectedImage.urls || [selectedImage.url]).length <= 1}
                    className={`flex items-center space-x-1.5 text-xs font-medium group cursor-pointer transition-colors ${
                      (selectedImage.urls || [selectedImage.url]).length <= 1
                        ? 'text-navy-900/20 cursor-default'
                        : 'text-navy-900/50 hover:text-hive-green'
                    }`}
                  >
                    <ChevronLeft size={14} className="transform group-hover:-translate-x-0.5 transition-transform" />
                    <span>이전 사진</span>
                  </button>
                  <span className="text-[11px] font-semibold text-navy-900/20 font-mono">
                    {currentImgIndex + 1} / {(selectedImage.urls || [selectedImage.url]).length}
                  </span>
                  <button
                    onClick={() => handleNext((selectedImage.urls || [selectedImage.url]).length)}
                    disabled={(selectedImage.urls || [selectedImage.url]).length <= 1}
                    className={`flex items-center space-x-1.5 text-xs font-medium group cursor-pointer transition-colors ${
                      (selectedImage.urls || [selectedImage.url]).length <= 1
                        ? 'text-navy-900/20 cursor-default'
                        : 'text-navy-900/50 hover:text-hive-green'
                    }`}
                  >
                    <span>다음 사진</span>
                    <ChevronRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Photo;
