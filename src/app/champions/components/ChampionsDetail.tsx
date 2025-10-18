"use client";
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import ChampionImage from '@/components/ui/ChampionImage';
import ChampionImageModal from '@/components/ui/ChampionImageModal';
import ItemImageModal from '@/components/ui/ItemImageModal';
import TraitImageModal from '@/components/ui/TraitImageModal';
import { useData } from '@/context/DataContext';
import { useParams } from 'next/navigation';
import GoldIcon from '@/assets/icons/Gold';
import { IconArmor, IconAttackDamage, IconAttackRange, IconAttackSpeed, IconDamagePerSecond, IconHealth, IconMagicalResistance } from '@/assets/icons';
import InlineTextWithImages from '@/components/ui/InlineTextWithImages';

interface Item {
  id: string;
  name?: string;
  image?: string;
  average_position?: number;
  top_4_rate?: number;
  top_1_rate?: number;
  // Add other properties as needed
}

interface ItemRowProps {
  item: Item;
  index: number;
}

interface Champion {
  id: string;
  name: string;
  image: string;
  price: number;
  traits: { name: string; image: string; id: string; trait?: string; }[];
  average_position: number;
  top_4_rate: number;
  top_1_rate: number;
  battle: number;
  skill_image?: string;
  skill_name?: string;
  description?: string;
  description_icon: string;
  starting_mana?: number;
  skill_mana?: number;
  health?: number[] | string[];
  attack_damage?: number[] | string[];
  damage_per_second?: number[] | string[];
  attack_speed?: number | string;
  armor?: number | string;
  magical_resistance?: number | string;
  skill_attack_range?: number;
  items?: Item[];
}
  
