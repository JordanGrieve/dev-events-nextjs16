'use client';

import Image from 'next/image';
function ExploreBtn() {
  return (
    <button
      type="button"
      id="explore-btn"
      className="mt-7 mx-auto"
      onClick={() => console.log('dsad')}
    >
      <a href="#events">Explore Events</a>
      <Image
        src="/icons/arrow-down.svg"
        alt="down arrow"
        width="24"
        height="24"
      />
    </button>
  );
}

export default ExploreBtn;
