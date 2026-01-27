export type Language = 'en' | 'vi' | 'ja';

export interface Translations {
  common: {
    version: string;
    error: string;
    networkError: string;
    loading: string;
  };
  header: {
    searchPlaceholder: string;
    searchError: string;
    searchExample: string;
  };
  tabs: {
    home: string;
    rankings: string;
    champions: string;
    items: string;
    synergies: string;
    augments: string;
    instruct: string;
  };
  language: {
    en: string;
    vi: string;
    ja: string;
  };
  instruct: {
    title: string;
    tabs: {
      items: string;
      rounds: string;
      portals: string;
      gold: string;
      damage: string;
    };
    itemsTable: string;
    itemsTableAlt: string;
    rollRate: string;
    level: string;
    gold: string;
    round: string;
    damageFormula: string;
  };
  comps: {
    searchPlaceholder: string;
    notFound: string;
    averagePosition: string;
    top1: string;
    top4: string;
    pickRate: string;
    detail: string;
    detailButton: string;
    championsByPrice: string;
    goldPrice: string;
    mainChampions: string;
  };
  validation: {
    invalidFormat: string;
    missingName: string;
    missingTag: string;
  };
  tags: {
    hard: string;
    easy: string;
    normal: string;
  };
  ranks: {
    challenger: string;
    grandmaster: string;
    master: string;
    diamond: string;
    emerald: string;
    platinum: string;
    gold: string;
    silver: string;
    bronze: string;
    iron: string;
  };
  alt: {
    logo: string;
    downloadApp: string;
    googlePlay: string;
    appStore: string;
    item: string;
    synergy: string;
    augment: string;
    gameGuide: string;
    player: string;
    strongestItem: string;
    dtcl: string;
    buildGuide: string;
    buildGuideEarly: string;
    buildGuideMid: string;
    buildGuideLate: string;
  };
  augments: {
    title: string;
    searchPlaceholder: string;
    silver: string;
    gold: string;
    diamond: string;
    augment: string;
    detail: string;
  };
  synergies: {
    champions: string;
    exotechItem: string;
    chooseWeapon: string;
    chooseUltimateWeapon: string;
    title: string;
    searchPlaceholder: string;
    items: string;
    position: string;
    battles: string;
    close: string;
  };
  camps: {
    averagePosition: string;
    pickRate: string;
    recommendedChampions: string;
    winRate: string;
    combineItems: string;
    buildComps: string;
    buildEarly: string;
    buildMid: string;
    buildLate: string;
    recommendedItems: string;
    battles: string;
    techUpgrade: string;
    loading: string;
    notFound: string;
  };
    items: {
      title: string;
      searchPlaceholder: string;
      searchPlaceholderMobile: string;
      items: string;
      position: string;
      battles: string;
      lightItems: string;
      artifactItems: string;
      core: string;
      seal: string;
      componentItems: string;
      formula: string;
      recommendedChampions: string;
      close: string;
    };
  champions: {
    title: string;
    searchPlaceholder: string;
    champion: string;
    detailTitle: string;
    skill: string;
    averagePosition: string;
    pickRate: string;
    health: string;
    attackDamage: string;
    attackSpeed: string;
    armor: string;
    magicResist: string;
    attackRange: string;
    recommendedItems: string;
    traits: string;
    notFound: string;
  };
    summoners: {
      overview: string;
      matchHistory: string;
      error: string;
      notFound: string;
      ranking: string;
      top1Games: string;
      top4Games: string;
      totalGames: string;
      top1Rate: string;
      top4Rate: string;
      avgRank: string;
      recent20Games: string;
      average: string;
      popularChampions: string;
      champion: string;
      games: string;
      avgRankLabel: string;
      top1RateLabel: string;
      top4RateLabel: string;
      popularTraits: string;
      trait: string;
      saveComp: string;
      player: string;
      traitsLabel: string;
      championsLabel: string;
      stats: string;
    };
  rankings: {
    title: string;
    error: string;
    noPlayers: string;
    player: string;
    rank: string;
    games: string;
    loadingMore: string;
    viewMore: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      version: 'Version',
      error: 'Error',
      networkError: 'Network Error!',
      loading: 'Loading...',
    },
    header: {
      searchPlaceholder: 'In-game Name + #Tag (e.g., EA7 Gnut#2004)',
      searchError: 'Please enter the correct format: Name#Tag (e.g., EAGnut#2004)',
      searchExample: 'In-game Name + #Tag (e.g., EA7 Gnut#2004)',
    },
    tabs: {
      home: 'Meta Comps',
      rankings: 'Rankings',
      champions: 'Champions',
      items: 'Items',
      synergies: 'Traits',
      augments: 'Augments',
      instruct: 'Game Guide',
    },
    language: {
      en: 'English',
      vi: 'Tiếng Việt',
      ja: '日本語',
    },
    instruct: {
      title: 'Game Guide',
      tabs: {
        items: 'Items & Roll',
        rounds: 'Rounds',
        portals: 'Portals',
        gold: 'Gold & XP',
        damage: 'Damage Formula',
      },
      itemsTable: 'Items Table',
      itemsTableAlt: 'TFT Items Table Season 15',
      rollRate: 'Roll Rate',
      level: 'Level',
      gold: 'Gold',
      round: 'Round',
      damageFormula: 'Damage per remaining champions + Damage per round = Damage per battle',
    },
    comps: {
      searchPlaceholder: 'Search comps...',
      notFound: 'No comps found!',
      averagePosition: 'Average Position',
      top1: 'Top 1',
      top4: 'Top 4',
      pickRate: 'Pick Rate',
      detail: 'Detail',
      detailButton: 'Comp Details',
      championsByPrice: 'Main Champions by Price',
      goldPrice: 'Gold',
      mainChampions: 'Main Champions',
    },
    validation: {
      invalidFormat: 'Please enter the correct format (e.g., EA7 Gnut#2004)',
      missingName: 'Please enter name before #',
      missingTag: 'Please enter tag after #',
    },
    tags: {
      hard: 'Hard',
      easy: 'Easy',
      normal: 'Normal',
    },
    ranks: {
      challenger: 'Challenger',
      grandmaster: 'Grandmaster',
      master: 'Master',
      diamond: 'Diamond',
      emerald: 'Emerald',
      platinum: 'Platinum',
      gold: 'Gold',
      silver: 'Silver',
      bronze: 'Bronze',
      iron: 'Iron',
    },
    alt: {
      logo: 'DTCL Logo',
      downloadApp: 'Download App',
      googlePlay: 'Download on Google Play',
      appStore: 'Download on App Store',
      item: 'TFT Item',
      synergy: 'TFT Trait',
      augment: 'TFT Augment',
      gameGuide: 'Game Guide',
      player: 'Player',
      strongestItem: 'Strongest Item',
      dtcl: 'Teamfight Tactics',
      buildGuide: 'Build Guide',
      buildGuideEarly: 'Early Game Build Guide',
      buildGuideMid: 'Mid Game Build Guide',
      buildGuideLate: 'Late Game Build Guide',
    },
    augments: {
      title: 'Augments',
      searchPlaceholder: 'Search augments...',
      silver: 'Silver',
      gold: 'Gold',
      diamond: 'Diamond',
      augment: 'Augment',
      detail: 'Detail',
    },
    synergies: {
      champions: 'Champions:',
      exotechItem: 'Exotech Item',
      chooseWeapon: 'Choose a weapon',
      chooseUltimateWeapon: 'Choose an ultimate weapon',
      title: 'Traits List',
      searchPlaceholder: 'Search traits...',
      items: 'Items',
      position: 'Position',
      battles: 'Battles',
      close: 'Close',
    },
    camps: {
      averagePosition: 'Average Position',
      pickRate: 'Pick Rate',
      recommendedChampions: 'Recommended Champions',
      winRate: 'Win Rate',
      combineItems: 'Combine Items',
      buildComps: 'Build Comps',
      buildEarly: 'Early Game Build',
      buildMid: 'Mid Game Build',
      buildLate: 'Late Game Build',
      recommendedItems: 'Recommended Items',
      battles: 'Battles',
      techUpgrade: 'Tech Upgrade',
      loading: 'Loading...',
      notFound: 'Champion data not found.',
    },
    items: {
      title: 'Items List',
      searchPlaceholder: 'Search items...',
      searchPlaceholderMobile: 'Search items...',
      items: 'Items',
      position: 'Position',
      battles: 'Battles',
      lightItems: 'Light Items',
      artifactItems: 'Artifact Items',
      core: 'Core',
      componentItems: 'Component Items',
      seal: 'Seal',
      formula: 'Formula:',
      recommendedChampions: 'Recommended Champions:',
      close: 'Close',
    },
    champions: {
      title: 'Champions List',
      searchPlaceholder: 'Search champions...',
      champion: 'Champion',
      detailTitle: 'Champion Details',
      skill: 'Skill',
      averagePosition: 'Average Position',
      pickRate: 'Pick Rate',
      health: 'Health',
      attackDamage: 'Attack Damage',
      attackSpeed: 'Attack Speed',
      armor: 'Armor',
      magicResist: 'Magic Resist',
      attackRange: 'Attack Range',
      recommendedItems: 'Recommended Items',
      traits: 'Champion Traits',
      notFound: 'Champion not found',
    },
    summoners: {
      overview: 'Overview',
      matchHistory: 'Match History',
      error: 'Error calling API',
      notFound: 'Player not found or connection error',
      ranking: 'Ranking',
      top1Games: 'Top 1 Games',
      top4Games: 'Top 4 Games',
      totalGames: 'Total Games',
      top1Rate: 'Top 1 Rate',
      top4Rate: 'Top 4 Rate',
      avgRank: 'Average Rank',
      recent20Games: 'Recent 20 Games',
      average: 'Average',
      popularChampions: 'Popular Champions',
      champion: 'Champion',
      games: 'Games',
      avgRankLabel: 'Avg Rank',
      top1RateLabel: 'TL.Top 1',
      top4RateLabel: 'TL.Top 4',
      popularTraits: 'Popular Traits',
      trait: 'Trait',
      saveComp: 'Save Comp',
      player: 'Player',
      traitsLabel: 'Traits',
      championsLabel: 'Champions',
      stats: 'Stats',
    },
    rankings: {
      title: 'Rankings',
      error: 'Error loading data',
      noPlayers: 'New season! No players at this rank',
      player: 'Player',
      rank: 'Rank',
      games: 'Games',
      loadingMore: 'Loading more...',
      viewMore: 'View More',
    },
  },
  vi: {
    common: {
      version: 'Phiên bản',
      error: 'Lỗi',
      networkError: 'Lỗi mạng!',
      loading: 'Đang tải...',
    },
    header: {
      searchPlaceholder: 'Tên In-game + #Tag (VD: EA7 Gnut#2004)',
      searchError: 'Vui lòng nhập đúng định dạng: Tên#Tag (VD: EAGnut#2004)',
      searchExample: 'Tên In-game + #Tag (VD: EA7 Gnut#2004)',
    },
    tabs: {
      home: 'Đội Hình Meta',
      rankings: 'Bảng Xếp Hạng',
      champions: 'Tướng',
      items: 'Trang Bị',
      synergies: 'Tộc / Hệ',
      augments: 'Lõi Nâng Cấp',
      instruct: 'Hướng Dẫn Trò Chơi',
    },
    language: {
      en: 'English',
      vi: 'Tiếng Việt',
      ja: '日本語',
    },
    instruct: {
      title: 'Hướng dẫn chơi game',
      tabs: {
        items: 'Trang bị & roll',
        rounds: 'Vòng đấu',
        portals: 'Vòng kỳ ngộ',
        gold: 'Vàng & Kinh nghiệm',
        damage: 'Công thức sát thương',
      },
      itemsTable: 'Bảng trang bị',
      itemsTableAlt: 'Bảng trang bị ĐTCL mùa 15',
      rollRate: 'Tỷ lệ roll',
      level: 'Cấp',
      gold: 'Vàng',
      round: 'Vòng',
      damageFormula: 'Sát thương theo số tướng còn sống + Sát thương mỗi vòng = Sát thương mỗi trận đấu',
    },
    comps: {
      searchPlaceholder: 'Tìm kiếm đội hình...',
      notFound: 'Không Tìm thấy đội hình!',
      averagePosition: 'Vị trí trung bình',
      top1: 'Top 1',
      top4: 'Top 4',
      pickRate: 'Tỉ lệ chọn',
      detail: 'Chi tiết',
      detailButton: 'Chi tiết đội hình',
      championsByPrice: 'Tướng chủ lực theo giá tiền',
      goldPrice: 'vàng',
      mainChampions: 'Tướng chủ lực',
    },
    validation: {
      invalidFormat: 'Vui lòng nhập đúng định (vd: EA7 Gnut#2004)',
      missingName: 'Vui lòng nhập tên trước dấu #',
      missingTag: 'Vui lòng nhập tag sau dấu #',
    },
    tags: {
      hard: 'Khó',
      easy: 'Dễ',
      normal: 'Trung Bình',
    },
    ranks: {
      challenger: 'Thách Đấu',
      grandmaster: 'Đại Cao Thủ',
      master: 'Cao Thủ',
      diamond: 'Kim Cương',
      emerald: 'Ngọc Lục Bảo',
      platinum: 'Bạch Kim',
      gold: 'Vàng',
      silver: 'Bạc',
      bronze: 'Đồng',
      iron: 'Sắt',
    },
    alt: {
      logo: 'Logo ĐTCL',
      downloadApp: 'Tải ứng dụng',
      googlePlay: 'Tải trên Google Play',
      appStore: 'Tải trên App Store',
      item: 'Trang bị game đấu trường chân lý',
      synergy: 'Tộc hệ game đấu trường chân lý',
      augment: 'Lõi nâng cấp game đấu trường chân lý',
      gameGuide: 'Hướng dẫn chơi game ĐTCL',
      player: 'Người chơi',
      strongestItem: 'Trang bị mạnh nhất đấu trường chân lý',
      dtcl: 'Đấu Trường Chân Lý',
      buildGuide: 'Hướng dẫn build đội hình',
      buildGuideEarly: 'Hướng dẫn build đội hình đầu trận ĐTCL mùa 15',
      buildGuideMid: 'Hướng dẫn build đội hình giữa trận ĐTCL mùa 15',
      buildGuideLate: 'Hướng dẫn build đội hình cuối trận ĐTCL mùa 15',
    },
    augments: {
      title: 'Lõi nâng cấp',
      searchPlaceholder: 'Tìm trang bị...',
      silver: 'Bạc',
      gold: 'Vàng',
      diamond: 'Kim Cương',
      augment: 'Lõi nâng cấp',
      detail: 'Chi tiết',
    },
    synergies: {
      champions: 'Tướng:',
      exotechItem: 'Vật phẩm Exotech',
      chooseWeapon: 'Chọn vũ khí',
      chooseUltimateWeapon: 'Chọn một vũ khí tối thượng',
      title: 'Danh Sách Tộc / Hệ',
      searchPlaceholder: 'Tìm tộc hệ...',
      items: 'Trang bị',
      position: 'Vị trí',
      battles: 'Trận đấu',
      close: 'Đóng',
    },
    camps: {
      averagePosition: 'Vị trí trung bình',
      pickRate: 'Tỉ lệ chọn',
      recommendedChampions: 'Tướng khuyên dùng',
      winRate: 'Tỉ lệ thắng',
      combineItems: 'Ghép trang bị',
      buildComps: 'Xây dựng đội hình',
      buildEarly: 'Xây dựng đội hình đầu trận',
      buildMid: 'Xây dựng đội hình giữa trận',
      buildLate: 'Xây dựng đội hình cuối trận',
      recommendedItems: 'Trang bị khuyên dùng',
      battles: 'Trận',
      techUpgrade: 'Nâng cấp công nghệ',
      loading: 'Đang tải...',
      notFound: 'Không tìm thấy dữ liệu tướng.',
    },
    items: {
      title: 'Danh Sách Trang Bị',
      searchPlaceholder: 'Tìm trang bị...',
      searchPlaceholderMobile: 'Tìm kiếm trang bị...',
      items: 'Trang bị',
      position: 'Vị trí',
      battles: 'Trận đấu',
      lightItems: 'Trang bị ánh sáng',
      artifactItems: 'Trang bị tạo tác',
      core: 'Cốt lõi',
      componentItems: 'Trang bị thành phần',
      seal: 'Ấn',
      formula: 'Công thức:',
      recommendedChampions: 'Tướng khuyên dùng:',
      close: 'Đóng',
    },
    champions: {
      title: 'Danh Sách Tướng',
      searchPlaceholder: 'Tìm kiếm tướng...',
      champion: 'Tướng',
      detailTitle: 'Chi Tiết Tướng',
      skill: 'Kỹ năng',
      averagePosition: 'Vị trí trung bình',
      pickRate: 'Tỉ lệ chọn',
      health: 'Máu',
      attackDamage: 'Sát thương đòn đánh',
      attackSpeed: 'Tốc độ đánh',
      armor: 'Giáp',
      magicResist: 'Kháng phép',
      attackRange: 'Tầm đánh',
      recommendedItems: 'Trang bị khuyên dùng',
      traits: 'Tộc / Hệ Tướng',
      notFound: 'Không tìm thấy tướng',
    },
    summoners: {
      overview: 'Tổng quan',
      matchHistory: 'Lịch sử đấu',
      error: 'Có lỗi khi gọi API',
      notFound: 'Không tìm thấy người chơi hoặc lỗi kết nối',
      ranking: 'Xếp hạng',
      top1Games: 'Số trận Top 1',
      top4Games: 'Số trận Top 4',
      totalGames: 'Tổng số trận',
      top1Rate: 'Tỷ lệ Top 1',
      top4Rate: 'Tỷ lệ Top 4',
      avgRank: 'Hạng trung bình',
      recent20Games: '20 trận gần nhất',
      average: 'Trung Bình',
      popularChampions: 'Tướng hay dùng',
      champion: 'Tướng',
      games: 'Số Trận',
      avgRankLabel: 'Hạng TB',
      top1RateLabel: 'TL.Top 1',
      top4RateLabel: 'TL.Top 4',
      popularTraits: 'Tộc / Hệ hay dùng',
      trait: 'Tộc / Hệ',
      saveComp: 'Lưu đội hình',
      player: 'Người chơi',
      traitsLabel: 'Tộc / Hệ',
      championsLabel: 'Tướng',
      stats: 'Thống kê',
    },
    rankings: {
      title: 'Bảng Xếp Hạng',
      error: 'Lỗi khi tải dữ liệu',
      noPlayers: 'Mùa mới! không có người chơi ở rank này',
      player: 'Người chơi',
      rank: 'Bậc',
      games: 'Trận',
      loadingMore: 'Đang tải thêm...',
      viewMore: 'Xem thêm',
    },
  },
  ja: {
    common: {
      version: 'バージョン',
      error: 'エラー',
      networkError: 'ネットワークエラー！',
      loading: '読み込み中...',
    },
    header: {
      searchPlaceholder: 'ゲーム内名前 + #タグ (例: EA7 Gnut#2004)',
      searchError: '正しい形式で入力してください: 名前#タグ (例: EAGnut#2004)',
      searchExample: 'ゲーム内名前 + #タグ (例: EA7 Gnut#2004)',
    },
    tabs: {
      home: 'メタ編成',
      rankings: 'ランキング',
      champions: 'チャンピオン',
      items: 'アイテム',
      synergies: '特性',
      augments: '強化',
      instruct: 'ゲームガイド',
    },
    language: {
      en: 'English',
      vi: 'Tiếng Việt',
      ja: '日本語',
    },
    instruct: {
      title: 'ゲームガイド',
      tabs: {
        items: 'アイテム & ロール',
        rounds: 'ラウンド',
        portals: 'ポータル',
        gold: 'ゴールド & 経験値',
        damage: 'ダメージ計算式',
      },
      itemsTable: 'アイテムテーブル',
      itemsTableAlt: 'TFTアイテムテーブル シーズン15',
      rollRate: 'ロール率',
      level: 'レベル',
      gold: 'ゴールド',
      round: 'ラウンド',
      damageFormula: '残存チャンピオン数によるダメージ + ラウンドごとのダメージ = 戦闘ごとのダメージ',
    },
    comps: {
      searchPlaceholder: '編成を検索...',
      notFound: '編成が見つかりません！',
      averagePosition: '平均順位',
      top1: 'トップ1',
      top4: 'トップ4',
      pickRate: '選択率',
      detail: '詳細',
      detailButton: '編成詳細',
      championsByPrice: '価格別メインチャンピオン',
      goldPrice: 'ゴールド',
      mainChampions: 'メインチャンピオン',
    },
    validation: {
      invalidFormat: '正しい形式で入力してください (例: EA7 Gnut#2004)',
      missingName: '#の前に名前を入力してください',
      missingTag: '#の後にタグを入力してください',
    },
    tags: {
      hard: '難しい',
      easy: '簡単',
      normal: '普通',
    },
    ranks: {
      challenger: 'チャレンジャー',
      grandmaster: 'グランドマスター',
      master: 'マスター',
      diamond: 'ダイヤモンド',
      emerald: 'エメラルド',
      platinum: 'プラチナ',
      gold: 'ゴールド',
      silver: 'シルバー',
      bronze: 'ブロンズ',
      iron: 'アイアン',
    },
    alt: {
      logo: 'DTCLロゴ',
      downloadApp: 'アプリをダウンロード',
      googlePlay: 'Google Playでダウンロード',
      appStore: 'App Storeでダウンロード',
      item: 'TFTアイテム',
      synergy: 'TFT特性',
      augment: 'TFT強化',
      gameGuide: 'ゲームガイド',
      player: 'プレイヤー',
      strongestItem: '最強アイテム',
      dtcl: 'チームファイトタクティクス',
      buildGuide: '編成構築ガイド',
      buildGuideEarly: '序盤編成構築ガイド',
      buildGuideMid: '中盤編成構築ガイド',
      buildGuideLate: '終盤編成構築ガイド',
    },
    augments: {
      title: '強化',
      searchPlaceholder: '強化を検索...',
      silver: 'シルバー',
      gold: 'ゴールド',
      diamond: 'ダイヤモンド',
      augment: '強化',
      detail: '詳細',
    },
    synergies: {
      champions: 'チャンピオン:',
      exotechItem: 'エクソテックアイテム',
      chooseWeapon: '武器を選択',
      chooseUltimateWeapon: '究極の武器を選択',
      title: '特性リスト',
      searchPlaceholder: '特性を検索...',
      items: 'アイテム',
      position: '位置',
      battles: '戦闘',
      close: '閉じる',
    },
    camps: {
      averagePosition: '平均順位',
      pickRate: '選択率',
      recommendedChampions: '推奨チャンピオン',
      winRate: '勝率',
      combineItems: 'アイテム合成',
      buildComps: '編成構築',
      buildEarly: '序盤編成',
      buildMid: '中盤編成',
      buildLate: '終盤編成',
      recommendedItems: '推奨アイテム',
      battles: '戦闘',
      techUpgrade: '技術アップグレード',
      loading: '読み込み中...',
      notFound: 'チャンピオンデータが見つかりません。',
    },
    items: {
      title: 'アイテムリスト',
      searchPlaceholder: 'アイテムを検索...',
      searchPlaceholderMobile: 'アイテムを検索...',
      items: 'アイテム',
      position: '位置',
      battles: '戦闘',
      lightItems: '光アイテム',
      artifactItems: 'アーティファクトアイテム',
      core: 'コア',
      componentItems: 'コンポーネントアイテム',
      seal: 'シール',
      formula: '公式:',
      recommendedChampions: '推奨チャンピオン:',
      close: '閉じる',
    },
    champions: {
      title: 'チャンピオンリスト',
      searchPlaceholder: 'チャンピオンを検索...',
      champion: 'チャンピオン',
      detailTitle: 'チャンピオン詳細',
      skill: 'スキル',
      averagePosition: '平均順位',
      pickRate: '選択率',
      health: 'HP',
      attackDamage: '攻撃力',
      attackSpeed: '攻撃速度',
      armor: 'アーマー',
      magicResist: '魔法耐性',
      attackRange: '攻撃範囲',
      recommendedItems: '推奨アイテム',
      traits: 'チャンピオン特性',
      notFound: 'チャンピオンが見つかりません',
    },
    summoners: {
      overview: '概要',
      matchHistory: 'マッチ履歴',
      error: 'API呼び出しエラー',
      notFound: 'プレイヤーが見つからないか、接続エラー',
      ranking: 'ランキング',
      top1Games: 'トップ1戦数',
      top4Games: 'トップ4戦数',
      totalGames: '総戦数',
      top1Rate: 'トップ1率',
      top4Rate: 'トップ4率',
      avgRank: '平均ランク',
      recent20Games: '最近20戦',
      average: '平均',
      popularChampions: 'よく使うチャンピオン',
      champion: 'チャンピオン',
      games: '戦数',
      avgRankLabel: '平均ランク',
      top1RateLabel: 'TL.トップ1',
      top4RateLabel: 'TL.トップ4',
      popularTraits: 'よく使う特性',
      trait: '特性',
      saveComp: '編成を保存',
      player: 'プレイヤー',
      traitsLabel: '特性',
      championsLabel: 'チャンピオン',
      stats: '統計',
    },
    rankings: {
      title: 'ランキング',
      error: 'データ読み込みエラー',
      noPlayers: '新シーズン！このランクにプレイヤーはいません',
      player: 'プレイヤー',
      rank: 'ランク',
      games: '戦数',
      loadingMore: 'さらに読み込み中...',
      viewMore: 'もっと見る',
    },
  },
};
