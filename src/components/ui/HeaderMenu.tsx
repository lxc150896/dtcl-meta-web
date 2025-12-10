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
    if (e.key === 'Enter') handleSearch();
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const renderDropdownMenu = () => (
    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow w-40 max-h-60 overflow-y-auto text-black z-50">
      {REGION_OPTIONS.map((region) => (
        <div
          key={region.value}
          onClick={() => {
            setSelectedRegion(region);
            setIsDropdownOpen(false);
          }}
          className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
        >
          {region.label}
        </div>
      ))}
    </div>
  );

  return (
    <header className="text-white w-full sticky top-0 z-50">
      {/* Desktop Header */}
      <div className="hidden md:block bg-gray-900 border-b border-gray-500">
        <div className="relative flex justify-center w-full">
          {/* === Cột trái === */}
          <div className="flex justify-end">
            {/* để trống hoặc thêm quảng cáo sau */}
          </div>

          {/* === Cột giữa === */}
          <div className="w-full max-w-[1080px] flex flex-col justify-between items-center gap-x-4 flex-wrap pt-4 px-4">
            {/* Search Bar */}
            <div className="grid grid-cols-[1fr_auto] w-full mb-1 items-center gap-4">
              {/* Ô tìm kiếm */}
              <div className="flex items-center bg-gray-700 border border-gray-600 rounded overflow-visible">
                
                {/* Dùng div relative để bọc nút trigger và dropdown */}
                <div className="relative">
                  <div
                    className="px-3 py-2 bg-gray-700 text-xs cursor-pointer flex items-center gap-1"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {selectedRegion.label.slice(0, 2).toUpperCase()}
                    <ChevronDown className="w-3 h-3" />
                  </div>

                  {/* Dropdown list - Đã được đặt tuyệt đối (absolute) đúng vị trí */}
                  {isDropdownOpen && renderDropdownMenu()}
                </div>

                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tên In-game + #Tag (VD: EA7 Gnut#2004)"
                  className="flex-1 bg-gray-800 px-4 py-2 text-sm text-white focus:outline-none placeholder-gray-400"
                />

                <div
                  onClick={handleSearch}
                  className="px-3 py-2 text-white cursor-pointer hover:text-gray-400"
                >
                  <Search className="w-4 h-4" />
                </div>
              </div>

              {/* Ảnh tải app */}
              <div className="flex items-center gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.lxc150896.dtclmeta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/google_play.png"
                    alt="Tải trên Google Play"
                    width={120}
                    height={0}
                    className="w-[120px] h-auto object-contain"
                  />
                </a>

                <a
                  href="https://apps.apple.com/vn/app/%C4%91%E1%BB%99i-h%C3%ACnh-m%E1%BA%A1nh-%C4%91tcl-tft-trend/id6752505303?l=vi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/app_store.png"
                    alt="Tải trên App Store"
                    width={120}
                    height={0}
                    className="w-[120px] h-auto object-contain"
                  />
                </a>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="w-full flex-1 max-w-[1080px] mx-auto py-1 overflow-x-auto">
              <div className="flex items-center gap-2 w-max">
                <House className="text-white w-6 h-6" />
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
          </div>

          {/* === Cột phải: QR / Version === */}
            <div className="hidden lg:flex flex-col items-center text-center absolute right-4 top-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.lxc150896.dtclmeta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/download.png"
                  alt="Logo ĐTCL"
                  width={40}
                  height={40}
                  className="object-contain w-16 h-auto"
                />
              </a>
              <div className="text-[10px] text-[#ffb900] mt-1">
                version: {data?.version?.season_meta}
              </div>
            </div>
        </div>
      </div>

      {/* Mobile giữ nguyên */}
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
              <div className="mt-1 bg-white border border-gray-300 rounded shadow w-40 max-h-60 overflow-y-auto text-black z-10">
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

            <div className="flex items-center gap-4 ml-6 mt-4">
              {/* Android */}
              <a
                href="https://play.google.com/store/apps/details?id=com.lxc150896.dtclmeta"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <img
                  src="/images/google_play.png"
                  alt="Tải trên Google Play"
                  width={90}
                  height={0}
                  className="w-[120px] h-auto object-contain"
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
                <img
                  src="/images/app_store.png"
                  alt="Tải trên App Store"
                  width={90}
                  height={0}
                  className="w-[120px] h-auto object-contain"
                />
                {/* <span className="text-xs text-white">Android</span> */}
              </a>
            </div>
          </div>

          <div className="bg-[#222] text-[12px] text-white text-center pt-2 pb-10 border-t border-gray-700">
            Phiên bản: {data?.version?.season_meta}
          </div>
        </div>
      )}
    </header>
  );
}
