import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Event } from '@/database';

// Define the shape of route parameters
interface RouteParams {
  params: {
    slug: string;
  };
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its unique slug
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    await connectDB();

    // Extract and validate slug parameter
    const { slug } = await params;

    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid slug parameter',
        },
        { status: 400 }
      );
    }

    // Establish database connection
    await connectDB();

    // Query event by slug
    const event = await Event.findOne({
      slug: slug.toLowerCase().trim(),
    }).lean();

    // Handle case where event is not found
    if (!event) {
      return NextResponse.json(
        {
          success: false,
          error: 'Event not found',
        },
        { status: 404 }
      );
    }

    // Return the event data
    return NextResponse.json(
      {
        success: true,
        data: event,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (use proper logging service in production)
    console.error('Error fetching event by slug:', error);

    // Handle Mongoose validation or cast errors
    if (error instanceof Error && error.name === 'CastError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid slug format',
        },
        { status: 400 }
      );
    }

    // Return generic error for unexpected issues
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
