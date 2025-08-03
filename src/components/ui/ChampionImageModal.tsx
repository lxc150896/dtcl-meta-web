"use client";

import { useState } from "react";
import Image from "next/image";
import ChampionImage from "./ChampionImage";
import Divider from "./Divider";
import { useData } from "@/context/DataContext";
import ItemImage from "./ItemImage";
import GoldIcon from "@/assets/icons/Gold";
import { X } from "lucide-react";

interface ChampionImageProps {
  champImg: string;
  price: number;
  baseUrl?: string;
  style?: React.CSSProperties;
  id?: string;
  apiUrl?: boolean;
  className?: string;
  alt?: string;
}

interface Champion {
  id: string;
  name: string;
  image: string;
  price: number;
  traits?: { name: string; image: string }[];
  description?: string;
  items?: { image: string }[];
}

const ChampionImageModal: React.FC<ChampionImageProps> = ({ champImg, price, id, style, apiUrl = false, className='', alt="" }) => {
  const { data } = useData();
  const [selectedItem, setSelectedItem] = useState<Champion | null>(null);

  const getChamp = (chamId: string | undefined) => {
    if (!chamId || !data || !Array.isArray(data.champions)) return;
    const champ = (data.champions as Champion[]).find((item) => item.id === chamId);
    setSelectedItem(champ ?? null);
  };

  const renderColoredText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\[.*?\])/g);
    return parts.map((part, index) => {
      const isHighlight = part.startsWith("[") && part.endsWith("]");
      return (
        <span
          key={index}
          className={isHighlight ? "text-gold font-bold" : "text-gray-300 text-sm"}
        >
          {part}
        </span>
      );
    });
  };

  return (
    <>
      <button onClick={() => getChamp(id)}>
        <ChampionImage
          champImg={champImg}
          baseUrl={!apiUrl ? data?.base_url as string | undefined : undefined}
          price={price}
          style={style}
          className={className}
          alt={alt}
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
              <ChampionImage
                champImg={selectedItem?.image}
                baseUrl={data?.base_url as string}
                price={selectedItem?.price}
                className="mr-2 w-10 h-10 md:w-12 md:h-12"
                alt={selectedItem?.name || ""}
              />
              <div>
                <div className="flex items-center">
                  <h2 className="text-white font-bold text-sm md:text-base ml-1 md:ml-2">{selectedItem?.name}</h2>
                  <div className="flex items-center gap-1 ml-2">
                    <GoldIcon />
                    <span className="text-yellow-400 font-bold text-sm">{selectedItem?.price}</span>
                  </div>
                </div>
                {selectedItem?.traits && selectedItem.traits.length > 0 && (
                  <div className="flex flex-wrap items-center mt-0 md:mt-2 ml-1 md:ml-2">
                    {selectedItem.traits.map((trait: { name: string; image: string }, i: number) => (
                      <div key={i} className="flex items-center mt-1 mr-2">
                        <Image
                          src={data?.base_url + "synergys/" + trait.image}
                          alt={trait.name}
                          width={16}
                          height={16}
                        />
                        <span className="text-yellow-500 text-xs ml-1">{trait.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="text-sm md:text-base text-gray-300 mt-3 mb-4">
              {renderColoredText(selectedItem?.description ?? "")}
            </div>

            <Divider />

            {(selectedItem?.items?.length ?? 0) > 0 && (
              <div className="mt-4">
                <p className="text-white text-sm md:text-base mb-2">Trang bị khuyên dùng:</p>
                <div className="flex items-center">
                  {selectedItem.items?.map((item: { image: string }, index: number) => (
                    <div key={index} className="mr-2">
                      <ItemImage
                        itemImg={item.image}
                        baseUrl={data?.base_url as string}
                        className="mt-2"
                        alt={selectedItem?.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button onClick={() => setSelectedItem(null)} className="text-sm md:text-bsae cursor-pointer text-white text-right mt-4 block ml-auto">
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChampionImageModal;
