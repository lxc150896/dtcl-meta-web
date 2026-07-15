'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { REGION_OPTIONS, } from '@/constants';
import { ChevronDown, Search } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useTranslation } from '@/i18n';

export default function HeaderSearch() {
  const router = useRouter();
  const { language } = useData();
  const { t } = useTranslation(language);
  const [query, setQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(REGION_OPTIONS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = () => {
    const isValidFormat = /^.+#.+$/.test(query);
    if (!isValidFormat) {
      alert(t.header.searchError);
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
            <div className="flex-1 max-w-[1080px] mx-auto flex items-center gap-4 px-4">
              {/* Logo */}
              <Image
                src="/images/logo.png"
                alt={t.alt.logo}
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
                    placeholder={t.header.searchPlaceholder}
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

              <div className="flex items-center gap-4">
                {/* Android */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.hanisoft.team.builder.guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <Image
                    src="/images/google_play.png"
                    alt={t.alt.googlePlay}
                    width={120}
                    height={0}
                    className="w-[160px] h-auto object-contain"
                  />
                  {/* <span className="text-xs text-white">Android</span> */}
                </a>
                {/* iOS */}
                <a
                  href="https://apps.apple.com/vn/app/%C4%91%E1%BB%99i-h%C3%ACnh-m%E1%BA%A1nh-%C4%91tcl-tft-trend/id6752505303?l=vi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <Image
                    src="/images/app_store.png"
                    alt={t.alt.appStore}
                    width={120}
                    height={0}
                    className="w-[160px] h-auto object-contain"
                  />
                  {/* <span className="text-xs text-white">Android</span> */}
                </a>
              </div>

              <a
                href="https://play.google.com/store/apps/details?id=com.hanisoft.team.builder.guide"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2"
              >
                <Image
                  src="/images/download.png"
                  alt={t.alt.logo}
                  width={40}
                  height={40}
                  className="object-contain w-24 h-auto"
                />
              </a>

            </div>

            {/* Phải */}
            <div className="hidden md:block h-full" />
          </div>
        </div>
      </div>
    </header>
  );
}
