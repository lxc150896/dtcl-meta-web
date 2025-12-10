"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IMAGE_RANK_MAP, REGION_OPTIONS, TIER_OPTIONS } from "@/constants";
import { ChevronDown } from "lucide-react";

const BASE_URL_RANK = "https://tft.dakgg.io/api/v1/leaderboards/summoners";
const BASE_URL_VERSION = "https://tft.dakgg.io/api/v1/seasons";

type SummonerRanking = {
  gameName: string;
  tagLine: string;
  shard: string;
  profileIconUrl: string;
  tier: string;
  leaguePoints: number;
  wins: number;
  tops: number;
  plays: number;
};

export default function LeaderboardPage() {
  const router = useRouter();
  const [region, setRegion] = useState("vn2");
  const [tier, setTier] = useState("CHALLENGER");
  const [items, setItems] = useState<SummonerRanking[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [versions, setVersions] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(true);

  useEffect(() => {
    const fetchRanks = async () => {
      try {
        setLoading(true);
        setPage(1);

        const [versionRes, rankRes] = await Promise.all([
          fetch(BASE_URL_VERSION),
          fetch(`${BASE_URL_RANK}/${region}?hl=vi&tier=${tier}&queueId=1100&page=1&mode=ranked`),
        ]);

        const versionData = await versionRes.json();
        const rankData = await rankRes.json();

        setVersions(versionData.vn2);
        setItems(rankData.summonerRankings);
        if (!rankData || rankData.summonerRankings.length === 0) {
          setShowLoadMore(false);
        } else {
          setShowLoadMore(true);
        }
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRanks();
  }, [region, tier]);

  const handleLoadMore = async () => {
    try {
      setLoadMore(true);
      const nextPage = page + 1;
      setPage(nextPage);

      const res = await fetch(`${BASE_URL_RANK}/${region}?hl=vi&tier=${tier}&queueId=1100&page=${nextPage}`);
      const data = await res.json();
      if (!data || data.summonerRankings.length === 0) {
        setLoadMore(false);
        setShowLoadMore(false);
        return;
      }
      setItems(prev => [...prev, ...data.summonerRankings]);
    } catch {
    } finally {
      setLoadMore(false);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-3 bg-gray-900 gap-4 md:mb-0 mb-2">
        <h1 className="text-white bg-gray-900 mb-1 md:text-base text-sm">Bảng Xếp Hạng</h1>
        <div>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded md:text-sm text-xs cursor-pointer mr-4"
          >
            {REGION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded md:text-sm text-xs cursor-pointer"
          >
            {TIER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </header>

      {error ? (
        <div className="text-center py-10">Lỗi khi tải dữ liệu</div>
      ) : loading ? (
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 bg-gray-800">Mùa mới! không có người chơi ở rank này</div>
      ) : (
        <div>
          <div className="flex md:mx-0 px-2 gap-2 text-xs bg-gray-800 py-2 border-b border-[#333]">
            <div className="w-[5%] text-center">#</div>
            <div className="w-[40%] md:ml-8 ml-2">Người chơi</div>
            <div className="w-[10%] text-center">Bậc</div>
            <div className="w-[15%] text-center">LP</div>
            <div className="w-[15%] md:w-[10%] text-center">Top 1</div>
            <div className="w-[15%] md:w-[10%] text-center">Top 4</div>
            <div className="md:block hidden w-[10%] text-center">Trận</div>
          </div>

          {items.map((item, index) => (
            <div
              key={index}
              className="flex md:text-sm text-xs md:mx-0 px-2 gap-2 items-center py-2 bg-gray-900 border-b border-black hover:bg-gray-800 cursor-pointer"
              onClick={() => router.push(`/summoners?fullName=${item.gameName}-${item.tagLine}&name=${item.gameName}&tag=${item.tagLine}&region=${item.shard}&season=${versions[0]}`)}
            >
              <div className="w-[5%] text-center">{index + 1}</div>
              <div className="w-[40%] flex items-center gap-2">
                <img
                  src={item.profileIconUrl}
                  alt={`${item.gameName} ${item.tagLine}`}
                  width={28}
                  height={28}
                  className="md:w-8 md:h-8 w-6 h-6 rounded-full"
                />
                <span className="truncate md:text-sm text-xs">{item.gameName}#{item.tagLine}</span>
              </div>
              <div className="w-[10%] text-center">
                <img
                  src={IMAGE_RANK_MAP[item.tier]}
                  alt={item.tier}
                  width={36}
                  height={36}
                  className="md:w-10 md:h-10 w-6 h-6 rounded-full mx-auto"
                />
              </div>
              <div className="w-[15%] md:w-[10%] text-center">{item.leaguePoints}</div>
              <div className="w-[15%] md:w-[10%] text-center">{item.wins}</div>
              <div className="w-[15%] md:w-[10%] text-center">{item.tops}</div>
              <div className="md:block hidden w-[10%] text-center">{item.plays}</div>
            </div>
          ))}

          {loadMore && <div className="text-center py-4 text-sm">Đang tải thêm...</div>}
          {showLoadMore && <div className="pb-4">
            <button
              onClick={handleLoadMore}
              className="w-full flex justify-center items-center gap-2 bg-gray-800 px-4 py-2 hover:bg-[#555]"
            >
              <span>Xem thêm</span>
              <ChevronDown size={16} />
            </button>
          </div>
          }
        </div>
      )}
    </div>
  );
}
