import { Schema, model, connect } from "mongoose";
import { User } from "../ts-models/User";

export interface Message {
  content: string;
  friendshipId: number;
  senderId: number;
  sender: string;
  createdAt: Date;
}

const schema = new Schema<Message>({
  content: { type: String, required: true },
  friendshipId: { type: Number, required: true },
  senderId: { type: Number, required: true },
  sender: { type: String, required: true },
  createdAt: { type: Date },
});

export const MessageModel = model<Message>("Message", schema);

export async function run(): Promise<void> {
  const uri =
    "mongodb+srv://pmilica:inviggo@cluster0.4pd5n.mongodb.net/inviggoNet?retryWrites=true&w=majority";
  await connect(uri);
}
