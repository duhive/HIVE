import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Globe, Users, Target, Zap, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import Contact from '../components/Contact';
import { BRAND_STORY } from '../constants';

import aviationHero from '../assets/images/aviation_service_hero_1782037825374.jpg';
import metaverseHero from '../assets/images/metaverse_hotel_hero_1782191831140.jpg';
import cabinServiceAbout from '../assets/images/cabin_service_about_1782193310292.jpg';

const slides = [
  {
    image: aviationHero,
    uniDept: "DAEGU UNIVERSITY HOSPITALITY MANAGEMENT SOCIETY",
    slogan: "환대와 혁신으로 더 넓은 세상의 가치를 연결하는",
    title: "호스피탈리티",
    subtitle: "DIVISION OF HOSPITALITY",
    linkPath: "/about",
    linkText: "LEARN MORE"
  },
  {
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=2000",
    uniDept: "DAEGU UNIVERSITY HOSPITALITY MANAGEMENT SOCIETY",
    slogan: "지성적 탐구와 혁신으로 차세대 호스피탈리티의 가치를 세우다",
    title: "글로벌 호스피탈리티 리더십",
    subtitle: "ACADEMIC INNOVATION & GLOBAL LEADERSHIP",
    linkPath: "/activities",
    linkText: "VIEW ACTIVITIES"
  },
  {
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000",
    uniDept: "DAEGU UNIVERSITY HOSPITALITY MANAGEMENT SOCIETY",
    slogan: "새로운 도약과 연구를 향해 높은 가치를 창출하는",
    title: "차세대 글로벌 호스피탈리티 네트워크",
    subtitle: "NEXT GENERATION HOSPITALITY NETWORK",
    linkPath: "/join",
    linkText: "JOIN US NOW"
  },
  {
    image: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&q=80&w=2000",
    uniDept: "DAEGU UNIVERSITY HOSPITALITY MANAGEMENT SOCIETY",
    slogan: "품격 높은 감동과 학술적 전문성을 설계하는 커뮤니티",
    title: "최적의 서비스 경험 디자인",
    subtitle: "EXPERIENCE DESIGN & SERVICE STRATEGY",
    linkPath: "/projects",
    linkText: "OUR PROJECTS"
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center overflow-hidden bg-slate-950">
        {/* Animated Slide Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <img 
                src={slides[currentSlide].image} 
                alt={slides[currentSlide].title} 
                className="w-full h-full object-cover object-center opacity-65 select-none"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>
          {/* Green / Slate Overlay matching the green brand theme */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-hive-green/20 to-slate-950/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/25 to-slate-950/80" />
          <div className="absolute inset-0 bg-hive-green/10 mix-blend-color pointer-events-none" />
        </div>

        {/* Technical/Cyber Circle Coordinate Overlay inspired by reference screenshot */}
        <div className="absolute left-4 md:left-24 top-1/2 -translate-y-1/2 w-[300px] md:w-[550px] h-[300px] md:h-[550px] pointer-events-none opacity-30 z-10">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-hive-light-green/30 animate-[spin_100s_linear_infinite]">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.15" strokeDasharray="1 3" />
            <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.25" />
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.1" strokeDasharray="3 1" />
            <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="0.3" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.1" />
            <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.1" />
            <path d="M 20 50 A 30 30 0 0 1 80 50" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 2" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center animate-[pulse_4s_ease-in-out_infinite]">
            <div className="w-48 h-48 rounded-full border border-hive-green/20 blur-[1px]"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-4xl text-left font-sans">
            {/* Slogan */}
            <motion.p
              key={`slogan-${currentSlide}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-base md:text-xl text-emerald-100/95 font-medium mb-4 tracking-wide leading-relaxed"
            >
              {slides[currentSlide].slogan}
            </motion.p>
            
            {/* Title - Fixed to 호스피탈리티 경영학회 as requested */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight tracking-tight select-none">
              <span className="tracking-[0.08em] mr-2">호스피탈리티</span> 경영학회
            </h1>

            {/* Subtitle - Fixed to Hospitality Management Society as requested */}
            <p className="text-xs sm:text-sm md:text-base font-bold text-emerald-200/50 tracking-[0.4em] mb-10 select-none uppercase font-mono">
              Hospitality Management Society
            </p>

            {/* Action Link button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link 
                to={slides[currentSlide].linkPath} 
                className="inline-flex items-center gap-3 px-8 py-3.5 border border-white/20 hover:border-white text-white/95 hover:text-white font-mono text-sm tracking-[0.2em] rounded-sm bg-white/5 backdrop-blur-sm hover:bg-white hover:text-slate-950 transition-all duration-300 shadow-lg"
              >
                {slides[currentSlide].linkText}
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Minimalist Slide Navigation & Status Panel matching exact layout (< 1 / 4 > ||) */}
        <div className="absolute bottom-8 right-4 sm:right-12 lg:right-24 z-30 flex items-center bg-slate-950/85 md:bg-slate-900/60 backdrop-blur-md px-6 py-3.5 rounded-full border border-white/10 text-white shadow-xl">
          {/* Previous Button */}
          <button 
            onClick={handlePrev}
            className="p-1 hover:text-hive-light-green active:scale-95 transition-all mr-3 cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Pagination Counter: current / total */}
          <span className="font-mono text-xs tracking-wider select-none font-bold mr-4">
            {String(currentSlide + 1).padStart(2, '0')} <span className="text-white/40 mx-1">/</span> {String(slides.length).padStart(2, '0')}
          </span>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            className="p-1 hover:text-hive-light-green active:scale-95 transition-all mr-5 cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight size={18} />
          </button>

          {/* Divider line */}
          <span className="h-4 w-[1px] bg-white/15 dark:bg-white/15 mr-4" />

          {/* Autoplay Play/Pause */}
          <button 
            onClick={togglePlay}
            className="p-1 hover:text-hive-light-green active:scale-95 transition-all cursor-pointer"
            aria-label={isPlaying ? "Pause autocomplete" : "Play autocomplete"}
          >
            {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
          </button>
        </div>
      </section>

      {/* Short About Us Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-hive-green font-bold tracking-widest text-xs uppercase mb-4">About HIVE</h4>
              <h2 className="text-4xl font-bold text-navy-900 mb-8 leading-tight">
                따뜻한 환대에<br/>
                <span className="text-hive-green font-serif">새로운 즐거움을 더하다</span>
              </h2>
              <p className="text-lg text-navy-900/70 mb-8 leading-relaxed">
                HIVE는 대구대학교를 대표하는 호스피탈리티 경영학회입니다. 환대의 따뜻한 마음에 새로운 배움과 즐거움을 더해, 일상을 더욱 특별하게 디자인합니다.
              </p>
              <Link to="/about" className="inline-flex items-center text-hive-green font-bold uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
                Learn More <ArrowRight size={18} className="ml-2" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src={cabinServiceAbout} 
                alt="HIVE Premium Cabin Service"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-hive-green/10 mix-blend-multiply" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values / H.I.V.E */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">The HIVE Concept</h2>
            <p className="text-hive-green font-bold tracking-[0.2em] uppercase text-sm">Our Identity</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { char: 'H', title: 'Hospitality', desc: '산업의 본질을 꿰뚫는 service 마인드셋', icon: <Globe size={24}/> },
              { char: 'I', title: 'Innovation', desc: '디지털 기술을 넘어 관광호스피탈리티 혁신 추구', icon: <Zap size={24}/> },
              { char: 'V', title: 'Value', desc: '비즈니스와 사회를 잇는 실질적 가치 창출', icon: <Target size={24}/> },
              { char: 'E', title: 'Experience', desc: '사용자 중심의 총체적 경험 디자인', icon: <Users size={24}/> },
            ].map((item, idx) => (
              <motion.div
                key={item.char}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white border border-navy-900/10 shadow-sm hover:shadow-md transition-all rounded-xl"
              >
                <div className="text-4xl font-bold text-hive-green/10 mb-4">{item.char}</div>
                <div className="text-hive-green mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-navy-900">{item.title}</h3>
                <p className="text-sm text-navy-900/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Strategies Section */}
      <section className="py-24 bg-white border-y border-navy-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">Core Strategies</h2>
            <p className="text-hive-green font-bold tracking-[0.2em] uppercase text-sm">How we work</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <div className="p-10 border-b md:border-b-0 md:border-r border-navy-900/10 hover:bg-navy-900/[0.02] transition-colors">
              <span className="text-6xl font-light text-navy-900/10 mb-8 block font-display">01</span>
              <h3 className="text-xl font-bold mb-4 text-navy-900 tracking-tight">Service Issue Seminar</h3>
              <p className="text-navy-900/60 text-sm leading-relaxed italic">"최신 서비스 산업 트렌드와 호스피탈리티 이슈 분석 세미나를 진행합니다."</p>
            </div>
            <div className="p-10 border-b md:border-b-0 md:border-r border-navy-900/10 hover:bg-navy-900/[0.02] transition-colors">
              <span className="text-6xl font-light text-navy-900/10 mb-8 block font-display">02</span>
              <h3 className="text-xl font-bold mb-4 text-navy-900 tracking-tight">Networking</h3>
              <p className="text-navy-900/60 text-sm leading-relaxed italic">"다양한 실무 및 선배들과의 네트워크를 통해 지혜를 공유합니다."</p>
            </div>
            <div className="p-10 hover:bg-navy-900/[0.02] transition-colors">
              <span className="text-6xl font-light text-navy-900/10 mb-8 block font-display">03</span>
              <h3 className="text-xl font-bold mb-4 text-navy-900 tracking-tight">Academic Column</h3>
              <p className="text-navy-900/60 text-sm leading-relaxed italic">"다양한 주제의 학회원 칼럼을 통해 트렌드와 통찰을 공유합니다."</p>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section removed as requested */}
    </div>
  );
};

export default Home;
