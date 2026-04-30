import React from 'react';
import { motion } from 'motion/react';
import SectionHeader from '../components/SectionHeader';

const GALLERY_IMAGES: any[] = [];

const Photo = () => {
  return (
    <div className="pt-20">
      <section className="py-24 bg-white min-h-[70vh]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title="Photo Gallery"
            subtitle="포토 갤러리"
            description="HIVE의 다양한 활동과 프로젝트의 순간들을 기록합니다."
          />

          {GALLERY_IMAGES.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GALLERY_IMAGES.map((image, i) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl"
                >
                  <img 
                    src={image.url}
                    alt={image.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-hive-green">
                      {image.category}
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {image.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-20 text-center py-32 rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200"
            >
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
                <p className="text-gray-500 font-medium">활동 사진은 정기적으로 업데이트될 예정입니다.</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Photo;