export default function ChampionDetailScreen() {
  const params = useParams();
  const id = params.id;

  const { data } = useData();
  const allItems = Object.values(data.items).flat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [id]);

  const champ = data.champions.find((item) => item.id === id) as Champion | undefined;

  const getItem = (item_id: string, isImage: boolean) => {
    if (!item_id) return null;
    if (isImage) {
      const item = allItems.find((item: Item) => item.image === item_id);
      return item ?? null;
    } else {
      const item = allItems.find((item: Item) => item.id === item_id);
      return item ?? null;
    }
  };

  const ItemRow = ({ item, index }: ItemRowProps) => {
    const foundItem = getItem(item.image ?? '', true);
    if (!foundItem) return null;

    return (
      <div className="flex items-center py-2 border-b border-black bg-gray-900">
        <p className="flex-[0.5] text-center text-gray-50">{index}</p>

        <div className="flex flex-2 items-center">
          <ItemImageModal
            itemImg={item.image ?? ''}
            baseUrl={data.base_url}
            id={item.id}
            alt={item.name}
          />
          <p className="ml-2 text-white font-semibold text-xs truncate" style={{ flexShrink: 1 }}> {/* flex-shrink để text không bị tràn */}
            {foundItem?.name}
          </p>
        </div>

        <p className="flex-1 text-center text-gray-300">{foundItem?.average_position ? `#${foundItem.average_position}` : '?'}</p>
        <p className="flex-1 text-center text-gray-300">{foundItem?.top_4_rate !== undefined ? `${foundItem.top_4_rate}%` : '?'}</p>
        <p className="flex-1 text-center text-gray-300">{foundItem?.top_1_rate !== undefined ? `${foundItem.top_1_rate}%` : '?'}</p>
      </div>
    );
  };

  const getPrice = (champ_id: string) => {
    if (!champ_id) return 1;
    const champData = data.champions.find((champ: { id: string; price: number }) => champ.id === champ_id);
    return champData ? champData.price : 1;
  };

  const SkillCard = () => {
    return (
      <div>
        <h2 className="text-white font-bold text-base mb-0 py-2 px-4 bg-gray-800">Kỹ năng</h2>

        <div className="flex items-center bg-gray-900 pt-2 mt-[0.5px]">
          <Image
            loading="lazy"
            src={data.base_url + 'skills/' + champ?.skill_image}
            alt={champ?.skill_name ?? ''}
            className="w-9 h-9 mr-2 ml-4 object-contain"
            width={36}
            height={36}
          />
          <div className="flex-1">
            <p className="text-white font-bold text-sm md:text-base">{champ?.skill_name}</p>
            <div className="flex items-center">
              {/* <IoWater className="text-sky-400 mr-1" size={18} /> */}
              <p className="text-gray-400 text-xs">{champ?.starting_mana}/{champ?.skill_mana}</p>
            </div>
          </div>
        </div>

        <div className="text-gray-300 leading-5 bg-gray-900 pl-[60px] pr-4 pb-4">
          <InlineTextWithImages desc={Array.isArray(champ?.description_icon) ? champ.description_icon : (champ?.description_icon ? [champ.description_icon] : [])} baseUrl={data?.base_url} />
        </div>
      </div>
    );
  };

  const renderTrait = (traitId: string) => {
    const trait = data.synergys.find((t) => t.id === traitId);
    if (!trait) return null;
    return (
      <div className="flex justify-between bg-gray-900 mb-0 py-2 px-4">
        {/* Trait Info bên trái - không wrap */}
        <div className="flex items-start shrink-0">
          <TraitImageModal
            traitImg={trait?.image}
            baseUrl={data.base_url}
            id={trait?.id}
            isPadding={false}
            style={{ width: '30px', height: '30px' }}
            alt={trait?.name}
          />
          <div className="ml-2">
            <p className="font-bold text-white text-xs mb-0.5 mr-2">{trait?.name}</p>
            <p className="text-yellow-500 text-xs">{trait?.trait}</p>
          </div>
        </div>

        {/* Champion List bên phải - cho wrap nếu nhiều */}
        <div className="flex flex-wrap justify-end ml-4 gap-2">
          {trait?.champions?.map((item, indexTrait: number) => (
            <ChampionImageModal
              key={indexTrait}
              champImg={item.image}
              price={getPrice(item.id)}
              baseUrl={data.base_url}
              style={{ width: '32px', height: '32px' }}
              id={item.id}
              alt={trait.name}
            />
          ))}
        </div>
      </div>
    );
  };

  // Hàm renderColoredText giữ nguyên logic, chỉ thay đổi styles thành Tailwind classes
  // const renderColoredText = (text: string) => {
  //   if (typeof text !== 'string') return null;
  //   const parts = text.split(/(\[.*?\])/g);
  //   return parts.map((part, index) => {
  //     const isHighlight = part.startsWith('[') && part.endsWith(']');
  //     return (
  //       <span key={index} className={isHighlight ? 'text-yellow-500 font-bold' : 'text-gray-400'}>
  //         {part.replace(/\[|\]/g, '')} {/* Loại bỏ dấu [] */}
  //       </span>
  //     );
  //   });
  // };

  if (!champ) {
    return (
      <div className="flex flex-1 justify-center items-center bg-[#2e2e3e] h-screen"> {/* Thêm h-screen để fill chiều cao */}
        <p className="text-white">Không tìm thấy tướng</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen mb-4"> {/* min-h-screen để đảm bảo chiều cao */}
      <h1 className="text-white p-4 bg-gray-900 mb-1 text-sm md:text-base">Chi Tiết Tướng</h1>
      <div ref={scrollRef} className="flex-1 overflow-y-auto"> {/* ScrollView được thay bằng div với overflow */}
        <div> {/* container */}
          <div className="mb-2"> {/* headerContainer */}
            <div
            className="bg-gray-900 pb-4 md:pb-8 relative w-full bg-cover bg-center flex items-start" // bg hình
          >
            {/* overlay đen mờ */}
            <div className="absolute inset-0 bg-opacity-50 z-10" />

            {/* Nội dung chính bên trái */}
            <div className="z-20 w-full">
              <div className="z-20 flex px-4 py-3 items-start w-full max-w-full">
                {/* Ảnh champion */}
                {champ.image && (
                  <ChampionImage
                    champImg={champ.image}
                    price={champ.price}
                    baseUrl={data.base_url}
                      className="w-14 h-14 mr-3 shrink-0"
                      alt={champ.name}
                  />
                )}

                {/* Nội dung: tên, traits, stats */}
                <div className="flex flex-col text-left w-full">
                  {/* Tên + Giá */}
                  <div className="flex items-center mb-1">
                    <p className="text-white font-bold text-sm md:text-base truncate">{champ.name}</p>
                    <div className="flex items-center gap-1 ml-2">
                      <GoldIcon />
                      <p className="text-yellow-400 font-bold text-sm">{champ.price}</p>
                    </div>
                  </div>

                  {/* Traits */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {(champ.traits || []).map((trait, i: number) => (
                      <div key={i} className="flex items-center">
                        <Image
                          src={data.base_url + 'synergys/' + trait.image}
                          alt={trait.name}
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                        <p className="ml-1 text-yellow-500 text-xs">{trait.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                </div>
                {/* Stats */}
                <div className="flex text-xs text-white w-full mt-2">
                  <div className="relative flex flex-col justify-center after:content-[''] after:absolute after:right-0 after:top-[10%] after:h-[80%] after:w-px after:bg-gray-500">
                  </div>
                  <div className="relative flex flex-col justify-center px-4 after:content-[''] after:absolute after:right-0 after:top-[10%] after:h-[80%] after:w-px after:bg-gray-500">
                    <span className="text-gray-300 mb-1">Vị trí trung bình</span>
                    <span className="font-semibold">{champ.average_position}</span>
                  </div>
                  <div className="relative flex flex-col justify-center px-4 after:content-[''] after:absolute after:right-0 after:top-[10%] after:h-[80%] after:w-px after:bg-gray-500">
                    <span className="text-gray-300 mb-1">Top 1</span>
                    <span className="font-semibold">{champ.top_1_rate}%</span>
                  </div>
                  <div className="relative flex flex-col justify-center px-4 after:content-[''] after:absolute after:right-0 after:top-[10%] after:h-[80%] after:w-px after:bg-gray-500">
                    <span className="text-gray-300 mb-1">Top 4</span>
                    <span className="font-semibold">{champ.top_4_rate}%</span>
                  </div>
                  <div className="flex flex-col justify-center px-4">
                    <span className="text-gray-300 mb-1">Tỉ lệ chọn</span>
                    <span className="font-semibold">{champ.battle}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 w-full md:flex overflow-x-auto divide-x divide-black">
              {[
                {
                  icon: <IconHealth className="w-4 h-4" />,
                  label: 'Máu',
                  value: Array.isArray(champ?.health)
                    ? champ.health.map((val) => parseInt(val.toString())).join('/')
                    : '?',
                  width: 'basis-48',
                  flex: 3,
                },
                {
                  icon: <IconAttackDamage className="w-4 h-4" />,
                  label: 'Sát thương đòn đánh',
                  value: Array.isArray(champ?.attack_damage) ? champ.attack_damage.join('/') : '?',
                  width: 'basis-44',
                  flex: 3,
                },
                {
                  icon: <IconDamagePerSecond className="w-4 h-4" />,
                  label: 'DPS',
                  value: Array.isArray(champ?.damage_per_second) ? champ.damage_per_second.join('/') : '?',
                  width: 'basis-40',
                  flex: 1,
                },
                {
                  icon: <IconAttackSpeed className="w-4 h-4" />,
                  label: 'Tốc độ đánh',
                  value: champ?.attack_speed ?? '?',
                  width: 'basis-32',
                  flex: 1,
                },
                {
                  icon: <IconArmor className="w-4 h-4" />,
                  label: 'Giáp',
                  value: champ?.armor ?? '?',
                  width: 'basis-28',
                  flex: 1,
                },
                {
                  icon: <IconMagicalResistance className="w-4 h-4" />,
                  label: 'Kháng phép',
                  value: champ?.magical_resistance ?? '?',
                  width: 'basis-28',
                  flex: 1,
                },
              ].map(({ icon, label, value, flex }, idx) => (
                <div
                  key={idx}
                  className={`flex-[${flex}] pt-2 px-4 md:px-2 xl:px-4 flex flex-col justify-center text-xs`}
                >
                  <div className="flex justify-between md:block">
                    <div className="flex items-center">
                      {icon}
                      <p className="text-white text-xs ml-2">{label}</p>
                    </div>
                    <p className="text-yellow-400 font-bold text-sm md:ml-6 mt-1">
                      {value}
                    </p>
                  </div>
                </div>
              ))}

              {/* Tầm đánh (range), cố định chiều ngang nhỏ */}
              <div className="flex-1 flex-shrink-0 py-2 px-4 md:px-2 xl:px-4 text-xs flex flex-col justify-between">
                <div className="flex items-center mt-2">
                  <IconAttackRange />
                  <p className="text-gray-300 ml-2 text-sm md:text-base">Tầm đánh</p>
                </div>

                {typeof champ?.skill_attack_range !== 'number' || isNaN(champ.skill_attack_range) ? (
                  <p className="text-white text-xs ml-auto md:ml-5 mt-1">?</p>
                ) : (
                  <div className="flex gap-1 ml-auto md:ml-5 mt-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div
                        key={value}
                        className={`w-2.5 h-2.5 rounded-full ${
                          value <= (champ.skill_attack_range as number) ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <SkillCard />

          <div className="mt-2"> {/* tableHeader */}
            <h2 className="text-white font-bold text-sm md:text-base mb-0 py-2 px-4 bg-gray-900">Trang bị khuyên dùng</h2>
          </div>
          <div className="bg-gray-900 text-sm md:text-base"> {/* container */}
            {/* Header */}
            <div className="flex py-2 bg-gray-800 border-b border-gray-700"> {/* headerRow */}
              <p className="flex-[0.5] text-center font-bold text-gray-400 text-xs">#</p>
              <p className="flex-2 text-center font-bold text-gray-400 text-xs">Trang bị</p>
              <p className="flex-1 text-center font-bold text-gray-400 text-xs">Vị trí</p>
              <p className="flex-1 text-center font-bold text-gray-400 text-xs">Top 4</p>
              <p className="flex-1 text-center font-bold text-gray-400 text-xs">Top 1</p>
            </div>

            {/* List Items */}
            {Array.isArray(champ?.items) && champ.items.map((item, index: number) => (
              <ItemRow key={index} item={item} index={index + 1} />
            ))}
          </div>

          <div className="mt-2"> {/* tableHeader */}
            <h2 className="text-white font-bold text-sm md:text-base mb-0 py-2 px-4 bg-gray-800">Tộc / Hệ Tướng</h2>
          </div>
          <div>
            {champ?.traits && champ.traits.length > 0 && (
              <div className="flex flex-wrap border-t border-l border-black">
                {champ.traits.map((trait, index: number) => (
                  <div
                    key={index}
                    className="w-full md:w-1/2 border-b border-r border-black"
                  >
                    {renderTrait(trait.id)}
                  </div>
                ))}

                {/* Nếu số lượng lẻ, thêm 1 placeholder để cân cột */}
                {champ.traits.length % 2 !== 0 && (
                  <div className="w-1/2 border-b border-r border-black bg-gray-900" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}