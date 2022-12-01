import { MessageModel } from "../models/Message";
import { User } from "../ts-models/User";
import { getOneById } from "./user.repository";
const addMessage = async (body: any) => {
  try {
    const senderId = body.senderId;
    const friendshipId = body.friendshipId;
    const content = body.content;
    const user = await getOneById(senderId);
    const firstAndLastName = user?.firstName + "," + user?.lastName;
    const message = {
      content: content,
      senderId: senderId,
      friendshipId: friendshipId,
      sender: firstAndLastName,
      createdAt: new Date(),
    };
    console.log(senderId + "dosao senderId u bodiju za message");
    console.log(content + "dosao  content u bodiju za message");
    console.log(message.createdAt + "date u bodiju za message");
    MessageModel.create(message);
    return message;
  } catch (err: any) {
    throw new Error();
  }
};
const getAllMessages = async (body: any) => {
  try {
    const friendshipId = body;
    const messages = await MessageModel.find({
      friendshipId: friendshipId,
    });
    return messages;
  } catch (err: any) {
    console.log(err);
    throw new Error("nema poruka");
  }
};
export { addMessage, getAllMessages };
