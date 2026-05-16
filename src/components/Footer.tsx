import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-hive-green flex items-center justify-center text-white font-bold rounded-sm">H</div>
              <span className="text-xl font-bold tracking-tight text-hive-green">
                HI<span className="inline-block scale-x-[0.8] origin-center -mx-[0.02em]">V</span>E
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed mb-8">
              Daegu University Hospitality Management Society. <br/>
              환대의 본질을 연구하고 가치 있는 경험을 제안합니다. 당신의 가능성을 함께 만들어가는 학업적 공동체입니다.
            </p>
            <div className="flex space-x-6 items-center">
              <a 
                href="https://www.instagram.com/du_hive/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-hive-green transition-colors flex items-center space-x-2"
              >
                <Instagram size={18} />
                <span className="text-xs uppercase tracking-widest font-bold">Instagram</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-hive-green transition-colors flex items-center space-x-2">
                <Linkedin size={18} />
                <span className="text-xs uppercase tracking-widest font-bold">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-hive-green transition-colors flex items-center space-x-2">
                <Globe size={18} />
                <span className="text-xs uppercase tracking-widest font-bold">Blog</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-hive-green font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/about" className="hover:text-hive-green transition-colors">About</Link></li>
              <li><Link to="/activities" className="hover:text-hive-green transition-colors">Program</Link></li>
              <li><Link to="/members" className="hover:text-hive-green transition-colors">Members</Link></li>
              <li><Link to="/join" className="hover:text-hive-green transition-colors">Recruit</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-hive-green font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>Daegu University, Gyeongsan, Korea</li>
              <li>Hospitality Management Dept.</li>
              <li>duhospitality@naver.com</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-300 font-bold">
          <p>© 2026 HIVE. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">Hospitality Management Society</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
