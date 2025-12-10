'use client';

import { usePathname } from 'next/navigation';

export default function ClientLayoutHelper() {
  const pathname = usePathname();

  // Chỉ hiển thị banner nếu KHÔNG phải trang /summoners
  const shouldShowBanner = !pathname.startsWith('/summoners');

  return (
    <>
      {shouldShowBanner && (
        <img
          src="/images/banner.webp"
          alt="Banner Đấu Trường Chân Lý"
          width={1200}
          height={200}
          className="px-0 md:px-4 hidden md:block"
        />
      )}
    </>
  );
}
