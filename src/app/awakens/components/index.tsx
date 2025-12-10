'use client';

import { useState } from 'react';
import Image from 'next/image';
import ChampionImageModal from '@/components/ui/ChampionImageModal';
import DescRenderer from '@/components/ui/DescRenderer';
import { useData } from '@/context/DataContext';
import { search } from '@/utils';
import { Search } from "lucide-react";

type Awaken = {
  name: string;
  desc: string; // hoặc thay bằng DescType nếu đã định nghĩa
  champions?: {
    id: string;
    img_url: string;
  }[];
};

export default function AwakensPage() {
  const { data } = useData();
  const [awakens, setAwakens] = useState<Awaken[]>(
    Array.isArray(data?.awakens) ? (data.awakens as Awaken[]) : []
  );

  const handleSearch = (text: string) => {
    const result = search(text, data.awakens, 'name');
    setAwakens(result as Awaken[]);
  };

  const getPrice = (champ_id: string) => {
    if (!champ_id) return 1;
    const champData = data.champions.find(
      (champ: { id: string; price: number }) => champ.id === champ_id
    );
    return champData ? champData.price : 1;
  };

  const ItemCard = ({ item }: { item: Awaken }) => (
    <div className="bg-gray-900 p-3 rounded-lg border border-[#555]">
      <div className="flex items-center mb-2">
        <Image
          src={data.base_url + 'upgrade_champions/power-up.png'}
          alt="awaken"
          width={30}
          height={30}
          className="mr-2"
        />
        <p className="flex-1 text-white font-semibold text-sm truncate">
          {item.name}
        </p>
      </div>

      <DescRenderer desc={typeof item.desc === 'string' ? { description: [item.desc] } : item.desc} baseUrl={data.base_url} />

      {item.champions && item.champions.length > 0 && (
        <div className="mt-2">
          <p className="text-[#FFD424] text-xs font-bold my-1">
            Tướng được ghép:
          </p>
          <div className="flex flex-wrap">
            {item.champions.map((champion, idx) => (
              <div key={idx} className="p-1 relative">
                <ChampionImageModal
                  champImg={champion.img_url}
                  price={getPrice(champion.id)}
                  baseUrl={data.base_url}
                  id={champion.id}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen mb-4">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-2 bg-gray-900 gap-4 mb-2 md:mb-0">
        {/* Phần tiêu đề */}
        <h1 className="text-white text-sm md:text-base font-bold">
          Danh Sách Thức Tỉnh
        </h1>

        {/* Phần ô tìm kiếm */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none cursor-pointer" />
          <input
            onChange={(e) => handleSearch(e.target.value)}
            name="search-champions"
            type="text"
            placeholder="Tìm thức tỉnh..."
            className="bg-gray-800 border border-gray-700 text-white placeholder-gray-400 text-sm rounded-l block w-full pl-10 px-4 py-2"
          />
        </div>
      </header>

      <div
        className="
          grid
          gap-3
          sm:grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          pt-2
        "
      >
        {awakens.map((item, i) => (
          <ItemCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
