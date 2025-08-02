'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import ChampionImage from './ChampionImage';
import Divider from './Divider';
import SynergyImage from './SynergyImage';
import { X } from 'lucide-react';

interface ItemImageProps {
  traitImg: string;
  baseUrl?: string;
  style?: React.CSSProperties;
  id?: string;
  count?: string;
  isPadding?: boolean;
  isGetApi?: boolean;
  subId?: string;
  traitDataCurr?: {
    id?: string;
    name?: string;
    image?: string;
    trait?: string;
    description?: string;
    description_detail?: string[][];
    champions?: { id: string; image: string }[];
    kich_hoat?: string;
  };
  className?: string;
}

const TraitImageModal: React.FC<ItemImageProps> = ({ traitImg, baseUrl, style, id, count, isPadding = true, isGetApi = true, subId, className }) => {
  const { data } = useData();
  const [selectedItem, setSelectedItem] = useState<{
    id?: string;
    name?: string;
    image?: string;
    trait?: string;
    description?: string;
    description_detail?: string[][];
    champions?: { id: string; image: string }[];
    kich_hoat?: string;
  } | null>(null);

  const getTrait = (id: string | undefined) => {
    if (!id) return;

    let champ = null;
    if (!data || !data.synergys) {
      setSelectedItem(null);
      return;
    }
    const synergys = data.synergys as Array<{ id: string; image: string; name?: string; trait?: string; description?: string; description_detail?: string[][]; champions?: { id: string; image: string }[]; kich_hoat?: string }>;
    if (isGetApi) {
      champ = synergys.find((item) => item.id === id);
    } else {
      champ = synergys.find((item) => item.image.includes(id ?? ''));
      if (!champ && subId) champ = synergys.find((synergy) => synergy.image.includes(subId.split('_')[1] ?? ''));
    }

    setSelectedItem(champ ?? null);
  };

  const getPrice = (champ_id: string) => {
    if (!champ_id || !data || !data.champions) return 1;
    const champions = data.champions as Array<{ id: string; price: number }>;
    const champ = champions.find((champ) => champ.id === champ_id);
    return champ ? champ.price : 1;
  };

  return (
    <>
      <button onClick={() => getTrait(id)} className={isPadding ? 'bg-neutral-950 px-2 py-1 rounded-xl flex items-center cursor-pointer' : ''}>
        <Image
          src={baseUrl ? `${baseUrl}synergys/${traitImg}` : traitImg}
          alt="trait"
          width={20}
          height={20}
          className={`cursor-pointer ${className}`}
          style={style}
        />
        {count && <span className="ml-1 text-[12px] text-[#ffb900]">{count}</span>}
      </button>

      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 bg-opacity-60 z-50">
          <div className="bg-black p-5 rounded-md w-[85%] max-w-md relative">
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-400 cursor-pointer"
              onClick={() => setSelectedItem(null)}
            >
              <X size={20} />
            </button>
            <div className="flex items-center mb-2 md:mb-4">
              <SynergyImage
                synergyImg={selectedItem?.image ?? ''}
                baseUrl={typeof data?.base_url === 'string' ? data.base_url : ''}
                style={{ borderRadius: 4, borderColor: '#ccc', borderWidth: 1 }}
                isPadding={false}
                className="w-10 h-10 md:w-12 md:h-12 mr-2 md:mr-8"
              />
              <div>
                <p className="font-bold text-sm md:text-base mb-0.5 text-white">{selectedItem?.name}</p>
                <p className="text-[#ffb900] text-xs">{selectedItem?.trait}</p>
              </div>
            </div>
            <p className="text-[#ccc] text-sm md:text-base mb-2 md:mb-4">{selectedItem?.description}</p>
            {selectedItem?.description_detail && selectedItem.description_detail.length > 0 && (
              <div className="mt-2">
                {selectedItem.description_detail.map((row: string[], rowIndex: number) => (
                  <div key={rowIndex} className="flex items-start mb-2">
                    <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center border border-[#ccc] mr-2 ${row[0] === selectedItem.kich_hoat ? 'bg-yellow-800' : ''}`}>
                      <span className="text-sm font-bold text-[#ccc]">{row[0]}</span>
                    </div>
                    <div className="flex-1 flex flex-wrap text-[#fff] text-sm md:text-base">
                      {row.slice(1).map((item: string, idx: number) => {
                        if (item === '.') return <span key={idx}>.</span>;

                        const showComma = idx !== 0 && row[idx + 1];

                        if (item.endsWith('.png')) {
                          return (
                            <Image
                              key={idx}
                              src={data?.base_url + 'damages/' + item}
                              alt="damage"
                              width={16}
                              height={16}
                              className="ml-1"
                            />
                          );
                        }

                        let displayText = item;
                        if (item === 'Exotech Item') displayText = 'Vật phẩm Exotech';
                        else if (item === 'Choose a weapon') displayText = 'Chọn vũ khí';
                        else if (item === 'Choose an ultimate weapon') displayText = 'Chọn vũ khí tối thượng';

                        return (
                          <span key={idx} className="ml-1">
                            {showComma ? ', ' : ''}
                            {displayText}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Divider />
            <div>
              <p className="text-white text-sm md:text-base mb-1">Tướng:</p>
              <div className="flex flex-wrap items-center">
                {selectedItem?.champions && selectedItem.champions.map((item: { id: string; image: string }, index: number) => (
                  <div key={index} className="mr-1 md:mr-2 mt-1 md:mt-2">
                    <ChampionImage
                      champImg={item.image}
                      price={getPrice(item.id)}
                      baseUrl={typeof data?.base_url === 'string' ? data.base_url : undefined}
                      className='mt-1 md:mt-2'
                    />
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setSelectedItem(null)} className="text-sm md:text-base mt-6 cursor-pointer text-white text-right w-full">
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TraitImageModal;
