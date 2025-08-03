export const TABS = [
  { name: 'Home', label: 'Đội Hình Meta', path: '/', icon: 'home-outline' },
  { name: 'Bảng xếp hạng', label: 'Bảng Xếp Hạng', path: '/rankings', icon: 'book-outline' },
  { name: 'Tướng', label: 'Tướng', path: '/champions', icon: 'book-outline' },
  { name: 'Trang bị', label: 'Trang Bị', path: '/items', icon: 'book-outline' },
  { name: 'Tộc hệ', label: 'Tộc / Hệ', path: '/synergies', icon: 'book-outline' },
  { name: 'Lõi nâng cấp', label: 'Lõi Nâng Cấp', path: '/augments', icon: 'book-outline' },
  { name: 'Hướng dẫn', label: 'Hướng Dẫn Trò Chơi', path: '/instruct', icon: 'book-outline' },
];

export const PRICE_BORDER_COLORS = [
  "#9aa4af",
  "#00ae0a",
  "#0093ff",
  "#e537a2",
  "#eb9c00",
  "#eb9c00"
];

export const IMAGE_RANK_MAP: Record<string, string> = {
  'CHALLENGER': '/images/Challenger.webp',
  'GRANDMASTER': '/images/GrandMaster.webp',
  'MASTER': '/images/Master.webp',
  'DIAMOND': '/images/Diamond.webp',
  'EMERALD': '/images/Emerald.webp',
  'PLATINUM': '/images/Platinum.webp',
  'GOLD': '/images/Gold.webp',
  'SILVER': '/images/Silver.webp',
  'BRONZE': '/images/Bronze.webp',
  'IRON': '/images/Iron.webp',
};

export const REGION_OPTIONS = [
  { label: 'Vietnam', value: 'vn2' },
  { label: 'Brazil', value: 'br1' },
  { label: 'Europe Nordic & East', value: 'eun1' },
  { label: 'Europe West', value: 'euw1' },
  { label: 'Japan', value: 'jp1' },
  { label: 'Korea', value: 'kr' },
  { label: 'Latin America North', value: 'la1' },
  { label: 'Latin America South', value: 'la2' },
  { label: 'Middle East', value: 'me1' },
  { label: 'North America', value: 'na1' },
  { label: 'Oceania', value: 'oc1' },
  { label: 'Russia', value: 'ru' },
  { label: 'Singapore', value: 'sg2' },
  { label: 'Turkey', value: 'tr1' },
  { label: 'Taiwan', value: 'tw2' },
];

export const TIER_OPTIONS = [
  { label: 'Thách Đấu', value: 'CHALLENGER' },
  { label: 'Đại Cao Thủ', value: 'GRANDMASTER' },
  { label: 'Cao Thủ', value: 'MASTER' },
  { label: 'Kim Cương', value: 'DIAMOND' },
  { label: 'Ngọc Lục Bảo', value: 'EMERALD' },
  { label: 'Bạch Kim', value: 'PLATINUM' },
  { label: 'Vàng', value: 'GOLD' },
  { label: 'Bạc', value: 'SILVER' },
  { label: 'Đồng', value: 'BRONZE' },
  { label: 'Sắt', value: 'IRON' },
];

export const IMAGE_RANK_VIP_MAP = {
  'CHALLENGER': '/images/Challenger_png.png',
  'GRANDMASTER': '/images/Grandmaster_png.png',
  'MASTER': '/images/Master_png.png',
  'DIAMOND': '/images/Diamond_png.png',
  'EMERALD': '/images/Emerald_png.png',
  'PLATINUM': '/images/Platinum_png.png',
  'GOLD': '/images/Gold_png.png',
  'SILVER': '/images/Silver_png.png',
  'BRONZE': '/images/Bronze_png.png',
  'IRON': '/images/Iron_png.png',
};

