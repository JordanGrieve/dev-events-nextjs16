import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import { events } from '@/lib/constants';

const Page = () => {
  return (
    <section>
      <h1 className="text-center">
        The Hub For Every Dev <br /> Event You Cant Miss
      </h1>
      <p className="text-center m-5">
        Hackathons, Meetups, Conferencess, All in One Place
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
