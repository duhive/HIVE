import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, X, Bell, Calendar, User, Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface NoticeItem {
  id: number;
  isImportant: boolean;
  title: string;
  date: string;
  author: string;
  content: string;
}

export default function Notices() {
  const [notices, setNotices] = useState<NoticeItem[]>(() => {
    const saved = localStorage.getItem('hive_notices');
    if (saved) {
      try {
        const parsed: NoticeItem[] = JSON.parse(saved);
        // Filter out old default Kim Hyun-jung notices if present
        const filtered = parsed.filter(n => !(n.author === '김현정' && (n.title.includes('TOSOK') || n.title.includes('APTA') || n.title.includes('APAcCHRIE') || n.title.includes('신입생 모집'))));
        return filtered;
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [isWriteOpen, setIsWriteOpen] = useState(false);

  const [noticeForm, setNoticeForm] = useState({
    title: '',
    author: '관리자',
    date: new Date().toISOString().split('T')[0],
    isImportant: false,
    content: ''
  });

  useEffect(() => {
    localStorage.setItem('hive_notices', JSON.stringify(notices));
  }, [notices]);

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeForm.title.trim()) return;

    const newNoticeItem: NoticeItem = {
      id: Date.now(),
      isImportant: noticeForm.isImportant,
      title: noticeForm.title.trim(),
      date: noticeForm.date,
      author: noticeForm.author.trim() || '관리자',
      content: noticeForm.content.trim() || '공지사항 내용이 없습니다.'
    };

    setNotices([newNoticeItem, ...notices]);
    setNoticeForm({
      title: '',
      author: '관리자',
      date: new Date().toISOString().split('T')[0],
      isImportant: false,
      content: ''
    });
    setIsWriteOpen(false);
  };

  const handleDeleteNotice = (id: number) => {
    if (confirm('이 공지사항을 삭제하시겠습니까?')) {
      setNotices(notices.filter(n => n.id !== id));
      if (selectedNotice?.id === id) {
        setSelectedNotice(null);
      }
    }
  };

  const filteredNotices = notices.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-hive-green/10 text-hive-green border border-hive-green/20 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            <Bell size={13} />
            HIVE NOTICE BOARD
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            공지사항 목록
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            미래혁신관광연구실(FIT Lab) 및 호스피탈리티 경영학회의 주요 학술, 세미나, 수강 관련 공식 안내입니다.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xs border border-slate-200/80 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="공지사항 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:border-hive-green focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => setIsWriteOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-hive-green hover:bg-hive-green/90 text-white font-bold text-xs md:text-sm rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Plus size={16} />
              <span>새 공지 작성</span>
            </button>
          </div>
        </div>

        {/* Notice List Table / Cards */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          {filteredNotices.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <Bell size={40} className="mx-auto mb-3 opacity-30 stroke-1" />
              <p className="text-sm font-medium">등록된 공지사항이 없거나 검색 결과가 없습니다.</p>
              <button 
                onClick={() => setIsWriteOpen(true)}
                className="mt-4 text-xs font-bold text-hive-green hover:underline inline-flex items-center gap-1"
              >
                + 첫 공지사항 작성하기
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredNotices.map((notice) => (
                <div 
                  key={notice.id}
                  onClick={() => setSelectedNotice(notice)}
                  className="p-5 md:p-6 hover:bg-slate-50/80 transition-colors cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="flex items-start md:items-center gap-3 min-w-0">
                    {notice.isImportant && (
                      <span className="bg-rose-50 text-rose-500 border border-rose-200/80 text-[11px] font-bold px-2 py-0.5 rounded-md shrink-0">
                        중요
                      </span>
                    )}
                    <div>
                      <h3 className="text-slate-900 font-bold text-base md:text-lg group-hover:text-hive-green transition-colors line-clamp-1">
                        {notice.title}
                      </h3>
                      <p className="text-slate-500 text-xs md:text-sm line-clamp-1 mt-1">
                        {notice.content}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400 font-mono shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-slate-400" />
                      {notice.date}
                    </span>
                    <span className="flex items-center gap-1 text-slate-600 font-sans font-medium">
                      <User size={13} className="text-slate-400" />
                      {notice.author}
                    </span>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-hive-green group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative border border-slate-100">
            <button 
              onClick={() => setSelectedNotice(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X size={18} />
            </button>
            
            <div className="flex items-center gap-2 mb-3">
              {selectedNotice.isImportant && (
                <span className="bg-rose-50 text-rose-500 border border-rose-200 text-xs font-bold px-2 py-0.5 rounded-md">
                  중요 공지
                </span>
              )}
              <span className="text-xs font-mono text-slate-400">{selectedNotice.date}</span>
              <span className="text-xs text-slate-500 font-medium">| 작성자: {selectedNotice.author}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug">
              {selectedNotice.title}
            </h3>

            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed mb-6 border border-slate-100 whitespace-pre-line min-h-[140px]">
              {selectedNotice.content}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => handleDeleteNotice(selectedNotice.id)}
                className="px-3.5 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-bold transition-colors"
              >
                공지 삭제
              </button>
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Write Notice Modal */}
      {isWriteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100">
            <button 
              onClick={() => setIsWriteOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Plus size={20} className="text-hive-green" />
              새 공지사항 작성
            </h3>

            <form onSubmit={handleCreateNotice} className="space-y-4">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  id="modalIsImportant"
                  checked={noticeForm.isImportant}
                  onChange={(e) => setNoticeForm({...noticeForm, isImportant: e.target.checked})}
                  className="w-4 h-4 text-rose-500 rounded border-slate-300 focus:ring-rose-500"
                />
                <label htmlFor="modalIsImportant" className="text-xs font-bold text-rose-600 cursor-pointer">
                  중요 공지로 지정
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">제목</label>
                <input 
                  type="text"
                  required
                  value={noticeForm.title}
                  onChange={(e) => setNoticeForm({...noticeForm, title: e.target.value})}
                  placeholder="공지사항 제목을 입력하세요"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-hive-green"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">작성자</label>
                  <input 
                    type="text"
                    value={noticeForm.author}
                    onChange={(e) => setNoticeForm({...noticeForm, author: e.target.value})}
                    placeholder="작성자명"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-hive-green"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">날짜</label>
                  <input 
                    type="date"
                    value={noticeForm.date}
                    onChange={(e) => setNoticeForm({...noticeForm, date: e.target.value})}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-hive-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">상세 내용</label>
                <textarea 
                  rows={5}
                  value={noticeForm.content}
                  onChange={(e) => setNoticeForm({...noticeForm, content: e.target.value})}
                  placeholder="공지사항 상세 내용을 입력하세요..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-hive-green"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWriteOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-hive-green hover:bg-hive-green/90 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
