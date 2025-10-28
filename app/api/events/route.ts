import connectDB from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Event from '@/database/event.model';
import { v2 as cloundinary } from 'cloudinary';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json(
        { message: 'invalid JSON request failed' },
        { status: 400 }
      );
    }

    // Getting the Image
    const file = formData.get('image') as File;
    if (!file) {
      return NextResponse.json(
        { message: 'Image file is required' },
        { status: 400 }
      );
    }

    let tags = JSON.parse(formData.get('tags') as string);
    let agenda = JSON.parse(formData.get('agenda') as string);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    // Here you would typically upload the buffer to a cloud storage service
    const uploadResult = await new Promise((resolve, reject) => {
      // Cloudinary
      cloundinary.uploader
        .upload_stream(
          { resource_type: 'image', folder: 'DevEvent' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createEvent = await Event.create({
      ...event,
      tags: tags,
      agenda: agenda,
    });

    return NextResponse.json(
      { message: 'Event created successfully', event: createEvent },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      message: 'Event creation failed',
      error: e instanceof Error ? e.message : 'unknown error',
    });
  }
}

export async function GET() {
  try {
    await connectDB();

    //Get Newest Events first
    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: 'event list successful', events },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: 'Failed to fetch events',
        error: e instanceof Error ? e.message : 'unknown error',
      },
      { status: 500 }
    );
  }
}
