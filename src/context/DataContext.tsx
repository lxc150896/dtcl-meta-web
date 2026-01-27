// app/context/DataContext.tsx (hoặc: src/context/DataContext.tsx)
'use client';

import Image from 'next/image';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Champion = {
  id?: string;
  img_url: string;
};

type Language = 'en' | 'vi' | 'ja';

interface DataContextType {
  data: {
    season: any;
    comps: Array<{ id: string; name: string; image: string; description: string, tier_img: string, synergys: Array<{ trait_img: string; trait_id: string; trait_count: number }>, items: Array<{ image: string }> }>;
    champions: Array<{ id: string; name: string; image: string; price: number; description_icon: string[], traits: Array<{ name: string; image: string }>, average_position: number; top_4_rate: number; top_1_rate: number; battle: number }>;
    items: Record<string, { id: string; name: string; image: string; [key: string]: unknown }>;
    synergys: Array<{ average_position: number; top_4_rate: number; top_1_rate: number; battle: number; kich_hoat: string; id: string; name: string; image: string; trait?: string; description?: string; description_detail?: string[][]; description_icon: string[]; champions?: { id: string; image: string }[] }>;
    base_url: string;
    base_url_meta: string;
    version?: { season?: string, season_meta: string };
    technologies: Record<string, Array<{ id: string; name: string; image: string; description: string }>>;
    instruct: {
      trang_bi: Array<{ image: string; name: string; description: string }>;
      roll: Array<{ image: string; name: string; description: string }>;
      vong: Array<{ image: string; name: string; description: string }>;
      vong_ky_ngoc: Array<{ image: string; name: string; description: string }>;
      vang_kinh_nghiem: Array<Array<{ icon?: string; name: string; value: string | number }>>;
      cong_thuc_sat_thuong: Array<{ icon?: string; name: string; value: string | number }>;
      vong_ky_ngo?: Array<{ title: string; items: Array<{ name: string; description: string }> }>;
      headers: Array<string>;
    };
    champions_by_gold: Champion[][];
  };
  loading: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const DataContext = createContext<DataContextType | null>(null);

// Hàm phát hiện ngôn ngữ từ trình duyệt
const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language || (navigator as any).userLanguage || 'en';
  const langCode = browserLang.toLowerCase().split('-')[0];
  
  // Kiểm tra nếu ngôn ngữ trình duyệt là một trong 3 ngôn ngữ được hỗ trợ
  if (langCode === 'vi') return 'vi';
  if (langCode === 'ja') return 'ja';
  if (langCode === 'en') return 'en';
  
  // Mặc định là tiếng Anh nếu không khớp
  return 'en';
};

// Hàm lấy ngôn ngữ từ localStorage hoặc phát hiện từ trình duyệt
const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  
  const savedLang = localStorage.getItem('dtcl-language');
  
  // Migrate từ 'vn' cũ sang 'vi' mới
  if (savedLang === 'vn') {
    localStorage.setItem('dtcl-language', 'vi');
    return 'vi';
  }
  
  // Nếu có ngôn ngữ đã lưu và hợp lệ, sử dụng nó
  if (savedLang && (savedLang === 'en' || savedLang === 'vi' || savedLang === 'ja')) {
    return savedLang as Language;
  }
  
  // Nếu không có, phát hiện từ trình duyệt
  return detectBrowserLanguage();
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage());
  const [data, setData] = useState<DataContextType['data']>({
    season: '', // <-- Add missing required property 'season'
    comps: [],
    champions: [],
    items: {},
    synergys: [],
    base_url: '',
    base_url_meta: '',
    version: { season: '', season_meta: '' },
    technologies: {},
    instruct: {
      trang_bi: [],
      roll: [],
      vong: [],
      vong_ky_ngoc: [],
      vang_kinh_nghiem: [],
      cong_thuc_sat_thuong: [],
      vong_ky_ngo: [],
      headers: []
    },
    champions_by_gold: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Hàm để thay đổi ngôn ngữ và lưu vào localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dtcl-language', lang);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // const baseUrlVersion = 'https://api.github.com/repos/lxc150896/du-lieu-dt-web/contents/data/version.json';
        const baseUrlVersion = 'https://raw.githubusercontent.com/lxc150896/du-lieu-dt-web/main/data/version.json';
        const responseVersion = await fetch(baseUrlVersion, {
          headers: {
            Accept: 'application/vnd.github.v3.raw',
          },
        });
        const jsonVersion = await responseVersion.json();

        const [allData, comps] = await Promise.all([
          fetch(
            `https://cdn.jsdelivr.net/gh/lxc150896/du-lieu-dt-web@${jsonVersion.version}/data/${language}/all_data.json`
          ).then((res) => res.json()),
          fetch(
            `https://cdn.jsdelivr.net/gh/lxc150896/du-lieu-dt-web@${jsonVersion.version_meta}/data/${language}/comps.json`
          ).then((res) => res.json()),
        ]);

        allData.comps = comps;
        allData['base_url'] = `https://cdn.jsdelivr.net/gh/lxc150896/du-lieu-dt-web@${jsonVersion.version}/`;
        allData['base_url_meta'] = `https://cdn.jsdelivr.net/gh/lxc150896/du-lieu-dt-web@${jsonVersion.version_meta}/`;
        allData['version'] = jsonVersion;

        setData(allData);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [language]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    // Import translations dynamically to avoid SSR issues
    const { translations: i18nTranslations } = require('@/i18n');
    const t = i18nTranslations[language] || i18nTranslations.en;
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <Image
          src="/images/logo.png"
          alt="Error icon"
          width={100}
          height={100}
          className="mb-2"
        />
        <p className="text-yellow-400 text-lg">{t.common.networkError}</p>
      </div>
    );
  }

  return <DataContext.Provider value={{ data, loading, language, setLanguage }}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
