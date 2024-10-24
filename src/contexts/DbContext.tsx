import React, { createContext, useContext, useEffect, useState } from 'react';
import { initSchema } from '../db/config';

interface DbContextType {
  initialized: boolean;
  error: Error | null;
}

const DbContext = createContext<DbContextType>({
  initialized: false,
  error: null
});

export const DbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await initSchema();
        setInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize database'));
      }
    };
    init();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Database Error</h1>
          <p className="text-gray-300">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-white">LC</span>
            <span className="text-[#65EDBF]">247</span>
          </h1>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-3 h-3 bg-[#65EDBF] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-[#65EDBF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-[#65EDBF] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return <DbContext.Provider value={{ initialized, error }}>{children}</DbContext.Provider>;
};