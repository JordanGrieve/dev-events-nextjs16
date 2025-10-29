import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';

const Page = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/featured`,
    { cache: 'no-store' }
  );

  const { data: events } = await response.json();

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
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
