import {
  createLike,
  deleteLike,
  getLike,
  getLikes,
  getPostAndUserLikes,
  getPostLikes,
} from "../repositories/like.repository";
import { io } from "../server";

const create = async (params: any) => {
  try {
    const like = await createLike(params);
    return like;
  } catch (err: any) {
    throw new Error("greska");
  }
};
const getAll = async () => {
  try {
    const likes = await getLikes();
    return likes;
  } catch (err: any) {
    throw new Error("nema lajkova");
  }
};
const getOne = async (params: any) => {
  try {
    const like = await getLike(params.id);
    return like;
  } catch (err: any) {
    throw new Error("nema tog lajka");
  }
};
const allUserLikes = async (params: any) => {
  try {
    const likes = await getPostAndUserLikes(params.postId, params.userId);
    return likes;
  } catch (err: any) {
    throw new Error("nema lajka");
  }
};
const unlike = async (params: any): Promise<void> => {
  console.log(params + "dosao params u like srevicu");
  const postId = parseInt(params.postId);
  const userId = parseInt(params.userId);
  return await deleteLike(postId, userId);
};
const getAllPostLikes = async (postId: number) => {
  try {
    const postLikes = await getPostLikes(postId);
    return postLikes;
  } catch (err: any) {
    throw new Error();
  }
};
export { create, getAll, getOne, getAllPostLikes, unlike, allUserLikes };
