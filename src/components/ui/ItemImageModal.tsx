'use client';

import { useData } from '@/context/DataContext';
import { useState } from 'react';
import Image from 'next/image';
import ChampionImage from './ChampionImage';
import Divider from './Divider';
import ItemImage from './ItemImage';
import { X } from 'lucide-react';

interface ItemImageProps {
  itemImg: string;
  baseUrl: string;
  style?: React.CSSProperties;
  id?: string;
  alt?: string;
}

const ItemImageModal: React.FC<ItemImageProps> = ({ itemImg, baseUrl, style, id, alt="Trang bị game đấu trường chân lý" }) => {
  const { data } = useData();
  type Item = {
    id: string;
    image?: string;
    name?: string;
    damage_modifier?: { image: string; damage: string }[];
    description?: string;
    item_components?: Array<{ image: string }>;
    champions?: Array<{ id: string; image: string }>;
  };
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const allItems: Item[] = data?.items ? Object.values(data.items).flat() as Item[] : [];

  const getItem = (id?: string) => {
    if (!id) return;
    const item = allItems.find((item) => item.id === id);
    setSelectedItem(item ?? null);
  };

  const getPrice = (champ_id: string) => {
    if (!data || !Array.isArray(data.champions)) return 1;
    const champ = (data.champions as Array<{ id: string; price?: number }>).find((champ) => champ.id === champ_id);
    return champ?.price ?? 1;
  };

  return (
    <>
      <button onClick={() => getItem(id)}>
        <Image
          src={`${baseUrl}items/${itemImg}`}
          alt={alt}
          width={32}
          height={32}
          style={style}
          className="cursor-pointer w-8 h-8 md:w-12 md:h-12"
        />
      </button>

      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 bg-opacity-60 z-50">
          <div className="bg-black p-4 md:p-5 rounded-md w-[85%] max-w-md relative">
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-400 cursor-pointer"
              onClick={() => setSelectedItem(null)}
            >
              <X size={20} />
            </button>
            <div className="flex">
              <ItemImage
                itemImg={selectedItem?.image ?? ''}
                baseUrl={typeof data?.base_url === 'string' ? data.base_url : ''}
                className='mr-2 w-10 h-10 md:w-12 md:h-12'
                alt={selectedItem?.name || 'Trang bị game đấu trường chân lý'}
              />
              <div>
                <h2 className="font-bold text-sm md:text-base mb-1">{selectedItem?.name}</h2>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedItem?.damage_modifier &&
                    selectedItem.damage_modifier.map((damage: { image: string; damage: string }, index: number) => (
                      <div key={index} className="flex items-center">
                        <Image
                          src={`${data?.base_url}damages/${damage.image}`}
                          alt={damage.damage}
                          width={16}
                          height={16}
                        />
                        <span className="text-xs md:text-sm mx-0 md:mx-1">{damage.damage}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <p className="text-sm md:text-base text-gray-300 mt-3">{selectedItem?.description}</p>
            <Divider />

            {Array.isArray(selectedItem?.item_components) && selectedItem.item_components.length > 0 && (
              <div className="flex items-center flex-wrap mt-2 mb-4 gap-2">
                <span className="text-sm md:text-base">Công thức</span>
                {selectedItem.item_components.map((item: { image: string }, index: number) => (
                  <div key={index} className="flex items-center">
                    {index === 1 && <span className="mx-2 font-bold">+</span>}
                    <ItemImage
                      itemImg={item.image}
                      baseUrl={typeof data?.base_url === 'string' ? data.base_url : ''}
                      className='w-6 h-6'
                      alt={selectedItem.name}
                    />
                  </div>
                ))}
              </div>
            )}

            <div>
              <h3 className="text-sm md:text-base mb-0 md:mb-2">Tướng khuyên dùng:</h3>
              <div className="flex gap-2 flex-wrap">
                {Array.isArray(selectedItem?.champions) &&
                  selectedItem.champions.map((item: { id: string; image: string }, index: number) => (
                    <div key={index}>
                      <ChampionImage
                        champImg={item.image}
                        price={getPrice(item.id)}
                        baseUrl={typeof data?.base_url === 'string' ? data.base_url : undefined}
                        className='mt-2'
                        alt={selectedItem.name}
                      />
                    </div>
                  ))}
              </div>
            </div>

            <button
              className="text-sm md:text-base mt-5 text-right text-white underline block ml-auto cursor-pointer"
              onClick={() => setSelectedItem(null)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemImageModal;
