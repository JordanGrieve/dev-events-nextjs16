export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import EventDetails from '@/components/EventDetails';

const EventDetailsPage = async ({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) => {
  // `params` can be a Promise in Next's server components; await it before accessing properties
  const { slug } = await params;

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetails params={{ slug }} />
      </Suspense>
    </main>
  );
};

export default EventDetailsPage;
