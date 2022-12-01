import { RecordWithTtl } from "dns";
import { Request, Response } from "express";
import { getMessages, newMessage } from "../services/message.service";

const addNewMessage = async (req: Request, res: Response) => {
  console.log("usao u klinac");
  console.log(req.body.senderId + "dosao u add message ");
  const message = await newMessage(req.body);
  res.send(JSON.stringify(message));
};
const allMessages = async (req: Request, res: Response) => {
  console.log(req.body);
  const messages = await getMessages(req.body);
  console.log(messages + "u kontrolleru");
  return res.send(JSON.stringify(messages));
};
export { addNewMessage, allMessages };