export const NAME_RANK_MAP = {
  'CHALLENGER': 'Thách Đấu',
  'GRANDMASTER': 'Đại Cao Thủ',
  'MASTER': 'Cao Thủ',
  'DIAMOND': 'Kim Cương',
  'EMERALD': 'Ngọc Lục Bảo',
  'PLATINUM': 'Bạch Kim',
  'GOLD': 'Vàng',
  'SILVER': 'Bạc',
  'BRONZE': 'Đồng',
  'IRON': 'Sắt',
};

export const CEO_META_DATA = {
  menu: {
    title: 'Meta Đấu Trường Chân Lý mùa 15 | Cập nhật đội hình mạnh',
    description: 'Cập nhật meta mới nhất ĐTCL mùa 15, top đội hình mạnh, cách chơi, xoay bài và ghép đồ chuẩn.',
    keywords: 'ĐTCL, meta Đấu Trường Chân Lý, đội hình mạnh, cách chơi ĐTCL, ghép đồ ĐTCL, tướng ĐTCL, mẹo leo rank ĐTCL',
    openGraph: {
      title: 'Meta Đấu Trường Chân Lý mùa 15 | Cập nhật đội hình mạnh',
      description: 'Cập nhật meta mới nhất ĐTCL mùa 15, top đội hình mạnh, cách chơi, xoay bài và ghép đồ chuẩn.',
      url: 'https://dtclmeta.vn',
      siteName: 'DTCL Meta',
      images: [
        {
          url: 'https://dtclmeta.vn/images/banner.png',
          width: 1200,
          height: 630,
          alt: 'Meta Đấu Trường Chân Lý mùa 15',
        },
      ],
      locale: 'vi_VN',
      type: 'website',
    },
  },
  comps: {
    title: 'Đội Hình Mạnh Nhất Đấu Trường Chân Lý mùa 15 | Hướng Dẫn chơi ĐTCL',
    description:
      'Cập nhật meta mới nhất ĐTCL mùa 15, top đội hình mạnh, cách chơi, xoay bài và ghép đồ chuẩn.',
  },
  comp: {
    title: 'Đội Hình Mạnh Nhất Đấu Trường Chân Lý',
    description: 'Hướng dẫn chơi đội hình ĐTCL, cách chơi, xoay bài và ghép đồ chuẩn.',
  },
  rankings: {
    title: 'Bảng Xếp Hạng Đấu Trường Chân Lý',
    description: 'Xem bảng xếp hạng người chơi ĐTCL theo khu vực và thứ hạng.',
  },
  champions: {
    title: 'Tướng Đấu Trường Chân Lý',
    description: 'Thông tin chi tiết về các tướng trong ĐTCL, bao gồm kỹ năng, giá tiền và tộc hệ.',
  },
  champion: {
    title: 'Chi Tiết Tướng Đấu Trường Chân Lý',
    description: 'Thông tin chi tiết về tướng ĐTCL, bao gồm kỹ năng, giá tiền và tộc hệ.',
  },
  items: {
    title: 'Trang Bị Đấu Trường Chân Lý',
    description: 'Hướng dẫn ghép đồ và thông tin về các trang bị trong ĐTCL.',
  },
  synergies: {
    title: 'Tộc Hệ Đấu Trường Chân Lý',
    description: 'Thông tin về các tộc hệ trong ĐTCL, bao gồm hiệu ứng và cách kết hợp.',
  },
  augments: {
    title: 'Lõi Nâng Cấp Đấu Trường Chân Lý',
    description: 'Danh sách các lõi nâng cấp và cách sử dụng hiệu quả trong ĐTCL.',
  },
  instruct: {
    title: 'Hướng Dẫn Trò Chơi Đấu Trường Chân Lý',
    description: 'Hướng dẫn cách chơi ĐTCL, từ cơ bản đến nâng cao.',
  },
  summoners: {
    title: 'Thông Tin Người Chơi Đấu Trường Chân Lý',
    description: 'Tra cứu thông tin người chơi ĐTCL, bao gồm rank, xếp hạng, tướng và đội hình hay chơi, chi tiết trận đấu gần nhất.',
  },
}
