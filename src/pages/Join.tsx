import React from 'react';
import { motion } from 'motion/react';
import SectionHeader from '../components/SectionHeader';
import { FAQS } from '../constants';
import { Send, ChevronDown, Zap, Target, Users } from 'lucide-react';

const Join = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="pt-32 pb-24 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Copy */}
          <div>
            <SectionHeader title="Become a Future Leader" subtitle="Recruitment 2026" />
            
            <div className="prose prose-navy max-w-none mb-12">
              <h3 className="text-2xl font-serif font-bold mb-4">우리는 단순한 '스펙'을 넘어선 '성장'을 찾습니다.</h3>
              <p className="text-navy-900/70 leading-relaxed mb-6">
                HIVE는 Hospitality 산업의 미래를 설계할 전략가들을 모집합니다. 
                우리는 호텔관광경영학부의 학문적 깊이를 바탕으로 다양한 관점에서 문제를 바라보며 
                실질적인 솔루션을 도출할 수 있는 실행력을 가진 인재를 기다립니다.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-white border border-navy-900/5 shadow-sm">
                  <Zap size={24} className="text-silver mb-4" />
                  <h4 className="font-bold mb-2">Strategic Mindset</h4>
                  <p className="text-xs text-navy-900/60">현상을 분석하고 논리적인 대안을 제시하는 사고방식</p>
                </div>
                <div className="p-6 bg-white border border-navy-900/5 shadow-sm">
                  <Target size={24} className="text-silver mb-4" />
                  <h4 className="font-bold mb-2">Execution Power</h4>
                  <p className="text-xs text-navy-900/60">아이디어를 현실로 바꾸는 강력한 실행력과 책임감</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-navy-900/40 font-bold mb-4">Recruitment Process</h4>
              {[
                { step: "01", title: "Application Submission", desc: "서류 전형 (온라인 지원서)" },
                { step: "02", title: "Strategic Interview", desc: "심층 면접 (역량 및 가치관 확인)" },
                { step: "03", title: "Final Selection", desc: "최종 합격자 발표 및 오리엔테이션" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center p-4 bg-navy-900/5 border-l-2 border-navy-900">
                  <span className="text-xl font-serif font-bold mr-6 text-navy-900/20">{item.step}</span>
                  <div>
                    <h5 className="font-bold text-sm">{item.title}</h5>
                    <p className="text-xs text-navy-900/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form & FAQ */}
          <div className="space-y-12">
            <div className="bg-hive-green p-8 md:p-12 text-white">
              <h3 className="text-2xl font-serif mb-6">Apply Now</h3>
              <p className="text-white/80 text-sm mb-8">
                HIVE 2기/3기 모집에 지원하시겠습니까? <br/>
                아래 버튼을 통해 지원서를 작성해 주세요.
              </p>
              <button className="w-full py-4 bg-white text-hive-green font-bold uppercase tracking-widest hover:bg-ivory transition-all flex items-center justify-center">
                Application Form <Send size={18} className="ml-2" />
              </button>
              <p className="mt-4 text-[10px] text-center text-white/60 uppercase tracking-widest">
                Deadline: 2026.03.31 23:59
              </p>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-navy-900/40 font-bold mb-6">Frequently Asked Questions</h4>
              <div className="space-y-2">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="border-b border-navy-900/10">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full py-4 flex justify-between items-center text-left hover:text-silver transition-colors"
                    >
                      <span className="font-medium text-sm">{faq.question}</span>
                      <ChevronDown size={16} className={`transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="pb-4 text-xs text-navy-900/60 leading-relaxed"
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
