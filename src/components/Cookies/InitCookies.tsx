'use client';
import { useEffect } from 'react';
import { setCookie, getCookie } from '@/utils/cookies';
import { useCookieBanner } from '@/context/CookieBannerContext';

export default function InitCookies() {
  const { show } = useCookieBanner();

  useEffect(() => {
    if (!getCookie('cookie_consent')) {
      show(); 
    }
  }, [show]);

  return null;
}
