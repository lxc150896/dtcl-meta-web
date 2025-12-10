// app/context/DataContext.tsx (hoặc: src/context/DataContext.tsx)
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Champion = {
  id?: string;
  img_url: string;
};

interface DataContextType {
  data: {
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
    awakens: Array<unknown>;
    champions_by_gold: Champion[][];
  };
  loading: boolean;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DataContextType['data']>({
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
    awakens: [],
    champions_by_gold: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const baseUrlVersion = 'https://api.github.com/repos/lxc150896/du-lieu-dt-web/contents/data/version.json';
        const responseVersion = await fetch(baseUrlVersion, {
          headers: {
            Accept: 'application/vnd.github.v3.raw',
          },
        });
        const jsonVersion = await responseVersion.json();

        const [allData, comps] = await Promise.all([
          fetch(
            `https://cdn.jsdelivr.net/gh/lxc150896/du-lieu-dt-web@${jsonVersion.version}/data/all_data.json`
          ).then((res) => res.json()),
          fetch(
            `https://cdn.jsdelivr.net/gh/lxc150896/du-lieu-dt-web@${jsonVersion.version_meta}/data/comps.json`
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
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <img
          src="/images/logo.png"
          alt="Error icon"
          width={100}
          height={100}
          className="mb-2"
        />
        <p className="text-yellow-400 text-lg">Lỗi mạng!</p>
      </div>
    );
  }

  return <DataContext.Provider value={{ data, loading }}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
