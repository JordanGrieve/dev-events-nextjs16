'use client';

import Image from 'next/image';

function ExploreBtn() {
  return (
    <a
      href="#events"
      id="explore-btn"
      className="mt-7 mx-auto inline-flex items-center gap-2"
      role="button"
    >
      <span>Explore Events</span>
      <Image
        src="/icons/arrow-down.svg"
        alt="down arrow"
        width={24}
        height={24}
      />
    </a>
  );
}

export default ExploreBtn;
