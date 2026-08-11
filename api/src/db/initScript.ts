import mongoose from "mongoose";
import { connectDB } from "./connect.ts";
import User from "../models/User.ts";
import Profile from "../models/Profile.ts";
import OnlineGame from "../models/OnlineGame.ts";


const MODELS = [User, Profile, OnlineGame];
async function init() {
  //Connect to the database
  await connectDB();
  //Get the currently connected database handle
  const db = mongoose.connection.db;
  //If no database handle, throw an error
  if (!db) throw new Error("No database handle after connecting to MongoDB");

  //Ask MongdoDB which collections already exist. This is what lets the script
  //choose the right path below instead of blindly creating collections.

  const existingCollections = new Set(
    (await db.listCollections({}, { nameOnly: true }).toArray()).map((c) => c.name)
  );

  for (const Model of MODELS) {
    const name = Model.collection.collectionName;
    //Pull the validator options off the schema - the scehma stays the one
    //and only place these rules are written down.
    const options = Model.schema.options.collectionOptions ?? {};
    if (!existingCollections.has(name)) {
      // FIRST RUN: the collection doesn't exist, so createCollection applies
      // our validator as part of creating it.
      await Model.createCollection();
      console.log(`created collection: ${name}`);
    } else if (options.validator) {
      // SUBSEQUENT RUNS: the collection exists, so createCollection would be
      // ignored or throw NamespaceExists. collMod is the ONLY way to update a
      // validator on an existing collection. This is the gotcha from above.
      await db.command({
        collMod: name,
        validator: options.validator,
        validationLevel: options.validationLevel ?? "strict",
        validationAction: options.validationAction ?? "error",
      });
      console.log(`updated validator: ${name}`);
    }
    //syncIndexes() creates any index declared in the schema AND drops any
    //index in the database that the schema no longer declares.  That two-way
    //reconciliation is why we can leave autoIndex off and still trust that the
    //database matches the code.

    await Model.syncIndexes();
    console.log(`synced indexes: ${name}`);
  }
  await mongoose.disconnect();
  console.log("Done with initialization script, Mongoose is disconnected");
}

init().catch((error) => {
  console.error("Error initializing database", error);
  process.exit(1);
});
