import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MEMBERS, PARTNER_MEMBERS } from '../constants';
import { Member } from '../types';
import { X, Mail, GraduationCap, Briefcase, Award, Users, ChevronDown, ChevronUp } from 'lucide-react';

const Members = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showExperience, setShowExperience] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('GENERATIONS');

  const handleSelectMember = (member: Member) => {
    setSelectedMember(member);
    setShowExperience(false);
  };
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');

  const generations = ['전체', '0-1기', '2기'];
  const partnerFilters = ['Alumni Partners'];

  const filteredMembers = (selectedCategory === 'GENERATIONS'
    ? (selectedFilter === '전체' ? MEMBERS : selectedFilter === '0-1기' ? MEMBERS : [])
    : PARTNER_MEMBERS.filter(m => m.category === selectedFilter)
  ).slice().sort((a, b) => a.name.localeCompare(b.name, 'ko'));

  const standardMembers = filteredMembers.filter(m => m.role !== 'Convergence Partner');
  const convergencePartners = filteredMembers.filter(m => m.role === 'Convergence Partner');

  const isComingSoon = (selectedCategory === 'GENERATIONS' && selectedFilter === '2기') || 
                     (selectedCategory === 'PARTNERS' && filteredMembers.length === 0);

  return (
    <section id="members" className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-2 text-hive-green">Members</h2>
          <p className="text-navy-900/60 max-w-2xl mx-auto">
            {selectedCategory === 'GENERATIONS' 
              ? "HIVE를 이끄는 핵심 멤버들을 소개합니다. 각 분야의 전문성을 바탕으로 시너지를 창출합니다."
              : "융합 역량 강화를 위해 함께하는 졸업생 및 타 분야 전공 학생들로 구성된 파트너 네트워크입니다."}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filter */}
          <div className="w-full lg:w-48 flex-shrink-0">
            <div className="sticky top-32 space-y-10">
              {/* Generations Section */}
              <div>
                <h3 className="text-sm font-bold text-navy-900/40 uppercase tracking-widest mb-6">Generations</h3>
                <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
                  {generations.map((gen) => (
                    <button
                      key={gen}
                      onClick={() => {
                        setSelectedCategory('GENERATIONS');
                        setSelectedFilter(gen);
                      }}
                      className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap text-left cursor-pointer ${
                        selectedCategory === 'GENERATIONS' && selectedFilter === gen
                          ? 'bg-hive-green text-white shadow-lg shadow-hive-green/20'
                          : 'bg-navy-900/5 text-navy-900/60 hover:bg-navy-900/10'
                      }`}
                    >
                      {gen}
                    </button>
                  ))}
                </div>
              </div>

              {/* Partners Section */}
              <div>
                <h3 className="text-sm font-bold text-navy-900/40 uppercase tracking-widest mb-6">Partners</h3>
                <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
                  {partnerFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setSelectedCategory('PARTNERS');
                        setSelectedFilter(filter);
                      }}
                      className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap text-left cursor-pointer ${
                        selectedCategory === 'PARTNERS' && selectedFilter === filter
                          ? 'bg-hive-green text-white shadow-lg shadow-hive-green/20'
                          : 'bg-navy-900/5 text-navy-900/60 hover:bg-navy-900/10'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Members Grid */}
          <div className="flex-grow">
            {isComingSoon ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-32 bg-navy-900/5 rounded-3xl border border-dashed border-navy-900/10"
              >
                <div className="w-16 h-16 bg-hive-green/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-hive-green" />
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-2">
                  {selectedCategory === 'PARTNERS' ? 'Partners Coming Soon' : '2기 모집 준비 중'}
                </h3>
                <p className="text-navy-900/60">곧 새로운 멤버들과 함께 찾아오겠습니다.</p>
              </motion.div>
            ) : (
              selectedCategory === 'GENERATIONS' ? (
                <div className="space-y-16">
                  {/* General Members */}
                  {standardMembers.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold text-navy-900 mb-6 flex items-center gap-2 font-display">
                        <span className="w-1.5 h-6 bg-hive-green rounded-full block"></span>
                        HIVE 학회원
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {standardMembers.map((member, i) => (
                          <motion.div
                            key={member.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => handleSelectMember(member)}
                            className="cursor-pointer group relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy-900/5 hover:shadow-lg transition-all duration-300"
                          >
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                            
                            <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                              <h3 className="text-xl font-bold text-white">{member.name}</h3>
                              <p className="text-white/80 text-[10px] font-medium uppercase tracking-widest mt-1">{member.education}</p>
                              <div className="h-0.5 w-0 group-hover:w-full bg-white/60 transition-all duration-300 mt-2" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Convergence Partners */}
                  {convergencePartners.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold text-navy-900 mb-6 flex items-center gap-2 font-display">
                        <span className="w-1.5 h-6 bg-hive-green rounded-full block"></span>
                        콘텐츠 융합 파트너 (Convergence Partners)
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {convergencePartners.map((member, i) => (
                          <motion.div
                            key={member.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => handleSelectMember(member)}
                            className="cursor-pointer group relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy-900/5 hover:shadow-lg transition-all duration-300"
                          >
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                            
                            <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                              <h3 className="text-xl font-bold text-white">{member.name}</h3>
                              <p className="text-white/80 text-[10px] font-medium uppercase tracking-widest mt-1">{member.education}</p>
                              <div className="h-0.5 w-0 group-hover:w-full bg-white/60 transition-all duration-300 mt-2" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMembers.map((member, i) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleSelectMember(member)}
                      className="cursor-pointer group relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy-900/5"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                      
                      <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <h3 className="text-xl font-bold text-white">{member.name}</h3>
                        <p className="text-white/80 text-[10px] font-medium uppercase tracking-widest mt-1">{member.role}</p>
                        <div className="h-0.5 w-0 group-hover:w-full bg-white/60 transition-all duration-300 mt-2" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl overflow-y-auto md:overflow-hidden shadow-2xl border border-navy-900/10 flex flex-col md:flex-row h-auto"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-navy-900/40 hover:bg-red-50/10 hover:text-red-500 transition-colors shadow-sm cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="w-full md:w-2/5 aspect-[4/5] md:aspect-[3/4] self-start relative bg-navy-900/5 flex-shrink-0">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-start md:max-h-[90vh] md:overflow-y-auto">
                <div className="mb-5">
                  <h2 className="text-4xl font-display font-bold text-navy-900">{selectedMember.name}</h2>
                  {selectedMember.category === 'Alumni Partners' && (
                    <span className="text-hive-green font-bold uppercase tracking-[0.2em] text-xs mt-1 block">
                      {selectedMember.role}
                    </span>
                  )}
                </div>

                <div className="space-y-6">
                  <section>
                    <div className="flex items-center space-x-2 text-hive-green mb-3">
                      {selectedMember.category === 'Alumni Partners' ? (
                        <>
                          <GraduationCap size={18} />
                          <h4 className="font-bold uppercase tracking-widest text-xs text-navy-900/40">Education</h4>
                        </>
                      ) : (
                        <>
                          <Briefcase size={18} />
                          <h4 className="font-bold uppercase tracking-widest text-xs text-navy-900/40">Role</h4>
                        </>
                      )}
                    </div>
                    <p className="text-navy-900/80 leading-relaxed font-normal">
                      {selectedMember.category === 'Alumni Partners' ? selectedMember.education : selectedMember.role}
                    </p>
                  </section>

                  <div className="grid grid-cols-1 gap-6">
                    <section>
                      <div className="flex items-center space-x-2 text-hive-green mb-3">
                        <Award size={18} />
                        <h4 className="font-bold uppercase tracking-widest text-xs text-navy-900/40">INTERESTS</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.skills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-navy-900/5 text-navy-900/70 text-[10px] font-bold rounded-full border border-navy-900/10 uppercase">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section>
                      <div className="flex items-center space-x-2 text-hive-green mb-3">
                        <Mail size={18} />
                        <h4 className="font-bold uppercase tracking-widest text-xs text-navy-900/40">Contact</h4>
                      </div>
                      <p className="text-navy-900/70 text-sm break-all font-mono">{selectedMember.contact}</p>
                    </section>

                    {selectedMember.experience && selectedMember.experience.length > 0 && (
                      <section className="border-t border-navy-900/10 pt-5">
                        <button
                          onClick={() => setShowExperience(!showExperience)}
                          className="flex items-center justify-between w-full text-left py-2 text-navy-900 hover:text-hive-green transition-colors font-bold text-sm tracking-wide focus:outline-none cursor-pointer group"
                        >
                          <div className="flex items-center space-x-2 text-hive-green">
                            <Briefcase size={18} />
                            <h4 className="font-bold uppercase tracking-widest text-xs text-navy-900/40">상세 경력 및 활동 사항</h4>
                          </div>
                          {showExperience ? (
                            <ChevronUp size={16} className="text-navy-900/40 group-hover:text-hive-green transition-colors" />
                          ) : (
                            <ChevronDown size={16} className="text-navy-900/40 group-hover:text-hive-green transition-colors" />
                          )}
                        </button>
                        
                        <motion.div
                          initial={false}
                          animate={{ 
                            height: showExperience ? "auto" : 0,
                            opacity: showExperience ? 1 : 0
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-4 space-y-2.5 pl-1">
                            {selectedMember.experience.map((exp, idx) => (
                              <li key={idx} className="flex items-start space-x-2.5 text-navy-900/70 text-sm leading-relaxed">
                                <span className="mt-2 w-1.5 h-1.5 bg-hive-green rounded-full flex-shrink-0" />
                                <span>{exp}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      </section>
                    )}

                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Members;
