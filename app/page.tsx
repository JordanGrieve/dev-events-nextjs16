import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';

const Page = async () => {
  // Use NEXT_PUBLIC_BASE_URL when available, otherwise fall back to a relative API path
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? '';

  const response = await fetch(`${base}/api/events`, { cache: 'no-store' });

  if (!response.ok) {
    console.error('Failed to fetch events:', response.status);
    return <p>Failed to load events.</p>;
  }

  const json = await response.json();
  console.log('API response:', json);

  // Accept either { events } or { data } response shapes, and fall back to an empty array
  const events = json.events ?? json.data ?? json ?? [];

  return (
    <section>
      <h1 className="text-center">
        The Hub For Every Dev <br /> Event You Cant Miss
      </h1>
      <p className="text-center m-5">
        Hackathons, Meetups, Conferences — All in One Place
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events list-none">
          {Array.isArray(events) && events.length > 0 ? (
            events.map((event: any) => (
              <li key={event._id ?? event.slug ?? event.title}>
                <EventCard {...event} />
              </li>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Page;
