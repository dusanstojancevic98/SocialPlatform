import { addMessage, getAllMessages } from "../repositories/message.repository";
import { io } from "../server";

const newMessage = async (params: any) => {
  const added = await addMessage(params);
  return added;
};
const getMessages = async (params: any) => {
  const allMessages = await getAllMessages(parseInt(params));
  return allMessages;
};
export { newMessage, getMessages };
