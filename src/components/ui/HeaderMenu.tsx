'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
    <header className="text-white w-full sticky top-0 z-50">
      {/* Desktop Header */}

      <div className="hidden md:block">
        {/* HÀNG 2: Tabs */}
        <div className="bg-gray-950 flex justify-center border-b border-gray-500">
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
      <div className="md:hidden border-b border-gray-700 px-4 py-2 bg-black">
        <div className="flex items-center justify-between gap-2">
          {/* Search input + select + button */}
          <div className="flex items-center rounded-lg shadow-md flex-1 h-10 overflow-hidden bg-gray-700">
            <div className="bg-gray-700 h-full flex items-center px-2 max-w-[25%] overflow-hidden border-r border-gray-600">
              <select
                name="region-select"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="text-xs font-semibold text-white bg-gray-700 border-none outline-none appearance-none truncate w-full"
              >
                {REGION_OPTIONS.map((r) => (
                  <option
                    key={r.label}
                    value={r.value}
                    className="text-white bg-gray-700"
                  >
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
              placeholder="Tên + #Tag (VD: Gnut#2004)"
              className="flex-1 bg-gray-700 outline-none text-sm text-white placeholder-gray-400 px-2 h-full"
              name="search-input"
            />

            <button
              onClick={handleSearch}
              className="h-full px-3 bg-gray-800 hover:bg-gray-950 transition-colors flex items-center justify-center cursor-pointer"
            >
              <Search className="text-white w-4 h-4" />
            </button>
          </div>

          {/* Toggle menu button */}
          <button onClick={() => setIsOpen((p) => !p)} className="ml-2">
            <span className="text-white text-xl">☰</span>
          </button>
        </div>
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
