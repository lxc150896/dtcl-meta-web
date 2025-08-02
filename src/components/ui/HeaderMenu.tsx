'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { REGION_OPTIONS, TABS } from '@/constants';
import { useData } from '@/context/DataContext';
import { House, Search } from 'lucide-react';

export default function HeaderMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useData();
  const [isOpen, setIsOpen] = useState(false);
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

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
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
                  className="h-full px-3 bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center"
                >
                  <Search className="text-white w-4 h-4 cursor-pointer" />
                </button>
              </div>
            </div>

            {/* Phải */}
            <div className="hidden md:block h-full" />
          </div>
        </div>

        {/* HÀNG 2: Tabs */}
        <div className="bg-gray-950 flex justify-center">
          {/* Trái */}
          <div className="hidden md:block" />

          {/* Giữa */}
          <div className="w-full flex-1 max-w-5xl mx-auto py-1 overflow-x-auto">
            <div className="flex items-center gap-2 w-max px-6">
              <House className="text-white" />
              {TABS.map((tab, i) => {
                const isActive = pathname === tab.path;
                return (
                  <button
                    key={i}
                    onClick={() => handleNavigate(tab.path)}
                    className={`px-4 py-2 rounded text-sm cursor-pointer transition-colors ${
                      isActive ? 'text-[#ffb900]' : 'hover:text-[#ffb900] text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Phải */}
          <div className="hidden md:block" />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden border-b border-gray-700 px-4 py-2 flex justify-between items-center bg-black">
        <div className="text-[#ffb900] text-sm font-semibold">{data?.version?.season}</div>
        <button onClick={() => setIsOpen((p) => !p)}>
          <span className="text-white text-xl cursor-pointer">☰</span>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col h-[calc(100vh-50px)] bg-black border-t border-gray-700">
          <div className="flex-1 overflow-y-auto">
            {TABS.map((tab, i) => {
              const isActive = pathname === tab.path;
              return (
                <button
                  key={i}
                  onClick={() => handleNavigate(tab.path)}
                  className={`w-full text-left px-6 py-3 cursor-pointer ${
                    isActive ? 'bg-gray-700 text-[#ffb900]' : 'hover:bg-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="bg-[#222] text-[10px] text-white text-center py-2 border-t border-gray-700">
            Phiên bản: {data?.version?.season_meta}
          </div>
        </div>
      )}
    </header>
  );
}
