import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // declares a unique INDEX (see above — not a validator)
      lowercase: true, // normalize before saving, so Bob@x.com and bob@x.com collide
      trim: true, // strip accidental whitespace from form input
    },
    password: {
      type: String,
      required: true,
      select: false, // never return the hash on ordinary queries — see caveat below
    },
  },
  {
    timestamps: true,
    collectionOptions: {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["email", "password", "createdAt", "updatedAt"],
          properties: {
            _id: { bsonType: "objectId" },
            email: {
              bsonType: "string",
              // Enforced by the DATABASE, so it holds even for writes that
              // never touch your Express app.
              pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
            },
            password: {
              bsonType: "string",
              // A bcrypt hash is always exactly 60 characters. This makes it
              // structurally impossible to store a plaintext password here.
              minLength: 60,
            },
            createdAt: { bsonType: "date" },
            updatedAt: { bsonType: "date" },
            // Mongoose's internal version key. MUST be listed — omitting it
            // while using additionalProperties: false rejects every insert
            // Mongoose makes, with a baffling error.
            __v: { bsonType: "int" },
          },
          additionalProperties: false,
        },
      },
      validationLevel: "strict", // apply to all inserts and updates
      validationAction: "warn", // reject violations (use 'warn' to log only) optionns are error and warn
    },
  },
);

interface IUser extends mongoose.Document {
  email: string;
  password?: string;
}
export default mongoose.model<IUser>("User", userSchema);
