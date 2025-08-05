'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { REGION_OPTIONS, TABS } from '@/constants';
import { useData } from '@/context/DataContext';
import { ChevronDown, House, Search } from 'lucide-react';

export default function HeaderMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(REGION_OPTIONS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = () => {
    const isValidFormat = /^.+#.+$/.test(query);
    if (!isValidFormat) {
      alert('Vui lòng nhập đúng định dạng: Tên#Tag (VD: EAGnut#2004)');
      return;
    }

    const [gameName, tagLine] = query.split('#');

    router.push(
      `/summoners?fullName=${gameName}-${tagLine}&name=${gameName}&tag=${tagLine}&region=${selectedRegion.value}&season=set15`
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
        <div className="bg-gray-900 flex justify-center border-b border-gray-500">
          {/* Trái */}
          <div className="hidden md:block" />

          {/* Giữa */}
          <div className="w-full flex-1 max-w-[1080px] mx-auto py-1 overflow-x-auto">
            <div className="flex items-center gap-2 w-max px-6">
              <House className="text-white w-4 h-4" />
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
          {/* Search Input */}
          <div className="relative w-full max-w-xl">
            <div className="flex items-center bg-gray-600 border border-gray-400 rounded overflow-hidden w-full">
              {/* Region Dropdown */}
              <div
                className="relative px-3 py-2 bg-gray-800 text-white text-xs md:text-sm font-medium cursor-pointer flex items-center gap-1"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedRegion.label.slice(0, 2).toUpperCase()}
                <ChevronDown className="w-3 h-3" />
              </div>

              {/* Input */}
              <input
                name="search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Tên In-game + #Tag (VD: EA7 Gnut#2004)`}
                className="flex-1 bg-gray-600 px-4 py-2 text-xs md:text-sm text-white focus:outline-none placeholder:text-gray-400"
              />

              {/* GG (Search Icon) */}
              <div className="px-3 py-2 text-white font-bold text-lg tracking-tight cursor-pointer" onClick={handleSearch}>
                <Search className="w-4 h-4 hover:text-gray-400" />
              </div>
            </div>

            {/* Dropdown list */}
            {isDropdownOpen && (
              <div className="absolute z-100 mt-1 bg-white border border-gray-300 rounded shadow w-40 max-h-60 overflow-y-auto">
                {REGION_OPTIONS.map((region) => (
                  <div
                    key={region.value}
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer text-black"
                    onClick={() => {
                      setSelectedRegion(region);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {region.label}
                  </div>
                ))}
              </div>
            )}
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
