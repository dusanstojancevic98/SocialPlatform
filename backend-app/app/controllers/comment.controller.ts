import {
  addComment,
  getAllComments,
  getPostComments,
} from "../services/comment.service";

exports.getAllComments = async (req: any, res: any) => {
  const allComments = await getAllComments(req.body);
  res.send(JSON.stringify(allComments));
};
exports.newComment = async (req: any, res: any) => {
  const newComment = await addComment(req.body);
  res.send(JSON.stringify(newComment));
};
exports.getAllPostComments = async (req: any, res: any) => {
  const allComments = await getPostComments(req.body.postId);
  res.send(JSON.stringify(allComments));
};
