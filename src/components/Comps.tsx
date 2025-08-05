"use client";
import React from 'react';
import { useData } from '../context/DataContext';
import TraitImageModal from '@/components/ui/TraitImageModal';
import { useRouter } from 'next/navigation';
import ChampionImageModal from '@/components/ui/ChampionImageModal';
import TagBadge from '@/components/ui/TagBadge';
import GoldIcon from '@/assets/icons/Gold';
import Image from 'next/image';
import { PRICE_BORDER_COLORS } from '@/constants';
import Divider from './ui/Divider';
import { ChevronRight, Search } from 'lucide-react';
import { search } from '@/utils';

const Comps = () => {
  const { data } = useData();
  const router = useRouter();
  type Comp = {
    id: string;
    comp_name: string;
    tier_img: string;
    tags: string[];
    comp_price: number;
    synergys: {
      trait_img: string;
      trait_id: string;
      trait_count: number;
    }[];
    champs: {
      star: number;
      champ_img: string;
      champions_id: string;
      champ_main_geleral_level?: string;
      items: { item_img: string }[];
      champions_name: string;
    }[];
    average_position: number;
    top_1_rate: number;
    top_4_rate: number;
    pick_rate: number;
  };

  const [comps, setComps] = React.useState<Comp[]>(data.comps as unknown as Comp[]);

  type Champion = {
    id: string;
    price: number;
    // add other properties if needed
  };

  const getPrice = (champ_id: string) => {
    if (!champ_id) return 1;
    const champ =
      data &&
      Array.isArray(data.champions)
        ? (data.champions as Champion[]).find((champ: Champion) => champ.id === champ_id)
        : undefined;
    return champ ? champ.price : 1;
  };

  const handleSearch = (text: string) => {
    const result = search(text, data.comps, 'comp_name');
    setComps(result as Comp[]);
  };

  return (
    <div className="bg-black min-h-screen mb-4 mt-4">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-2 bg-gray-900 gap-4 mb-2 md:mb-4">
        {/* Phần tiêu đề */}
        <h1 className="text-white text-sm md:text-base font-bold">
          {data?.version?.season}
        </h1>

        {/* Phần ô tìm kiếm */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none cursor-pointer" />
          <input
            onChange={(e) => handleSearch(e.target.value)}
            name="search-camops"
            type="text"
            placeholder="Tìm kiếm đội hình..."
            className="bg-gray-800 border border-gray-700 text-white placeholder-gray-400 text-xs md:text-sm rounded-l block w-full pl-10 px-4 py-2"
          />
        </div>
      </header>
      {comps.length === 0 ? (
        <div className="flex justify-center items-center h-screen text-white text-lg">
          Không Tìm thấy đội hình!
        </div>
      ) : (
        <div className="pb-4 md:space-y-2 space-y-1">
            {comps.map((comp, index) => (
            <div key={index}>
              <div className="bg-gray-900 px-2 py-2 md:px-4 md:py-2 rounded-md hidden md:block hover:bg-gray-800 cursor-pointer transition">
                <div className="flex max-w-full overflow-x-auto">
                  <div className="flex w-full pr-4">
                    {/* Ảnh tier nằm bên trái */}
                    <div className="flex-shrink-0">
                      <Image
                        src={(data?.base_url ?? '') + 'tiers/' + comp.tier_img}
                        alt={comp.comp_name}
                        width={32}
                        height={32}
                        className="w-6 h-6"
                        unoptimized
                      />
                    </div>

                    {/* Phần nội dung */}
                    <div className="flex-1 pl-3">
                      {/* Tên đội hình + giá */}
                      <div className="flex items-center gap-2 mb-4">
                        <h2
                          className="text-white text-sm font-bold cursor-pointer hover:text-gray-300"
                          onClick={() => router.push(`/camps/${comp.id}`)}
                        >
                          {comp.comp_name}
                        </h2>

                        <div className="ml-auto flex items-center gap-1">
                          <GoldIcon />
                          <span className="text-yellow-500 text-sm font-bold mr-4">{comp.comp_price}</span>
                        </div>
                      </div>

                      {/* Tag */}
                      <div className="flex gap-1 mb-4 flex-wrap">
                        {comp.tags.map((tag, i) => (
                          <TagBadge key={i} tag={tag} />
                        ))}
                      </div>

                      {/* Thống kê */}
                      <div className="hidden md:flex text-xs text-white">
                        <div className="relative flex flex-col justify-center flex-2 px-2 border-l border-white/20">
                          <span className="text-xs">Vị trí trung bình</span>
                          <span className="font-semibold text-sm">{comp.average_position}</span>
                        </div>
                        <div className="relative flex flex-col justify-center flex-1 px-2 border-l border-white/20">
                          <span className="text-xs">Top 1</span>
                          <span className="font-semibold text-sm">{comp.top_1_rate}%</span>
                        </div>
                        <div className="relative flex flex-col justify-center flex-1 px-2 border-l border-white/20">
                          <span className="text-xs">Top 4</span>
                          <span className="font-semibold text-sm">{comp.top_4_rate}%</span>
                        </div>
                        <div className="flex flex-col justify-center flex-2 px-2 border-l border-white/20">
                          <span className="text-xs">Tỉ lệ chọn</span>
                          <span className="font-semibold text-sm">{comp.pick_rate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                  <div className="flex justify-between items-center w-full mr-4">
                    {/* Phần synergy */}
                    <div className="flex flex-wrap flex-1 gap-y-1">
                      {comp.synergys.map((synergy, i) => (
                        <div key={i} className="mr-1 md:mr-2 mb-1 md:mb-0">
                          <TraitImageModal
                            traitImg={synergy.trait_img}
                            baseUrl={typeof data?.base_url === 'string' ? data.base_url : undefined}
                            id={synergy.trait_id}
                            count={synergy.trait_count.toString()}
                            alt={synergy.trait_id}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Nút bên phải */}
                    <div className="flex-shrink-0 ml-2">
                      <button
                        className="bg-yellow-500 border border-gray-700 text-white text-xs px-3 py-2 rounded hover:bg-yellow-600 transition flex items-center cursor-pointer"
                        onClick={() => router.push(`/camps/${comp.id}`)}
                      >
                        <span>Chi tiết đội hình</span> {/* Bọc text trong span là một thói quen tốt */}
                        <ChevronRight className='w-4 h-4 ml-1' />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-1 md:gap-2 py-2">
                    {[...comp.champs, ...Array(10 - comp.champs.length).fill(null)].map((champ, i) => (
                      <div key={i}>
                        {champ ? (
                          <>
                            {/* ⭐ nếu có sao */}
                            {champ.star > 0 ? (
                              <div className="flex">
                                {Array.from({ length: champ.star }).map((_, index) => (
                                  <p key={index} className="text-[8px] md:text-xs">⭐</p>
                                ))}
                              </div>
                            ) : (
                              <div className="h-[12px]"><p className="text-[8px]"></p></div>
                            )}

                            {/* Ảnh + level + items */}
                            <div className="relative">
                              <ChampionImageModal
                                champImg={champ.champ_img}
                                price={getPrice(champ.champions_id)}
                                baseUrl={typeof data?.base_url === 'string' ? data.base_url : undefined}
                                id={champ.champions_id}
                                alt={champ.champions_name}
                              />

                              {/* Level tag */}
                              {champ.champ_main_geleral_level && (
                                <span className="absolute top-0 left-0 text-white text-[8px] rounded px-1"
                                  style={{ backgroundColor: PRICE_BORDER_COLORS[getPrice(champ.champions_id) - 1] || '#fff' }}>
                                  {champ.champ_main_geleral_level}
                                </span>
                              )}

                              {/* Items */}
                              {champ.items.length > 0 && (
                                <div className="absolute bottom-0 left-0 w-full flex justify-center">
                                  <div className="flex gap-[2px] bg-black/40 rounded-t">
                                    {champ.items.map((item: { item_img: string }, iItem: number) => (
                                      <Image
                                        key={iItem}
                                        width={15}
                                        height={15}
                                        src={data?.base_url + 'items/' + item.item_img}
                                        alt={item.item_img}
                                        className="md:w-[15px] md:h-[15px] w-2 h-2"
                                      />
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Tên champ */}
                            <span className="hidden md:block text-white text-[11px] mt-1 text-center w-[50px] truncate overflow-hidden whitespace-nowrap">
                              {champ.champions_name}
                            </span>
                          </>
                        ) : (
                          // ❗️Ô rỗng (trường hợp thiếu để đủ 10)
                          <>
                            <div className="h-[12px]"><p className="text-[8px]">&nbsp;</p></div>
                            <div className="relative">
                              <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-gray-900 border-gray-700 rounded border-2" />
                            </div>
                            <span className="hidden md:block text-white text-[11px] mt-1 text-center w-[50px] truncate overflow-hidden whitespace-nowrap">&nbsp;</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  </div>
                </div>
              </div>
              <div key={index} className="bg-gray-900 p-2 md:p-4 rounded-md block md:hidden">
                <div className="flex items-center gap-2">
                  <Image
                    src={(data?.base_url ?? '') + 'tiers/' + comp.tier_img}
                    alt={comp.comp_name}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                    unoptimized
                  />
                  <h2 className="text-white text-sm font-bold flex-shrink cursor-pointer" onClick={() => router.push(`/camps/${comp.id}`)}>{comp.comp_name}</h2>
                  <div className="flex gap-1 ml-2">
                    {comp.tags.map((tag, i) => (
                      <TagBadge key={i} tag={tag} />
                    ))}
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <GoldIcon />
                    <span className="text-yellow-500 text-sm font-bold">{comp.comp_price}</span>
                    {/* <div>
                      <button
                        className="cursor-pointer flex items-center gap-2 bg-yellow-500 text-white p-1 rounded"
                        onClick={() => router.push(`/camps/${comp.id}`)}
                      >
                        <span className="text-xs">Chi tiết</span>
                      </button>
                    </div> */}
                  </div>
                </div>
                <Divider color="black" />
                <div className="flex max-w-full overflow-x-auto">
                  <div>
                    <div className="flex mr-4 flex-wrap">
                      {comp.synergys.map((synergy: { trait_img: string; trait_id: string; trait_count: number }, i: number) => (
                        <div key={i} className="mr-1 md:mr-2 mb-1 md:mb-0">
                          <TraitImageModal
                            traitImg={synergy.trait_img}
                            baseUrl={typeof data?.base_url === 'string' ? data.base_url : undefined}
                            id={synergy.trait_id}
                            count={synergy.trait_count.toString()}
                            alt={synergy.trait_id}
                          />
                          </div>
                      ))}
                    </div>
                    <div className="flex gap-1 md:gap-2 py-2">
                      {comp.champs.map((champ: Comp["champs"][number], i: number) => (
                        <div key={i}>
                          {champ.star > 0 ? (
                            <div className="flex">
                              {Array.from({ length: champ.star }).map((_, index) => (
                                <p key={index} className="text-[8px] md:text-xs">⭐</p>
                              ))}
                            </div>
                          ) : (
                            <div className="h-[12px]"><p className="text-[8px]"></p></div>
                          )}
                          <div className="relative">
                            <ChampionImageModal
                              champImg={champ.champ_img}
                              price={getPrice(champ.champions_id)}
                              baseUrl={typeof data?.base_url === 'string' ? data.base_url : undefined}
                              id={champ.champions_id}
                              alt={champ.champions_name}
                            />

                            {/* Level tag ở góc trên trái */}
                            {champ.champ_main_geleral_level && (
                              <span className="absolute top-0 left-0 text-white text-[8px] rounded px-1" style={{ backgroundColor: PRICE_BORDER_COLORS[getPrice(champ.champions_id) - 1] || '#fff' }}>
                                {champ.champ_main_geleral_level}
                              </span>
                            )}

                            {/* Items đè lên góc dưới phải */}
                            {champ.items.length > 0 && (
                              <div className="absolute bottom-0 left-0 w-full flex justify-center">
                                <div className="flex gap-[2px] bg-black/40 rounded-t">
                                  {champ.items.map((item: { item_img: string }, iItem: number) => (
                                    <Image
                                      key={iItem}
                                      width={15}
                                      height={15}
                                      src={data?.base_url + 'items/' + item.item_img}
                                      alt={item.item_img}
                                      className="md:w-[15px] md:h-[15px] w-2 h-2"
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                            
                          </div>
                          <span className="hidden md:block text-white text-[11px] mt-1 text-center w-[50px] truncate overflow-hidden whitespace-nowrap">
                            {champ.champions_name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:flex text-xs text-white w-full">
                    <div className="hidden xl:block relative flex-col items-center justify-center flex-2 px-2 after:content-[''] after:absolute after:right-0 after:top-[20%] after:h-[60%] after:w-px after:bg-black">
                    </div>
                    <div className="relative flex flex-col items-center justify-center flex-2 px-2 after:content-[''] after:absolute after:right-0 after:top-[20%] after:h-[60%] after:w-px after:bg-black">
                      <span>Vị trí trung bình</span>
                      <span className="font-semibold">{comp.average_position}</span>
                    </div>
                    <div className="relative flex flex-col items-center justify-center flex-1 px-2 after:content-[''] after:absolute after:right-0 after:top-[20%] after:h-[60%] after:w-px after:bg-black">
                      <span>Top 1</span>
                      <span className="font-semibold">{comp.top_1_rate}%</span>
                    </div>
                    <div className="relative flex flex-col items-center justify-center flex-1 px-2 after:content-[''] after:absolute after:right-0 after:top-[20%] after:h-[60%] after:w-px after:bg-black">
                      <span>Tỉ top 4</span>
                      <span className="font-semibold">{comp.top_4_rate}%</span>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1 px-2">
                      <span>Tỉ lệ chọn</span>
                      <span className="font-semibold">{comp.pick_rate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comps;
