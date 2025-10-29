export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import EventDetails from '@/components/EventDetails';

const EventDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetails params={{ slug }} />
      </Suspense>
    </main>
  );
};

export default EventDetailsPage;
