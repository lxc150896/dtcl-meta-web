'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import ChampionImage from '@/components/ui/ChampionImage';
import Divider from '@/components/ui/Divider';
import ItemImage from '@/components/ui/ItemImage';
import { useData } from '@/context/DataContext';
import CustomTab from '@/components/CustomTab';

interface Champion {
  id: string | number;
  image: string;
  price?: number;
}
  
export default function ItemsPage() {
  const { data } = useData();
  const [activeTab, setActiveTab] = useState(0);
  interface Item {
    id: string | number;
    image: string;
    name: string;
    average_position: number | string;
    top_4_rate: number | string;
    top_1_rate: number | string;
    battle: number | string;
    description: string;
    damage_modifier: Array<{ image: string; damage: string | number }>;
    item_components: Array<{ image: string }>;
    champions: Array<{ id: string | number; image: string }>;
  }

  const [items, setItems] = useState<Array<Item>>(Array.isArray(data.items.trang_bi_anh_sang) ? data.items.trang_bi_anh_sang : []);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const searchRef = useRef<{ clearSearch?: () => void } | null>(null);

  const tabLabels = [
    'Trang bị ánh sáng',
    'Trang bị tạo tác',
    'Cốt lõi',
    'Ấn',
    'Trang bị hỗ trợ',
    'Tộc / Hệ',
    'Trang bị thành phần'
  ];

  const handleTab = (index: number) => {
    searchRef.current?.clearSearch?.();
    setActiveTab(index);
    const tabs = [
      'trang_bi_anh_sang',
      'trang_bi_tao_tac',
      'cot_loi',
      'an',
      'trang_bi_ho_tro',
      'toc_he',
      'trang_bi_thanh_phan',
    ] as const;
    const nextItems = data.items[tabs[index]];
    setItems(Array.isArray(nextItems) ? nextItems : []);
  };

  // const handleSearch = (text, screen) => {
  //   if (screen !== 'items') return;
  //   const tabs = [
  //     'trang_bi_anh_sang',
  //     'trang_bi_tao_tac',
  //     'cot_loi',
  //     'an',
  //     'trang_bi_ho_tro',
  //     'toc_he',
  //     'trang_bi_thanh_phan',
  //   ];
  //   const results = search(text, data.items[tabs[activeTab]], 'name');
  //   setItems(results);
  // };

  const getPrice = (champId: string | number): number => {
    const champ: Champion | undefined = data.champions.find((c: Champion) => c.id === champId);
    return champ?.price ?? 1;
  };

  return (
    <div className="min-h-screen text-white">
      <h1 className="text-white p-4 bg-gray-900 mb-1">Danh Sách Trang Bị Đấu Trường Chân Lý</h1>
      <div className="">
        <CustomTab tabs={tabLabels} activeTab={activeTab} onChange={handleTab} />
        {/* <div className="ml-auto p-2 bg-gray-700">
          <input
            type="text"
            placeholder="Tìm kiếm trang bị..."
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
            onChange={(e) => handleSearch(e.target.value, 'items')}
          />
        </div> */}
      </div>

      <div className="w-full overflow-x-auto">
        <div className="divide-y divide-[#444]">
          {/* Header */}
          <div className="grid grid-cols-[5%_40%_17%_20%_18%] md:grid-cols-[5%_40%_15%_15%_15%_10%] text-center bg-gray-800 text-xs text-gray-300 font-bold py-2">
            <span className="ml-1">#</span>
            <div>Trang bị</div>
            <div>Vị trí</div>
            <div>Top 4</div>
            <div>Top 1</div>
            <div className="hidden md:block">Trận đấu</div>
          </div>

          {/* Items */}
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedItem(item)}
              className="text-xs text-center md:text-sm grid grid-cols-[5%_40%_17%_20%_18%] md:grid-cols-[5%_40%_15%_15%_15%_10%] items-center py-3 border-b border-[#000] bg-gray-900 cursor-pointer hover:bg-[#3a3a46]"
            >
              <span className="md:text-sm text-xs ml-1">{index + 1}</span>
              <div className="flex items-center gap-2 justify-start px-2">
                <ItemImage itemImg={item.image} baseUrl={data.base_url} alt={item.name} className="cursor-pointer w-8 h-8 md:w-10 md:h-10 "/>
                <h1 className="font-semibold truncate md:text-sm text-xs">{item.name}</h1>
              </div>
              <div>#{item.average_position}</div>
              <div>{item.top_4_rate}%</div>
              <div>{item.top_1_rate}%</div>
              <div className="hidden md:block">{item.battle}</div>
            </div>
          ))}
        </div>
      </div>
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 bg-opacity-60 z-50">
          <div className="bg-black md:p-5 p-4 rounded-md w-[85%] max-w-md relative">
            <div className="flex items-start md:gap-4 gap-2 mb-4">
              <ItemImage itemImg={selectedItem.image} baseUrl={data.base_url} alt={selectedItem.name} className="md:w-12 md:h-12 w-10 h-10" />
              <div>
                <div className="font-bold mb-1 md:text-base text-sm">{selectedItem.name}</div>
                <div className="flex flex-wrap gap-2 items-center">
                  {selectedItem.damage_modifier.map((dmg, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <Image
                        src={`${data.base_url}damages/${dmg.image}`}
                        width={24}
                        height={24}
                        className="md:w-4 md:h-4 w-3 h-3"
                        alt={dmg.damage.toString() + 'damage'}
                      />
                      <span className="text-sm md:text-base">{dmg.damage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-4 text-sm md:text-base">{selectedItem.description}</p>
            <Divider />

            {selectedItem.item_components.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 mt-4">
                <span className="text-white">Công thức:</span>
                {selectedItem.item_components.map((comp, i) => (
                  <div key={i} className="flex">
                    {i === 1 && <span className="font-bold mr-2">+</span>}
                    <ItemImage
                      itemImg={comp.image}
                      baseUrl={data.base_url}
                      className="w-8 h-8"
                      alt={selectedItem.name}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4">
              <div className="text-white mb-2 text-sm md:text-base">Tướng khuyên dùng:</div>
              <div className="flex gap-2 flex-wrap">
                {selectedItem.champions.map((champ, i) => (
                  <ChampionImage
                    key={i}
                    champImg={champ.image}
                    price={getPrice(champ.id)}
                    baseUrl={data.base_url}
                    alt={champ.id.toString()}
                  />
                ))}
              </div>
            </div>

            <button onClick={() => setSelectedItem(null)} className="md:text-base text-sm cursor-pointer text-white text-right mt-4 block ml-auto">
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
