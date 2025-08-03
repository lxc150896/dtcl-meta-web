'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { REGION_OPTIONS, } from '@/constants';
import { Search } from 'lucide-react';

export default function HeaderSearch() {
  const router = useRouter();
  const [region, setRegion] = useState('vn2');
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    const isValidFormat = /^.+#.+$/.test(query);
    if (!isValidFormat) {
      alert('Vui lòng nhập đúng định dạng: Tên#Tag (VD: EAGnut#2004)');
      return;
    }

    const [gameName, tagLine] = query.split('#');

    router.push(
      `/summoners?fullName=${gameName}-${tagLine}&name=${gameName}&tag=${tagLine}&region=${region}&season=set15`
    );
    setQuery('');
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="text-white w-full">
      {/* Desktop Header */}

      <div className="hidden md:block">
        {/* HÀNG 1: Search bar */}
        <div className="bg-gray-900 w-full">
          <div className="flex">
            {/* Trái */}
            <div className="hidden md:block h-full" />
            
            {/* Giữa */}
            <div className="flex-1 max-w-5xl mx-auto p-4 flex items-center gap-4">
              {/* Logo */}
              <Image
                src="/images/logo.png"
                alt="Logo ĐTCL"
                width={40}
                height={40}
                className="object-contain w-12 h-12"
              />
              {/* Search bar */}
              <div className="flex items-center rounded-lg shadow-md w-full h-10 overflow-hidden">
                <div className="bg-gray-800 h-full flex items-center px-3">
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="cursor-pointer bg-transparent border-none outline-none font-semibold text-sm text-white appearance-none pr-6 h-full"
                  >
                    {REGION_OPTIONS.map((r) => (
                      <option key={r.label} value={r.value} className="text-black">
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tên In-game + #Tag (VD: EA7 Gnut#2004)"
                  className="flex-1 bg-gray-700 outline-none text-sm text-white placeholder-gray-400 px-3 h-full"
                />

                <button
                  onClick={handleSearch}
                  className="h-full px-3 bg-gray-800 hover:bg-gray-950 cursor-pointer transition-colors flex items-center justify-center"
                >
                  <Search className="text-white w-4 h-4 cursor-pointer" />
                </button>
              </div>
            </div>

            {/* Phải */}
            <div className="hidden md:block h-full" />
          </div>
        </div>
      </div>
    </header>
  );
}
