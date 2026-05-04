import React from 'react';
import { motion } from 'motion/react';

const Greetings = () => {
  return (
    <div className="pt-20">
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* President's Greeting */}
          <div className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* President Photo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-4"
              >
                <div className="max-w-[280px] mx-auto lg:mx-0">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow-xl border border-gray-100">
                    <img 
                      src="https://i.ibb.co/v6z0pWtm/image.jpg" 
                      alt="President" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="mt-4 text-center lg:text-left">
                    <p className="text-gray-900 font-bold text-lg">1기 학회장 강경임</p>
                    <p className="text-gray-500 text-sm">대구대학교 호텔외식관광학과</p>
                  </div>
                </div>
              </motion.div>

              {/* President Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-8"
              >
                <h4 className="text-hive-green font-bold tracking-widest text-xs uppercase mb-4">President's Message</h4>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
                  호스피탈리티의 본질에<br/>
                  <span className="text-hive-green serif">혁신을 더하다</span>
                </h2>
                
                <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed">
                  <p>
                    안녕하십니까, Hospitality 경영학회 HIVE의 1기 학회장 강경임입니다.
                  </p>
                  <p>
                    HIVE는 급변하는 글로벌 호스피탈리티 산업 환경 속에서 단순한 서비스 역량을 넘어, 
                    데이터와 기술을 이해하고 비즈니스를 설계할 수 있는 융합형 전문가를 양성하기 위해 설립되었습니다.
                  </p>
                  <p>
                    우리는 '전략적 사고'와 '실무적 혁신'을 핵심 가치로 삼아, 
                    학회원들이 산업의 본질을 꿰뚫어보고 새로운 가치를 창출할 수 있는 리더로 성장할 수 있도록 돕고 있습니다.
                  </p>
                  <p>
                    함께 고민하고, 함께 도전하며, 함께 성장하는 HIVE의 여정에 
                    여러분의 많은 관심과 응원을 부탁드립니다. 감사합니다.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Greetings;
