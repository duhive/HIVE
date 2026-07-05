import React from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, BookOpen, Heart, Bookmark, Edit2, Trash2, ShieldAlert } from 'lucide-react';
import { Column } from '../types';

interface ColumnDetailProps {
  column: Column;
  isLiked: boolean;
  isBookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export default function ColumnDetail({
  column,
  isLiked,
  isBookmarked,
  onLike,
  onBookmark,
  onEdit,
  onDelete,
  onBack
}: ColumnDetailProps) {
  const formattedDate = column.date || '2026.07.01';

  return (
    <motion.div
      id="column-detail-container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs p-6 md:p-10 my-6"
    >
      {/* Back Button */}
      <button
        id="btn-back-to-list"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-950 mb-8 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>목록으로 돌아가기</span>
      </button>

      {/* Header Info */}
      <div className="mb-6">
        <span className="inline-block px-3 py-1 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-full mb-3 uppercase tracking-wider">
          {column.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight leading-tight mb-4">
          {column.title}
        </h1>
        <p className="text-lg text-gray-500 font-medium leading-relaxed">
          {column.subtitle}
        </p>
      </div>

      {/* Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-100 mb-8 text-sm text-gray-500">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <span>{column.readTime || '5분 분량'}</span>
          </div>
        </div>

        {/* Edit and Delete actions */}
        <div className="flex items-center gap-2">
          <button
            id="detail-edit-btn"
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-100 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>수정</span>
          </button>
          <button
            id="detail-delete-btn"
            onClick={onDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 border border-red-100 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>삭제</span>
          </button>
        </div>
      </div>

      {/* Big Cover Image */}
      {column.coverImage && (
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 bg-gray-50">
          <img
            src={column.coverImage}
            alt={column.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content Area - Markdown Body */}
      <div className="markdown-body prose prose-lg prose-emerald max-w-none mb-12">
        <ReactMarkdown>
          {column.content}
        </ReactMarkdown>
      </div>

      {/* Tags section */}
      {column.tags && column.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-gray-100">
          {column.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-100 rounded-lg"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Author Footer Profile Card */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <img
          src={column.author?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120'}
          alt={column.author?.name}
          referrerPolicy="no-referrer"
          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
        />
        <div className="flex-grow text-center sm:text-left min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <h4 className="font-bold text-gray-900">{column.author?.name || '익명 기고가'}</h4>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded">
              {column.author?.role || '연구원'}
            </span>
          </div>
          <p className="text-xs text-gray-500 font-medium mb-3">
            {column.author?.affiliation || 'HIVE Academic Platform'}
          </p>
          <p className="text-xs text-gray-600 leading-relaxed font-sans max-w-xl">
            해당 기고물은 호스피탈리티(H)와 테크놀로지(T)의 선도적 융합 및 디지털 혁신을 추구하는 HIVE 학술 포럼의 공식 의견을 담고 있습니다. 무단 복제 및 상업적 목적의 전재를 금합니다.
          </p>
        </div>
      </div>

      {/* Large Bottom Actions */}
      <div className="flex items-center justify-center gap-4 mt-12 pt-8 border-t border-gray-100">
        <button
          id="detail-like-large-btn"
          onClick={onLike}
          className={`flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-bold transition-all duration-300 ${
            isLiked
              ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-xs'
              : 'border-gray-200 text-gray-600 hover:bg-rose-50/50 hover:text-rose-600'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform duration-200 ${isLiked ? 'fill-rose-600 scale-125' : ''}`} />
          <span>공감 {column.likes || 0}</span>
        </button>

        <button
          id="detail-bookmark-large-btn"
          onClick={onBookmark}
          className={`flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-bold transition-all duration-300 ${
            isBookmarked
              ? 'bg-amber-50 border-amber-200 text-amber-600 shadow-xs'
              : 'border-gray-200 text-gray-600 hover:bg-amber-50/50 hover:text-amber-600'
          }`}
        >
          <Bookmark className={`w-4 h-4 transition-transform duration-200 ${isBookmarked ? 'fill-amber-600 scale-125' : ''}`} />
          <span>북마크 저장</span>
        </button>
      </div>
    </motion.div>
  );
}
