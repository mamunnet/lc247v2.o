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
    title: 'LC247 v2.o',
    content: 'আমাদের আপডেট প্যানেল রেডি হচ্ছে, আজ রাত ১১ টার মধ্যে সকল এজেন্ট কে ID দেওয়া হবে',
    date: Date.now() - 86400000,
    priority: 'medium',
    status: 'active'
  },
  {
    id: '3',
    title: 'Lc247.club',
    content: 'আমাদের প্রাইমারি ডোমেইন লিঙ্ক lc247.club এবং Lc247.asia',
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
