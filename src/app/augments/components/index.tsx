"use client";

import { useState, useRef } from "react";
import CustomTab from "@/components/CustomTab";
import { useData } from "@/context/DataContext";
import TechnologieImage from "@/components/ui/TechnologieImage";
import { Search } from "lucide-react";
import { search } from "@/utils";

export default function TechnologiesPage() {
  const { data } = useData();
  const [activeTab, setActiveTab] = useState(0);
  const searchRef = useRef<{ clearSearch?: () => void }>(null);

  const [items, setItems] = useState(data.technologies["1"]);
  const tabLabels = ["Bạc", "Vàng", "Kim Cương"];
  const [query, setQuery] = useState('');
  const tabKey = ["1", "2", "3"];

  const handleTab = (index: number) => {
    searchRef.current?.clearSearch?.();
    setActiveTab(index);
    setItems(data.technologies[(index + 1).toString()] || []);
    setQuery('');
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    const filtered = search(text, data.technologies[tabKey[activeTab]], "name");
    setItems(filtered as { id: string; name: string; image: string; description: string }[]);
  };

  return (
    <div className="min-h-screen text-white mb-4">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-2 bg-gray-900 gap-4 mb-2 md:mb-0">
        {/* Phần tiêu đề */}
        <h1 className="text-white text-sm md:text-base font-bold">
          Lõi nâng cấp
        </h1>

        {/* Phần ô tìm kiếm */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none cursor-pointer" />
          <input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            name="search-champions"
            type="text"
            placeholder="Tìm trang bị..."
            className="bg-gray-800 border border-gray-700 text-white placeholder-gray-400 text-sm rounded-l block w-full pl-10 px-4 py-2"
          />
        </div>
      </header>
      <CustomTab tabs={tabLabels} activeTab={activeTab} onChange={handleTab} />

      <div className="overflow-x-auto mt-1 md:mt-2">
        <div className="divide-y divide-[#222]">
          <div className="grid grid-cols-[5%_40%_55%] md:grid-cols-[5%_40%_55%] bg-gray-800 text-xs md:text-sm font-bold text-gray-300 py-2 text-center">
            <div>#</div>
            <h2 className="text-left px-2">Lõi nâng cấp</h2>
            <h2 className="text-left px-2">Chi tiết</h2>
          </div>

          {items.map((item, index: number) => (
            <div
              key={index}
              className="text-xs md:text-sm grid grid-cols-[5%_40%_55%] md:grid-cols-[5%_40%_55%] items-center py-3 border-b border-black bg-gray-900 hover:bg-[#3a3a46]"
            >
              <div className="text-center">{index + 1}</div>
              <h2 className="flex items-center gap-2 px-2">
                <TechnologieImage techImg={item.image} baseUrl={data.base_url} alt={item.name} />
                <span className="font-semibold truncate text-xs md:text-sm">{item.name}</span>
              </h2>
              <h2 className="px-2 text-gray-300 text-xs md:text-sm font-medium">
                {item.description}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
