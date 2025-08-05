"use client";

import { useState } from "react";
import Image from "next/image";
import SynergyImage from "@/components/ui/SynergyImage";
import ChampionImage from "@/components/ui/ChampionImage";
import Divider from "@/components/ui/Divider";
import { useData } from "@/context/DataContext";
import { Search } from "lucide-react";
import { search } from "@/utils";

interface Champion {
  id: string;
  image: string;
  price: number;
}

interface Synergy {
  id: string;
  image: string;
  kich_hoat: string;
  name: string;
  average_position: number;
  top_4_rate: number;
  top_1_rate: number;
  battle: number;
  trait?: string;
  description?: string;
  description_detail?: (string[])[];
  champions: Champion[];
}

export default function SynergysScreen() {
  const { data } = useData();
  const [synergys, setSynergys] = useState(data.synergys);
  const [selectedItem, setSelectedItem] = useState<Synergy | null>(null);

  const handleSearch = (text: string) => {
    const result = search(text, data.synergys, "name");
    setSynergys(result as Synergy[]);
  };

  const getPrice = (champ_id: string): number => {
    if (!champ_id) return 1;
    const champ = data.champions.find((champ: Champion) => champ.id === champ_id);
    return champ ? champ.price : 1;
  };

  return (
    <div className="min-h-screen mb-4">
      {/* Header Row */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-2 bg-gray-900 gap-4 mb-2 md:mb-0">
        {/* Phần tiêu đề */}
        <h1 className="text-white text-sm md:text-base font-bold">
          Danh Sách Tộc / Hệ
        </h1>

        {/* Phần ô tìm kiếm */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none cursor-pointer" />
          <input
            onChange={(e) => handleSearch(e.target.value)}
            name="search-champions"
            type="text"
            placeholder="Tìm tộc hệ..."
            className="bg-gray-800 border border-gray-700 text-white placeholder-gray-400 text-sm rounded-l block w-full pl-10 px-4 py-2"
          />
        </div>
      </header>
      <div className="grid grid-cols-[5%_50%_15%_15%_15%] md:grid-cols-[5%_40%_15%_15%_15%_10%] bg-gray-800 text-gray-300 text-xs md:text-sm font-bold py-2 text-center border-b border-black">
        <span className="ml-1">#</span>
        <span>Trang bị</span>
        <span>Vị trí</span>
        <span>Top 4</span>
        <span>Top 1</span>
        <span className="hidden md:block">Trận đấu</span>
      </div>

      {/* Data Rows */}
      {synergys.map((item, index) => (
        <div
          key={index}
          className="text-xs md:text-sm grid grid-cols-[5%_50%_15%_15%_15%] md:grid-cols-[5%_40%_15%_15%_15%_10%] items-center text-center py-2 border-b border-black bg-gray-900 hover:bg-[#3a3a46] cursor-pointer"
          onClick={() =>
            setSelectedItem({
              ...item,
              champions: (item.champions ?? []).map((champ) => ({
                ...champ,
                price: (champ as Champion).price ?? getPrice(champ.id),
              })),
            })
          }
        >
          <span className="text-white text-sm ml-1">{index + 1}</span>

          <div className="flex items-center gap-2 justify-start px-2">
            <SynergyImage synergyImg={item.image} baseUrl={data.base_url} alt={item.name} />
            <span
              className={`font-semibold rounded px-1 text-white bg-opacity-50 bg-[#666]`}
            >
              {item.kich_hoat}
            </span>
            <h2 className="font-semibold text-white truncate">
              {item.name}
            </h2>
          </div>

          <span className="text-gray-300">#{item.average_position}</span>
          <span className="text-gray-300">{item.top_4_rate}%</span>
          <span className="text-gray-300">{item.top_1_rate}%</span>
          <span className="text-gray-300 hidden md:block">{item.battle}</span>
        </div>
      ))}

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 bg-opacity-60 z-50">
          <div className="bg-black p-5 rounded-md w-[85%] max-w-md relative">
            <div className="flex items-center mb-4">
              <SynergyImage
                synergyImg={selectedItem?.image}
                baseUrl={data.base_url}
                className="w-8 h-8 md:w-12 md:h-12 rounded border border-gray-300 mr-2"
                alt={selectedItem?.name}
              />
              <div>
                <h3 className="text-white text-sm font-bold">{selectedItem?.name}</h3>
                <p className="text-yellow-500 text-xs">{selectedItem?.trait}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-3">{selectedItem?.description}</p>

            {selectedItem?.description_detail && selectedItem.description_detail.length > 0 && (
              <div className="space-y-2">
                {selectedItem.description_detail.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex items-start text-sm text-gray-300">
                    <div
                      className={`w-6 h-6 rounded-full border border-gray-300 text-xs flex items-center justify-center mr-2 bg-opacity-80 ${
                        {
                          1: "bg-gray-500",
                          4: "bg-yellow-700",
                          7: "bg-yellow-500",
                          10: "bg-purple-600",
                        }[row[0]] || "bg-gray-600"
                      }`}
                    >
                      {row[0]}
                    </div>
                    <div className="flex flex-wrap items-center text-xs gap-1">
                      {row.slice(1).map((item, idx) => {
                        if (item === ".") return <span key={idx}>.</span>;
                        if (item.endsWith(".png")) {
                          return (
                            <Image
                              key={idx}
                              src={`${data.base_url}damages/${item}`}
                              width={16}
                              height={16}
                              className="w-4 h-4 inline"
                              alt={item}
                              unoptimized
                            />
                          );
                        }
                        let displayText = item;
                        if (item === "Exotech Item") displayText = "Vật phẩm Exotech";
                        else if (item === "Choose a weapon") displayText = "Chọn vũ khí";
                        else if (item === "Choose an ultimate weapon")
                          displayText = "Chọn một vũ khí tối thượng";
                        return <span key={idx}>{displayText}</span>;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Divider />

            <div>
              <p className="text-white text-sm font-semibold mb-2">Tướng:</p>
              <div className="flex flex-wrap gap-2">
                {selectedItem?.champions.map((champ, index) => (
                  <ChampionImage
                    key={index}
                    champImg={champ.image}
                    price={getPrice(champ.id)}
                    baseUrl={data.base_url}
                    alt={champ.id.toString()}
                  />
                ))}
              </div>
            </div>

            <button onClick={() => setSelectedItem(null)} className="cursor-pointer text-white text-right mt-4 block ml-auto">
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
