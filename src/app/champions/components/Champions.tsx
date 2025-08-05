'use client'; // nếu đang dùng app router

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ChampionImage from '@/components/ui/ChampionImage';
import { useData } from '@/context/DataContext';
import GoldIcon from '@/assets/icons/Gold';
import { Search } from 'lucide-react';
import { search } from '@/utils';

type Trait = {
  name: string;
  image: string;
};

type Champion = {
  id: string | number;
  name: string;
  image: string;
  price: number;
  traits: Trait[];
  average_position: number;
  top_4_rate: number;
  top_1_rate: number;
  battle: number;
};

export default function ChampionsPage() {
  const { data } = useData();
  const [champions, setChampions] = useState<Champion[]>(
    data.champions.map((champ) => ({
      ...champ,
      average_position: champ.average_position ?? 0,
      top_4_rate: champ.top_4_rate ?? 0,
      top_1_rate: champ.top_1_rate ?? 0,
      battle: champ.battle ?? 0,
    }))
  );
  const router = useRouter();

  const handleSearch = (text: string) => {
    const result = search(text, data.champions, 'name');
    setChampions(result as Champion[]);
  };

  return (
    <div className="bg-black min-h-screen mb-4">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-2 bg-gray-900 gap-4 mb-2 md:mb-0">
        {/* Phần tiêu đề */}
        <h1 className="text-white text-sm md:text-base font-bold">
          Danh Sách Tướng
        </h1>

        {/* Phần ô tìm kiếm */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none cursor-pointer" />
          <input
            onChange={(e) => handleSearch(e.target.value)}
            name="search-champions"
            type="text"
            placeholder="Tìm kiếm tướng..."
            className="bg-gray-800 border border-gray-700 text-white placeholder-gray-400 text-sm rounded-l block w-full pl-10 px-4 py-2"
          />
        </div>
      </header>

      <div className="text-white md:mx-0 px-2 w-full flex gap-2 text-xs bg-gray-800 py-2 border-b border-[#333]">
        <div className="w-[5%] text-center">#</div>
        <div className="w-[40%] ml-2 md:ml-8">Tướng</div>
        <div className="w-[10%] text-center">Giá</div>
        <div className="w-[15%] text-center">Vị trí tb</div>
        <div className="w-[15%] md:w-[10%] text-center">Top 1</div>
        <div className="w-[15%] md:w-[10%] text-center">Top 4</div>
        <div className="w-[10%] text-center hidden md:block">Trận</div>
      </div>

      {/* Champ Rows */}
      {champions.map((champ: Champion, index: number) => (
        <div
          key={champ.id}
          onClick={() => router.push(`/champions/${champ.id}`)}
          className="bg-gray-900 flex items-center md:text-sm text-xs text-gray-200 py-2 px-2 hover:bg-gray-800 border-b border-black cursor-pointer"
        >
          <span className="w-[5%] text-center">{index + 1}</span>

          {/* Champion + traits */}
          <div className="flex items-center w-[40%] ml-2 md:ml-8">
            <ChampionImage
              champImg={champ.image}
              price={champ.price}
              baseUrl={data.base_url}
              alt={champ.name}
            />
            <div className="flex flex-col ml-4">
              <span className="text-white font-semibold truncate max-w-[100px]">{champ.name}</span>
              <div className="flex mt-0 md:mt-2">
                {champ.traits.map((trait: Trait, idx: number) => (
                  <Image
                    key={idx}
                    src={data.base_url + 'synergys/' + trait.image}
                    alt={trait.name}
                    width={16}
                    height={16}
                    className="md:w-5 md:h-5 md:mr-2 w-4 h-4 mr-1"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center text-gray-300 w-[10%]">
            <GoldIcon />
            <span className="ml-1">{champ.price}</span>
          </div>
          <span className="text-gray-300 text-center w-[15%]">#{champ.average_position}</span>
          <span className="text-gray-300 text-center w-[15%] md:w-[10%]">{champ.top_4_rate}%</span>
          <span className="text-gray-300 text-center w-[15%] md:w-[10%]">{champ.top_1_rate}%</span>
          <span className="text-gray-300 text-center w-[10%] hidden md:block">{champ.battle}</span>
        </div>
      ))}
    </div>
  );
}
