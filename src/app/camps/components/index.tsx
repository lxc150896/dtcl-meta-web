"use client";
import ChampionImageModal from '@/components/ui/ChampionImageModal';
import TraitImageModal from '@/components/ui/TraitImageModal';
import Image from 'next/image';
import { useData } from '@/context/DataContext';
import { useParams } from 'next/navigation';
import ItemImageModal from '@/components/ui/ItemImageModal';
import ItemImage from '@/components/ui/ItemImage';
import TechnologieImage from '@/components/ui/TechnologieImage';
import React from 'react';
import GoldIcon from '@/assets/icons/Gold';

export default function CampDetailPage() {
  const params = useParams(); 
  const id = typeof params.id === 'string' ? decodeURIComponent(params.id) : params.id;
  const { data } = useData();

  interface Comp {
    id: string;
    comp_name: string;
    img_huong_dan_tuong_tung_level: HuongDanTungLevelChampion[];
    ti_le_thang_for_levels: { ti_le_thang: string }[];
    tier_img: string;
    comp_price: number,
    average_position: number;
    top_1_rate: number;
    top_4_rate: number;
    pick_rate: number;
    synergys: { trait_img: string; trait_id: string; trait_count: number }[];
    img_url_huong_dan_dau_game: string;
    img_url_huong_dan_giua_game: string;
    img_url_huong_dan_cuoi_game: string;
    tuong_chu_lucs: {
      champions_id: string;
      items_do_tuong_chu_luc: ItemDoTuongChuLuc[];
    }[];
    tang_cuongs?: ItemNangCapTuongChuLuc[][];
    items: ItemType[];
    // add other relevant properties as needed
  }

  const comp = Array.isArray(data?.comps)
    ? ((data.comps as unknown) as Comp[]).find((item: Comp) => item.id === id)
    : undefined;
  interface Champion {
    id: string;
    name: string;
    price: number;
    image: string;
    traits: { image: string; name: string }[];
    // add other relevant properties as needed
  }

  interface ItemDoTuongChuLuc {
    id: string;
    img_url_do_tuong_chu_luc: string;
    name_do_tuong_chu_luc: string;
    so_tran_do_tuong_chu_luc: number;
  }

  interface HuongDanTungLevelChampion {
    champ_id: string;
    img_name_huong_dan_tuong_tung_level: string;
    img_name: string;
    // add other relevant properties as needed
  }

  interface ItemType {
    id: string;
    img_name_build_do: string;
    name_build_do: string;
    img_name_build_do_thanh_phan_one: string;
    img_name_build_do_thanh_phan_two: string;
    // add other relevant properties as needed
  }

  interface ItemNangCapTuongChuLuc {
    id: string;
    img: string;
    name: string;
  }

  const getChamp = (champId: string) => {
    if (!data || !Array.isArray(data.champions)) return undefined;
    return (data.champions as Champion[]).find((item: Champion) => item.id === champId);
  };

  const convertHuongDanTungLevel = () => {
    if (!comp) return [];
    const { img_huong_dan_tuong_tung_level, ti_le_thang_for_levels } = comp;
    const result = [];
    let index = 0;
    let level = 4;

    for (const tiLeThang of ti_le_thang_for_levels) {
      const group = img_huong_dan_tuong_tung_level
        .slice(index, index + level)
        .map((item: HuongDanTungLevelChampion) => ({
          ...item
        }));
      result.push({ level, winRate: tiLeThang.ti_le_thang, champions: group });
      index += level;
      level++;
    }
    return result;
  };

  console.log('comp data', comp);
  if (!comp) return <div className="text-white">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white mb-4 mt-4">
      <div className="flex-1 overflow-y-auto">
        <div className="bg-black">
          <div className="bg-gray-900 mb-2 p-4 md:flex">
            <div className="items-center mb-2 w-full">
              <div className="flex mb-4">
                <Image width={20} height={20} src={`${data?.base_url}tiers/${comp.tier_img}`} alt={comp.comp_name ?? 'Đấu Trường Chân Lý'} className="mr-2" />
                <h1 className="text-white text-sm md:text-base font-bold mr-4">{comp.comp_name}</h1>
                <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                  <GoldIcon />
                  <span>{comp.comp_price}</span>
                </div>
              </div>
              <div className="hidden md:flex text-xs text-white w-full max-w-[50%] mb-4">
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
                <div className="flex flex-col justify-center flex-1 px-2 border-l border-white/20">
                  <span className="text-xs">Tỉ lệ chọn</span>
                  <span className="font-semibold text-sm">{comp.pick_rate}%</span>
                </div>
              </div>
              <div className="md:flex flex-wrap mb-2 w-full">
                <div className="flex flex-wrap gap-1 md:gap-2 w-full items-center h-fit">
                  {comp.synergys.map((synergy: { trait_img: string; trait_id: string; trait_count: number }, i: number) => (
                    <TraitImageModal
                      key={i}
                      traitImg={synergy.trait_img}
                      baseUrl={String(data?.base_url ?? '')}
                      id={synergy.trait_id}
                      count={String(synergy.trait_count)}
                      style={{ width: 20, height: 20 }}
                      alt={synergy.trait_id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex items-stretch w-full gap-2">
            <div className="bg-gray-900 md:w-8/12">
              <div className="flex text-white px-3 py-2 text-xs bg-gray-800">
                <div className="w-10">Lv</div>
                <div className="flex-1 text-center text-sm">Tướng khuyên dùng</div>
                <div className="w-20 text-right text-sm">Tỉ lệ thắng</div>
              </div>
              {convertHuongDanTungLevel().map((item, index) => (
                <div key={index} className="flex items-center border-b border-black bg-gray-900 px-3 py-2">
                  <div className="w-10 bg-black rounded text-white text-sm text-center mr-2">Lv {item.level}</div>
                  <div className="flex-1 flex gap-2 flex-wrap">
                    {item.champions.map((champ: HuongDanTungLevelChampion, i: number) => (
                      <div key={i} className="flex flex-col items-center">
                        <ChampionImageModal
                          champImg={champ.img_name_huong_dan_tuong_tung_level}
                          price={getChamp(champ.champ_id)?.price || 1}
                          baseUrl={String(data?.base_url ?? '')}
                          id={champ.champ_id}
                          style={{ width: 40, height: 40, borderRadius: 6 }}
                          alt={champ.img_name}
                        />
                        <span className="text-[10px] text-white truncate w-[30px]">{champ.img_name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-16 text-right text-white text-xs">{item.winRate}</div>
                </div>
              ))}
            </div>
            <div className="md:w-4/12">
              <h2 className="py-2 px-4 text-base text-white bg-gray-800 mb-[0.5px]">Ghép trang bị</h2>
              <div className="bg-gray-900 w-full xs:pt-3">
                {comp.items.map((item, index) => {
                  const typedItem = item as ItemType;

                  return (
                    <div
                      key={index}
                      className={`flex border-b-2 border-black box-border py-2 px-3 md:py-1 md:px-4`}
                    >
                      <div className="flex items-center gap-2">
                        <ItemImage
                          itemImg={typedItem.img_name_build_do}
                          baseUrl={String(data?.base_url ?? '')}
                          alt={typedItem.name_build_do}

                        />
                        <span className="text-sm text-white truncate">{typedItem.name_build_do}</span>
                      </div>
                      <div className="flex justify-end items-center gap-2 mt-2 ml-auto">
                        <ItemImage
                          itemImg={typedItem.img_name_build_do_thanh_phan_one}
                          baseUrl={String(data?.base_url ?? '')}
                          alt={typedItem.name_build_do}
                        />
                        <span className="text-white">+</span>
                        <ItemImage
                          itemImg={typedItem.img_name_build_do_thanh_phan_two}
                          baseUrl={String(data?.base_url ?? '')}
                          alt={typedItem.name_build_do}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <h2 className="py-2 px-4 text-base text-white bg-gray-800 mt-2">Xây dựng đội hình</h2>
          
          <div className="md:flex w-full">
            <div className="bg-[#282830] mt-[1px] px-4 py-2 w-full">
              <div className="text-center flex justify-between border-b border-gray-600 py-2 px-4 text-white text-xs bg-[#282830]">
                <span className="text-sm">Xây dựng đội hình đầu trận</span>
              </div>
              <Image
                width={600}
                height={300}
                src={`${data?.base_url_meta}huong_dan_choi/${comp.img_url_huong_dan_dau_game}`}
                alt={`Hướng dẫn build đội hình ${comp.comp_name} đầu trận ĐTCL mùa 15`}
                className="w-full h-auto my-4"
              />
            </div>
            <div className="bg-[#282830] mt-[1px] px-4 py-2 w-full">
              <div className="text-center flex justify-between border-b border-gray-600 py-2 px-4 text-white text-xs bg-[#282830]">
                <span className="text-sm">Xây dựng đội hình giữa trận</span>
              </div>
              <Image
                width={600}
                height={300}
                src={`${data?.base_url_meta}huong_dan_choi/${comp.img_url_huong_dan_giua_game}`}
                alt={`Hướng dẫn build đội hình ${comp.comp_name} giữa trận ĐTCL mùa 15`}
                className="w-full h-auto my-4"
              />
            </div>
            <div className="bg-[#282830] mt-[1px] px-4 py-2 w-full">
              <div className="text-center flex justify-between border-b border-gray-600 py-2 px-4 text-white text-xs bg-[#282830]">
                <span className="text-sm">Xây dựng đội hình cuối trận</span>
              </div>
              <Image
                width={600}
                height={300}
                src={`${data?.base_url_meta}huong_dan_choi/${comp.img_url_huong_dan_cuoi_game}`}
                alt={`Hướng dẫn build đội hình ${comp.comp_name} cuối trận ĐTCL mùa 15`}
                className="w-full h-auto my-4"
              />
            </div>
          </div>
        </div>
      </div>
      <h2 className="py-2 px-4 text-base text-white bg-gray-800 mt-4 mb-[0.5px]">Tướng chủ lực</h2>
      <div className="bg-gray-900 md:flex">
        {comp.tuong_chu_lucs.map((tuongChuLuc: {
          champions_id: string;
          items_do_tuong_chu_luc: ItemDoTuongChuLuc[];
        }, index: number) => {
          const champ = getChamp(tuongChuLuc.champions_id);

          interface Trait {
            image: string;
            name: string;
          }

          return (
            <div key={index} className="bg-gray-900 w-full">
              {champ ? (
                <>
                  <div className="flex flex-wrap gap-2 items-center p-4 border border-[#1c1c1f] box-border">
                    <div className="flex items-start gap-2">
                      <ChampionImageModal
                        id={champ.id}
                        champImg={champ.image}
                        price={champ.price}
                        baseUrl={String(data?.base_url ?? '')}
                        style={{ width: 40, height: 40 }}
                        alt={champ.name}
                      />

                      <div>
                        <div className="flex gap-2 items-center text-white">
                          <span className="font-bold text-sm">{champ.name}</span>
                          <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                            <GoldIcon />
                            <span>{champ.price}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-1 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-600">
                          {champ.traits.map((trait: Trait, i: number) => (
                            <div
                              key={i}
                              className="flex items-center gap-1 border border-gray-600 px-2 py-1 rounded-full"
                            >
                              <Image
                                src={`${data?.base_url}synergys/${trait.image}`}
                                alt={trait.name}
                                width={20}
                                height={20}
                              />
                              <span className="text-xs text-yellow-400 truncate">{trait.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border border-[#1c1c1f] box-border">
                    <div className="flex justify-between py-2 px-4 text-white text-xs bg-gray-800">
                      <span>Trang bị khuyên dùng</span>
                      <span>Trận</span>
                    </div>
                    {tuongChuLuc.items_do_tuong_chu_luc.map((row: ItemDoTuongChuLuc, i: number) => (
                      <div key={i} className="flex justify-between items-center py-2 px-4 text-white text-xs">
                        <div className="flex items-center gap-2">
                          <ItemImageModal
                            style={{ width: 32, height: 32 }}
                            id={row.id}
                            itemImg={row.img_url_do_tuong_chu_luc}
                            baseUrl={String(data?.base_url ?? '')}
                            alt={row.name_do_tuong_chu_luc}
                          />
                          <span>{row.name_do_tuong_chu_luc}</span>
                        </div>
                        <span>{row.so_tran_do_tuong_chu_luc}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-4 text-white">Champion data not found.</div>
              )}
            </div>
          );
        })}
      </div>

      {comp.tang_cuongs && (comp.tang_cuongs[0].length > 0 || comp.tang_cuongs[1].length > 0 || comp.tang_cuongs[2].length > 0) && (
        <>
          <h2 className="py-2 px-4 text-base text-white bg-gray-800 mt-4 mb-[0.5px]">Nâng cấp công nghệ</h2>
          <div className="bg-gray-900">
            <div className="grid grid-cols-3 gap-0">
              {comp.tang_cuongs.map((column: ItemNangCapTuongChuLuc[], colIndex: number) => (
                <div key={colIndex} className="border-r border-black last:border-r-0">
                  {column.map((item: ItemNangCapTuongChuLuc, itemIndex: number) => (
                    <div key={itemIndex} className="flex items-center gap-2 py-3 px-4 text-white text-xs border-b border-black last:border-b-0">
                      <TechnologieImage
                        techImg={item.img}
                        baseUrl={String(data?.base_url ?? '')}
                        className="w-8 h-8"
                        alt={item.name}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
