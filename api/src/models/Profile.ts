import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gamesPlayed: {
      type: Number,
      required: true,
      default: 0,
    },
    gamesWon: {
      type: Number,
      required: true,
      default: 0,
    },
    gamesLost: {
      type: Number,
      required: true,
      default: 0,
    },
    gamesDrawn: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 1000,
    },
  },
  { timestamps: true },
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;