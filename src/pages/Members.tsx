import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MEMBERS, PARTNER_MEMBERS } from '../constants';
import { Member } from '../types';
import { X, Mail, GraduationCap, Briefcase, Award, Users } from 'lucide-react';

const Members = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('GENERATIONS');
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');

  const generations = ['전체', '0-1기', '2기'];
  const partnerFilters = ['Convergence Partners', 'Alumni Partners'];

  const filteredMembers = selectedCategory === 'GENERATIONS'
    ? (selectedFilter === '전체' ? MEMBERS : selectedFilter === '0-1기' ? MEMBERS : [])
    : PARTNER_MEMBERS.filter(m => m.category === selectedFilter);

  const isComingSoon = (selectedCategory === 'GENERATIONS' && selectedFilter === '2기') || 
                     (selectedCategory === 'PARTNERS' && filteredMembers.length === 0);

  return (
    <section id="members" className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-2 text-gradient">Members</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
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
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Generations</h3>
                <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
                  {generations.map((gen) => (
                    <button
                      key={gen}
                      onClick={() => {
                        setSelectedCategory('GENERATIONS');
                        setSelectedFilter(gen);
                      }}
                      className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap text-left ${
                        selectedCategory === 'GENERATIONS' && selectedFilter === gen
                          ? 'bg-hive-green text-white shadow-lg shadow-hive-green/20'
                          : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {gen}
                    </button>
                  ))}
                </div>
              </div>

              {/* Partners Section */}
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Partners</h3>
                <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
                  {partnerFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setSelectedCategory('PARTNERS');
                        setSelectedFilter(filter);
                      }}
                      className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap text-left ${
                        selectedCategory === 'PARTNERS' && selectedFilter === filter
                          ? 'bg-hive-green text-white shadow-lg shadow-hive-green/20'
                          : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
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
                className="flex flex-col items-center justify-center py-32 bg-gray-50 rounded-3xl border border-dashed border-gray-200"
              >
                <div className="w-16 h-16 bg-hive-green/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-hive-green" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCategory === 'PARTNERS' ? 'Partners Coming Soon' : '2기 모집 준비 중'}
                </h3>
                <p className="text-gray-500">곧 새로운 멤버들과 함께 찾아오겠습니다.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMembers.map((member, i) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedMember(member)}
                    className="cursor-pointer group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    
                    <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1">{member.role}</p>
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <div className="h-0.5 w-0 group-hover:w-full bg-white/60 transition-all duration-300 mt-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
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
              className="relative w-full max-w-4xl max-h-[75vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-accent hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full md:w-3/5 p-6 md:p-10 overflow-y-auto">
                <div className="mb-6">
                  <span className="text-accent font-bold uppercase tracking-[0.2em] text-xs">{selectedMember.role}</span>
                  <h2 className="text-4xl font-display font-bold mt-2 text-gray-900">{selectedMember.name}</h2>
                  <p className="text-gray-600 mt-4 text-lg italic whitespace-pre-line">"{selectedMember.bio}"</p>
                </div>

                <div className="grid gap-6">
                  <section>
                    <div className="flex items-center space-x-2 text-accent mb-3">
                      <GraduationCap size={18} />
                      <h4 className="font-bold uppercase tracking-widest text-xs text-gray-400">Education</h4>
                    </div>
                    <p className="text-gray-700">{selectedMember.education}</p>
                  </section>

                  <div className="grid grid-cols-2 gap-6">
                    <section>
                      <div className="flex items-center space-x-2 text-accent mb-3">
                        <Award size={18} />
                        <h4 className="font-bold uppercase tracking-widest text-xs text-gray-400">INTERESTS</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.skills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full border border-gray-200 uppercase">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section>
                      <div className="flex items-center space-x-2 text-accent mb-3">
                        <Mail size={18} />
                        <h4 className="font-bold uppercase tracking-widest text-xs text-gray-400">Contact</h4>
                      </div>
                      <p className="text-gray-600 text-sm break-all">{selectedMember.contact}</p>
                    </section>
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
