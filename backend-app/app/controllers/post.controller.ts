import {
  addPost,
  getAllUserPost,
  friendsPosts,
} from "../services/post.service";

exports.newPost = async (req: any, res: any) => {
  const post = await addPost(req.body);
  res.send(JSON.stringify(post));
};
exports.getAllPost = async (req: any, res: any) => {
  const allPosts = await getAllUserPost(req.body);

  return res.send(JSON.stringify(allPosts));
};
exports.friendsPosts = async (req: any, res: any) => {
  const allPosts = await friendsPosts(req.body);
  return res.send(allPosts);
};
