'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function ClientLayoutHelper() {
  const pathname = usePathname();

  // Chỉ hiển thị banner nếu KHÔNG phải trang /summoners
  const shouldShowBanner = !pathname.startsWith('/summoners');

  return (
    <>
      {shouldShowBanner && (
        <div className="relative w-full max-w-[1200px] px-4 mx-auto">
          <div className="relative aspect-[6/1]">
            <Image
              src="/images/banner.webp"
              alt="Banner"
              fill
              className="object-cover rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}
