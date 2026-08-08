import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;
const mongoDbName = process.env.MONGO_DB_NAME;

export async function connectDB(): Promise<typeof mongoose> {
  // Fail fast with a message that names the actual problem. Compare this to
  // the current behavior: a 10-second buffer timeout that says nothing useful.
  if (!mongoURI)
    throw new Error("MONGO_URI is not set — check your --env-file");
  if (!mongoDbName)
    throw new Error("MONGO_DB_NAME is not set — check your --env-file");

  // Pass the database name as an OPTION rather than gluing it onto the URI.
  // Your .env.local keeps MONGO_URI and MONGO_DB_NAME as separate variables,
  // and this respects that split instead of doing string concatenation.
  await mongoose.connect(mongoURI, {
    dbName: mongoDbName, 
    // Turn OFF Mongoose's automatic index building. It is ON by default, which
    // is convenient in development but genuinely dangerous in production: every
    // booting instance races to build the same indexes, and a large build can
    // block the collection. We create indexes deliberately in the init script.
    autoIndex: false,

    // Same reasoning — don't let a stray query auto-create a collection and
    // thereby skip the $jsonSchema validator we're about to attach.
    autoCreate: false,

    // Fail a connection attempt in 5s instead of hanging for the default 30s.
    serverSelectionTimeoutMS: 5000,
  });

  return mongoose;
}
