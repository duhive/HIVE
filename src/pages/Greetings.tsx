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

          <div className="h-px bg-gray-100 mb-32"></div>

          {/* Professor's Greeting */}
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Professor Photo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-4 lg:order-last"
              >
                <div className="max-w-[280px] mx-auto lg:ml-auto lg:mr-0">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow-xl border border-gray-100">
                    <img 
                      src="https://i.ibb.co/s9hKQDHn/2026-03-04-201528.png" 
                      alt="Professor" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="mt-4 text-center lg:text-right">
                    <p className="text-gray-900 font-bold text-lg">지도교수 김병국</p>
                    <p className="text-gray-500 text-sm">대구대학교 호텔관광경영학부 교수</p>
                  </div>
                </div>
              </motion.div>

              {/* Professor Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-8"
              >
                <h4 className="text-hive-green font-bold tracking-widest text-xs uppercase mb-4">Professor's Message</h4>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
                  미래 호스피탈리티 산업을 이끌<br/>
                  <span className="text-hive-green serif">창의적 인재의 요람</span>
                </h2>
                
                <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed">
                  <p>
                    안녕하십니까, Hospitality 경영학회 HIVE의 지도교수 김병국입니다.
                  </p>
                  <p>
                    오늘날의 호스피탈리티 산업은 단순한 서비스를 넘어 디지털 전환과 융복합이라는 거대한 변화의 물결 속에 있습니다. 
                    HIVE는 이러한 변화에 발맞추어 학생들이 이론적 지식을 넘어 실무적인 문제 해결 능력을 갖출 수 있도록 돕는 소중한 배움의 장입니다.
                  </p>
                  <p>
                    우리 학생들이 HIVE 활동을 통해 산업의 트렌드를 읽는 안목을 기르고, 
                    동료들과 함께 프로젝트를 수행하며 협업의 가치를 깨닫는 소중한 경험을 하기를 바랍니다.
                  </p>
                  <p>
                    HIVE가 대구대학교를 넘어 대한민국 호스피탈리티 교육의 새로운 모델이 될 수 있도록 
                    아낌없는 지원과 격려를 보내주시기 바랍니다. 감사합니다.
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
