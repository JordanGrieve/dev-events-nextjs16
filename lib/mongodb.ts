import mongoose from 'mongoose';

// Define the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Validate that the MongoDB URI is provided
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Define the shape of the cached connection object
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global object to include our mongoose cache
// This prevents TypeScript errors when accessing global.mongoose
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Initialize the cache on the global object to persist across hot reloads in development
// In production, this will be created once when the module is first loaded
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes and returns a cached MongoDB connection using Mongoose
 * 
 * This function ensures that:
 * - Only one connection is established across the application
 * - The connection is reused on subsequent calls
 * - Hot reloading in development doesn't create multiple connections
 * 
 * @returns Promise that resolves to the Mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  // If a connection already exists, return it immediately
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise doesn't exist, create one
  if (!cached.promise) {
    const options = {
      bufferCommands: false, // Disable command buffering for better error handling
    };

    // Create the connection promise and cache it
    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  // Wait for the connection promise to resolve and cache the connection
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // If connection fails, reset the promise so it can be retried
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
