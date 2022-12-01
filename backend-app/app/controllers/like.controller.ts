import {
  getLike,
  getLikes,
  getPostLikesByUser,
} from "../repositories/like.repository";
import {
  allUserLikes,
  create,
  getAllPostLikes,
  unlike,
} from "../services/like.service";

export const getAll = async (req: any, res: any) => {
  console.log(req.body + "body u kontroleru za likes");
  const likes = await getLikes();
  res.send(JSON.stringify(likes));
};
export const getOne = async (req: any, res: any) => {
  const like = await getLike(req.body);
  res.send(JSON.stringify(like));
};
export const getAllLikes = async (req: any, res: any) => {
  const likes = await getAllPostLikes(req.body.postId);
  res.send(JSON.stringify(likes));
};
export const getUserLikes = async (req: any, res: any) => {
  const likes = await allUserLikes(req.body);
  res.send(JSON.stringify(likes));
};
export const unlikePost = async (req: any, res: any) => {
  try {
    await unlike(req.params);
    res.json(true);
  } catch (err: any) {
    throw new Error("Unlike failed error");
  }
};
export const createLike = async (req: any, res: any) => {
  const optionalLike = await getPostLikesByUser(
    req.body.postId,
    req.body.userId
  );
  if (optionalLike != null || optionalLike != undefined) {
    res.send(400);
    return;
  }
  const like = await create(req.body);
  res.send(JSON.stringify(like));
};
