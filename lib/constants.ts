// Centralized event data for EventCard and listings
// Note: image paths resolve from the Next.js public/ directory. For example,
// "/images/nextjs-conf.jpg" maps to C:\\Users\\griev\\Desktop\\dev_event\\public\\images\\nextjs-conf.jpg

export type EventItem = {
  title: string;
  image: string; // path under /public/images
  slug: string; // URL-safe identifier, e.g. "nextjs-conf-2025"
  location: string; // City, Country or "Online/Hybrid"
  date: string; // Human-readable date, e.g. "Nov 12, 2025"
  time: string; // Human-readable time, e.g. "9:00 AM PT"
};

export const events: EventItem[] = [
  {
    title: 'Next.js Conf 2025',
    image: '/images/event1.png',
    slug: 'nextjs-conf-2025',
    location: 'San Francisco, USA • Hybrid',
    date: 'Nov 12, 2025',
    time: '9:00 AM PT',
  },
  {
    title: 'GitHub Universe 2025',
    image: '/images/event2.png',
    slug: 'github-universe-2025',
    location: 'San Francisco, USA',
    date: 'Nov 5, 2025',
    time: '10:00 AM PT',
  },
  {
    title: 'KubeCon + CloudNativeCon North America 2025',
    image: '/images/event3.png',
    slug: 'kubecon-na-2025',
    location: 'Austin, USA',
    date: 'Oct 28, 2025',
    time: '8:30 AM CT',
  },
  {
    title: 'JSConf Asia 2025',
    image: '/images/event4.png',
    slug: 'jsconf-asia-2025',
    location: 'Singapore',
    date: 'Nov 22, 2025',
    time: '9:00 AM SGT',
  },
  {
    title: 'ETHGlobal San Francisco 2025',
    image: '/images/event5.png',
    slug: 'ethglobal-sf-2025',
    location: 'San Francisco, USA',
    date: 'Dec 6, 2025',
    time: '6:00 PM PT',
  },
  {
    title: 'HackZurich 2025',
    image: '/images/event2.png',
    slug: 'hackzurich-2025',
    location: 'Zurich, Switzerland',
    date: 'Sep 19, 2025',
    time: '5:00 PM CEST',
  },
  {
    title: 'React Summit US 2025',
    image: '/images/event1.png',
    slug: 'react-summit-us-2025',
    location: 'New York, USA',
    date: 'Dec 3, 2025',
    time: '9:00 AM ET',
  },
  {
    title: 'PyCon US 2026',
    image: '/images/event5.png',
    slug: 'pycon-us-2026',
    location: 'Pittsburgh, USA',
    date: 'Apr 24, 2026',
    time: '9:00 AM ET',
  },
];
