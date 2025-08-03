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
import { ExternalLink } from 'lucide-react';
import Divider from '@/components/ui/Divider';

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

  const comps: Comp[] = Array.isArray(data?.comps) ? (data.comps as unknown as Comp[]) : [];

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

  // const handleSearch = (text: string, screen: string) => {
  //   if (screen === 'camps') {
  //     const result = search(text, data.comps, 'comp_name');
  //     setComps(result);
  //   }
  // };

  return (
    <div className="bg-black min-h-screen">
      <h1 className="text-white p-4 bg-gray-900 mb-1">{data?.version?.season}</h1>
      {comps.length === 0 ? (
        <div className="flex justify-center items-center h-screen text-white text-lg">
          Không Tìm thấy đội hình!
        </div>
      ) : (
        <div className="pb-4 md:space-y-4 space-y-1">
          {comps.map((comp, index) => (
            <div key={index} className="bg-gray-900 p-2 md:p-4 rounded-md">
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
                  <span className="text-yellow-500 text-sm font-bold mr-4">{comp.comp_price}</span>
                  <div className="hidden md:flex">
                    {/* <button
                      className="cursor-pointer flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded mr-4"
                      onClick={() => router.push(`/camps/${comp.id}`)}
                    >
                      <ArrowDownToLine className='w-4 h-4' />
                      <span className="text-xs">Lưu đội hình</span>
                    </button> */}
                    <button
                      className="cursor-pointer flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded"
                      onClick={() => router.push(`/camps/${comp.id}`)}
                    >
                      <ExternalLink className='w-4 h-4' />
                      <span className="text-xs">Chi tiết đội hình</span>
                    </button>
                  </div>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Comps;
