import mongoose from "mongoose";
import { defaultBoardState } from "../utils/defaultBoardState.ts";

const onlineGameSchema = new mongoose.Schema(
  {
    boardState: {
      type: [[Object]],
      required: true,
      default: defaultBoardState,
      unique: true,
    },
    moves: {
      type: [String],
      required: true,
      default: [],
      unique: true,
    },
    timeControl: {
      type: Object,
      required: true,
      default: {
        time: 1800,
        increment: 0,
      },
    },
    gameStatus: {
      type: String,
      required: true,
      default: "active",
      enum: ["active", "finished"],
    },
    whitePlayer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    blackPlayer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    playerToMove: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    gameWinner: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    gameLoser: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    gameResult: {
      type: String,
      required: false,
      enum: [
        "Resigned",
        "Checkmated",
        "Timeout",
        "Draw by agreement",
        "Draw by stalemate",
        "Draw by threefold repetition",
        "Draw by insufficient material",
        "Draw by fifty-move rule",
        "Aborted",
      ],
    },
  },
  { timestamps: true,
    collectionOptions: {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["boardState", "moves", "timeControl", "gameStatus", "whitePlayer", "blackPlayer", "playerToMove", "gameWinner", "gameLoser", "gameResult"],
        },
      },
      validationLevel: "strict",
      validationAction: "warn",
    },
   },
);

const OnlineGame = mongoose.model("OnlineGame", onlineGameSchema);

export default OnlineGame;
