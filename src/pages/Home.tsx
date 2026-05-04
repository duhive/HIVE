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
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070" 
            alt="Luxury Hospitality Background" 
            className="w-full h-full object-cover opacity-70"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              Hospitality, Innovation, Value, Experience
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 font-medium">
              대구대학교 호스피탈리티 경영학회 HIVE입니다.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/about" 
                className="px-10 py-4 border border-white text-white font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300"
              >
                About US
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

      {/* Strategies Section */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Strategies</h2>
            <p className="text-hive-green font-bold tracking-[0.2em] uppercase text-sm">How we work</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <div className="p-10 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50/50 transition-colors">
              <span className="text-6xl font-light text-gray-100 mb-8 block font-display">01</span>
              <h3 className="text-xl font-bold mb-4 text-gray-900 tracking-tight">Academic Research</h3>
              <p className="text-gray-500 text-sm leading-relaxed italic">"글로벌 호스피탈리티 산업의 트렌드를 분석하고 학문적 인사이트를 도출합니다."</p>
            </div>
            <div className="p-10 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50/50 transition-colors">
              <span className="text-6xl font-light text-gray-100 mb-8 block font-display">02</span>
              <h3 className="text-xl font-bold mb-4 text-gray-900 tracking-tight">Global Networking</h3>
              <p className="text-gray-500 text-sm leading-relaxed italic">"산업 실무자들과의 네트워크를 구축하여 실질적인 비즈니스 경험을 공유합니다."</p>
            </div>
            <div className="p-10 hover:bg-gray-50/50 transition-colors">
              <span className="text-6xl font-light text-gray-100 mb-8 block font-display">03</span>
              <h3 className="text-xl font-bold mb-4 text-gray-900 tracking-tight">Idea Development</h3>
              <p className="text-gray-500 text-sm leading-relaxed italic">"텍스트 기반의 깊은 고찰을 통해 창의적이고 실무적인 아이디어를 기획합니다."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default Home;
