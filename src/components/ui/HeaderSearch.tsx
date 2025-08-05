'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { REGION_OPTIONS, } from '@/constants';
import { ChevronDown, Search } from 'lucide-react';

export default function HeaderSearch() {
  const router = useRouter();
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
            <div className="flex-1 max-w-[1080px] mx-auto p-4 flex items-center gap-4">
              {/* Logo */}
              <Image
                src="/images/logo.png"
                alt="Logo ĐTCL"
                width={40}
                height={40}
                className="object-contain w-12 h-12"
              />
              {/* Search Input */}
              <div className="relative w-full max-w-[1080px]">
                <div className="flex items-center bg-gray-900 border border-gray-400 rounded overflow-hidden w-full">
                  {/* Region Dropdown */}
                  <div
                    className="relative px-3 bg-gray-900 text-gray-400 text-xs font-medium cursor-pointer flex items-center gap-1"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {selectedRegion.label.slice(0, 2).toUpperCase()}
                    <ChevronDown className="w-3 h-3" />
                  </div>

                  {/* Input */}
                  <input
                    name="search-summoner"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Tên In-game + #Tag (VD: EA7 Gnut#2004)`}
                    className="flex-1 bg-gray-800 px-4 py-2 text-xs md:text-sm text-white focus:outline-none placeholder:text-gray-400"
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
            </div>

            {/* Phải */}
            <div className="hidden md:block h-full" />
          </div>
        </div>
      </div>
    </header>
  );
}
