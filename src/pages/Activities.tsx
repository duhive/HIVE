import React from 'react';
import { motion } from 'motion/react';
import { REGULAR_CURRICULUM, MAIN_ACTIVITIES } from '../constants';
import { CheckCircle2 } from 'lucide-react';

const Activities = () => {
  return (
    <div className="pt-20">
      <section id="program" className="py-24 bg-ivory min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Main Title of Activities Page */}
          <div className="text-center mb-20">
            <span className="inline-flex items-center space-x-2 px-3 py-1 bg-hive-green/10 text-hive-green text-xs font-bold rounded-full mb-4 uppercase tracking-widest">
              HIVE SOCIETY ACTIVITIES
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight text-navy-900 mb-4">
              HIVE Activities & Studies
            </h1>
            <p className="text-navy-900/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              정기 세미나 교육 과정부터 실무 연계 프로젝트까지, 
              HIVE 구성원들이 전문성을 고도화하고 혁신을 탐구해 나가는 핵심 여정입니다.
            </p>
          </div>

          <div className="space-y-28">
            {/* Regular Curriculum Section */}
            <div>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 text-hive-green">Regular Curriculum</h2>
                <h3 className="text-lg md:text-xl font-display font-semibold text-accent mb-3 tracking-widest uppercase">정기 활동</h3>
                <p className="text-navy-900/60 max-w-2xl mx-auto text-sm">HIVE의 전문성을 쌓아가는 정기적인 연구 및 분석 과정입니다.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {REGULAR_CURRICULUM.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative p-10 bg-white rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 border border-navy-900/10"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <span className="text-8xl font-display font-black text-navy-900">0{i + 1}</span>
                    </div>
                    
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full mb-6 uppercase tracking-widest">
                      {p.period}
                    </span>
                    
                    <h3 className="text-2xl font-bold mb-4 text-navy-900">{p.title}</h3>
                    <p className="text-navy-900/70 mb-8 text-sm leading-relaxed">{p.description}</p>
                    
                    <div className="mb-8">
                      <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Core KPI</h4>
                      <p className="text-navy-900/80 text-sm font-medium">{p.kpi}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Key Outcomes</h4>
                      {p.outcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-navy-900/70">
                          <CheckCircle2 size={14} className="text-accent" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Main Activities Section */}
            <div>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 text-hive-green">Main Activities</h2>
                <h3 className="text-lg md:text-xl font-display font-semibold text-accent mb-3 tracking-widest uppercase">메인 활동</h3>
                <p className="text-navy-900/60 max-w-2xl mx-auto text-sm">실무 역량을 발휘하고 성과를 증명하는 HIVE의 핵심 프로젝트입니다.</p>
              </div>

              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {MAIN_ACTIVITIES.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative p-10 bg-white rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 border border-navy-900/10"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <span className="text-8xl font-display font-black text-navy-900">0{i + 1}</span>
                    </div>
                    
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full mb-6 uppercase tracking-widest">
                      {p.period}
                    </span>
                    
                    <h3 className="text-2xl font-bold mb-4 text-navy-900">{p.title}</h3>
                    <p className="text-navy-900/70 mb-8 text-sm leading-relaxed">{p.description}</p>
                    
                    <div className="mb-8">
                      <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Core KPI</h4>
                      <p className="text-navy-900/80 text-sm font-medium">{p.kpi}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Key Outcomes</h4>
                      {p.outcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-navy-900/70">
                          <CheckCircle2 size={14} className="text-accent" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Activities;
