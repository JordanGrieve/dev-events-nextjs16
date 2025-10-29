import React from 'react';
import { notFound } from 'next/navigation';
import { IEvent } from '@/database';
import { getSimilarEventsBySlug } from '@/lib/actions/event.actions';
import Image from 'next/image';
import BookEvent from '@/components/BookEvent';
import EventCard from '@/components/EventCard';

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetails = async ({ params }: { params: { slug: string } }) => {
  // Extract slug string
  const slug = params.slug;

  // Build API URL: use public base if provided, otherwise use relative path
  const apiUrl = BASE_URL
    ? `${BASE_URL}/api/events/${slug}`
    : `/api/events/${slug}`;

  const request = await fetch(apiUrl, { cache: 'no-store' });
  if (!request.ok) {
    return notFound();
  }

  const { data: event } = await request.json();

  if (!event) return notFound();

  // Example bookings count (replace with real data if available)
  const bookings = 10;

  // Use the event slug (string) for finding similar events
  const similarEvents: IEvent[] = await getSimilarEventsBySlug(event.slug);

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{event.description}</p>
      </div>
      <div className="details">
        {/* Left Side */}
        <div className="content">
          <Image
            src={event.image}
            alt="event banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{event.overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={event.date}
            />
            <EventDetailItem
              icon="/icons/clock.svg"
              alt="time"
              label={event.time}
            />
            <EventDetailItem
              icon="/icons/pin.svg"
              alt="pin"
              label={event.location}
            />
            <EventDetailItem
              icon="/icons/mode.svg"
              alt="mode"
              label={event.mode}
            />
            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={event.audience}
            />
          </section>

          <EventAgenda agendaItems={event.agenda} />

          <section className="flex-col-gap-2">
            <h2>About the Organiser</h2>
            <p>{event.organizer}</p>
          </section>

          <EventTags tags={event.tags} />
        </div>
        {/* Right Side */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Joining {bookings} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to join</p>
            )}

            <BookEvent eventId={String(event._id)} slug={event.slug} />
          </div>
        </aside>
      </div>
      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent: IEvent) => (
              <EventCard
                key={similarEvent.slug || String(similarEvent._id)}
                title={similarEvent.title}
                image={similarEvent.image}
                slug={similarEvent.slug}
                location={similarEvent.location}
                date={similarEvent.date}
                time={similarEvent.time}
              />
            ))}
        </div>
      </div>
    </section>
  );
};
export default EventDetails;
