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
    id: '1',
    title: 'Welcome to LC247',
    content: 'We are excited to announce the launch of our new platform.',
    date: Date.now(),
    priority: 'high',
    status: 'active'
  },
  {
    id: '2',
    title: 'New Game Launch',
    content: 'Experience our latest game collection.',
    date: Date.now() - 86400000,
    priority: 'medium',
    status: 'active'
  },
  {
    id: '3',
    title: 'System Update',
    content: 'Platform maintenance completed.',
    date: Date.now() - 172800000,
    priority: 'low',
    status: 'active'
  }
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