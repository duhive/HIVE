import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Users, Target, Zap } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import Contact from '../components/Contact';
import { BRAND_STORY } from '../constants';

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070" 
            alt="Hospitality" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1 bg-hive-green/10 text-hive-green text-[10px] font-bold uppercase tracking-[0.4em] mb-6 border border-hive-green/20">
              Daegu University
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Redefining Hospitality through <span className="text-hive-green">Strategic Innovation</span>
            </h1>
            <p className="text-xl text-gray-500 mb-10 font-light leading-relaxed">
              전략적 혁신을 통한 호스피탈리티의 재정의. <br/>
              HIVE는 단순한 학회를 넘어, 산업의 문제를 진단하고 해결하는 전략 컨설팅 네트워크입니다.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/join" className="px-8 py-4 bg-hive-green text-white font-bold uppercase tracking-widest hover:bg-hive-light-green transition-all flex items-center justify-center">
                Join HIVE 2026 <Zap size={18} className="ml-2" />
              </Link>
              <Link to="/about" className="px-8 py-4 border border-gray-200 text-gray-900 font-bold uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center">
                Our Story <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </motion.div>
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
              <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
                호스피탈리티의 본질에<br/>
                <span className="text-hive-green serif">혁신을 더하다</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {BRAND_STORY.origin}
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
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
                alt="HIVE Team Collaboration"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-hive-green/10 mix-blend-multiply" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values / H.I.V.E */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The HIVE Concept</h2>
            <p className="text-hive-green font-bold tracking-[0.2em] uppercase text-sm">Our Identity</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { char: 'H', title: 'Hospitality', desc: '산업의 본질을 꿰뚫는 서비스 마인드셋', icon: <Globe size={24}/> },
              { char: 'I', title: 'Innovation', desc: '기존의 틀을 깨는 창의적 솔루션 제안', icon: <Zap size={24}/> },
              { char: 'V', title: 'Value', desc: '비즈니스와 사회를 잇는 실질적 가치 창출', icon: <Target size={24}/> },
              { char: 'E', title: 'Experience', desc: '사용자 중심의 총체적 경험 디자인', icon: <Users size={24}/> },
            ].map((item, idx) => (
              <motion.div
                key={item.char}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-xl"
              >
                <div className="text-4xl font-bold text-hive-green/10 mb-4">{item.char}</div>
                <div className="text-hive-green mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default Home;
