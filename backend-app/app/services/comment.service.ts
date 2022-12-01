import {
  getComment,
  getComments,
  getUserComments,
  createComment,
} from "../repositories/comment.repository";
import { io } from "../server";
const addComment = (params: any) => {
  createComment(params).then((comment) => io.emit("comment-added", comment));
};
const getAllComments = async (params: any) => {
  try {
    const comments = await getComments(params);
    return comments;
  } catch (err: any) {
    throw new Error();
  }
};
const getPostComments = async (params: any) => {
  try {
    const comments = await getComments(params);
    return comments;
  } catch (err: any) {
    throw new Error();
  }
};
export { addComment, getAllComments, getPostComments };
