import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notice } from '../types';
import { noticeOperations } from '../db';

interface NoticeContextType {
  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id' | 'status'>) => Promise<void>;
  updateNotice: (id: string, notice: Partial<Notice>) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

const NoticeContext = createContext<NoticeContextType | undefined>(undefined);

export const NoticeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load notices from database on mount
  useEffect(() => {
    const loadNotices = async () => {
      try {
        const loadedNotices = await noticeOperations.getAllNotices();
        setNotices(loadedNotices);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load notices'));
      } finally {
        setLoading(false);
      }
    };

    loadNotices();
  }, []);

  const addNotice = async (notice: Omit<Notice, 'id' | 'status'>) => {
    try {
      await noticeOperations.createNotice({
        ...notice,
        status: 'active'
      });
      
      // Reload notices after adding
      const updatedNotices = await noticeOperations.getAllNotices();
      setNotices(updatedNotices);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add notice'));
      throw err;
    }
  };

  const updateNotice = async (id: string, updates: Partial<Notice>) => {
    try {
      const notice = notices.find(n => n.id === id);
      if (!notice) throw new Error('Notice not found');

      const updatedNotice = { ...notice, ...updates };
      await noticeOperations.updateNotice(updatedNotice);
      
      // Reload notices after updating
      const updatedNotices = await noticeOperations.getAllNotices();
      setNotices(updatedNotices);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update notice'));
      throw err;
    }
  };

  const deleteNotice = async (id: string) => {
    try {
      await noticeOperations.deleteNotice(id);
      
      // Reload notices after deleting
      const updatedNotices = await noticeOperations.getAllNotices();
      setNotices(updatedNotices);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete notice'));
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading notices: {error.message}
      </div>
    );
  }

  return (
    <NoticeContext.Provider value={{ 
      notices, 
      addNotice, 
      updateNotice, 
      deleteNotice,
      loading,
      error 
    }}>
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
