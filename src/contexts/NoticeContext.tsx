import React, { createContext, useContext, useState } from 'react';
import { Notice } from '../types';

interface NoticeContextType {
  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id' | 'status'>) => void;
  updateNotice: (id: string, notice: Partial<Notice>) => void;
  deleteNotice: (id: string) => void;
}

const NoticeContext = createContext<NoticeContextType | undefined>(undefined);

const initialNotices: Notice[] = [
  
  {
    id: '2',
    title: 'আমাদের নতুন প্যানেল রেডি',
    content: 'আমাদের নতুন প্যানেল লিঙ্ক রেডি হয়ে গেছে, আর কিছুক্ষনের মদ্ধেই সকল এজেন্ট দের প্রোভাইড করা হবে',
    date: Date.now() - 86400000,
    priority: 'medium',
    status: 'active'
  },
  
];

export const NoticeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);

  const addNotice = (notice: Omit<Notice, 'id' | 'status'>) => {
    const newNotice: Notice = {
      ...notice,
      id: Date.now().toString(),
      status: 'active'
    };
    setNotices(prev => [newNotice, ...prev]);
  };

  const updateNotice = (id: string, updates: Partial<Notice>) => {
    setNotices(prev => prev.map(notice => 
      notice.id === id ? { ...notice, ...updates } : notice
    ));
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(notice => notice.id !== id));
  };

  return (
    <NoticeContext.Provider value={{ notices, addNotice, updateNotice, deleteNotice }}>
      {children}
    </NoticeContext.Provider>
  );
};

export const useNotices = () => {
  const context = useContext(NoticeContext);
  if (context === undefined) {
    throw new Error('useNotices must be used within a NoticeProvider');
  }
  return context;
};
