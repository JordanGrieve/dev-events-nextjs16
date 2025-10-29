import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';

const Page = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/featured`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    console.error('Failed to fetch events:', response.status);
    return <p>Failed to load events.</p>;
  }

  const json = await response.json();
  console.log('API response:', json);

  const events = json.data || json; // ✅ flexible

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
            events.map((event) => (
              <li key={event.title}>
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
