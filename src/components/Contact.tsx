import React from 'react';
import { Mail, MapPin, Phone, Instagram, Globe, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

const Contact = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-8">
              Get in <span className="text-hive-green italic serif">Touch</span>
            </h2>
            <p className="text-lg text-gray-500 mb-12 max-w-md leading-relaxed">
              HIVE와 함께 호스피탈리티의 미래를 설계하고 싶으신가요? 
              궁금한 점이나 협업 제안이 있다면 언제든 연락주세요.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-hive-green flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Email</h4>
                  <p className="text-gray-900 font-medium">duhospitality@naver.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-hive-green flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Location</h4>
                  <p className="text-gray-900 font-medium">
                    Daegu University, Gyeongsan, Korea<br/>
                    Hospitality Management Dept.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-hive-green flex-shrink-0">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Social</h4>
                  <div className="flex space-x-4 mt-2">
                    <a 
                      href="https://www.instagram.com/du_hive/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-hive-green transition-colors"
                    >
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-hive-green transition-colors">
                      <Globe size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 p-8 md:p-12 rounded-2xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-hive-green/20 focus:border-hive-green transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-white border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-hive-green/20 focus:border-hive-green transition-all"
                    placeholder="Your Email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Subject</label>
                <input 
                  type="text" 
                  className="w-full bg-white border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-hive-green/20 focus:border-hive-green transition-all"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-white border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-hive-green/20 focus:border-hive-green transition-all resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-hive-green text-white font-bold py-4 rounded-lg hover:bg-opacity-90 transition-all uppercase tracking-widest text-xs"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
