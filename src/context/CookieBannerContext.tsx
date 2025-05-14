'use client';

import React, { createContext, useState, useContext } from 'react';

interface CookieBannerContextType {
  visible: boolean;
  show: () => void;
  hide: () => void;
}

const CookieBannerContext = createContext<CookieBannerContextType | undefined>(undefined);

export const CookieBannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <CookieBannerContext.Provider value={{ visible, show, hide }}>
      {children}
    </CookieBannerContext.Provider>
  );
};

export const useCookieBanner = () => {
  const context = useContext(CookieBannerContext);
  if (!context) {
    throw new Error('useCookieBanner must be used within a CookieBannerProvider');
  }
  return context;
};
