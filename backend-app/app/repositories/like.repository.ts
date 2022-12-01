import { searchUsersNotLogedIn } from "../services/user.service";
import { Like } from "../ts-models/Like";
import { User } from "../ts-models/User";
import { getPost } from "./post.repository";
import { getOneById } from "./user.repository";

const getLike = async (id: number) => {
  try {
    const like = await Like.findByPk(id);
    return like;
  } catch (err: any) {
    throw new Error();
  }
};
export const deleteLike = async (
  postId: number,
  userId: number
): Promise<void> => {
  await Like.destroy({
    where: {
      postId: postId,
      userId: userId,
    },
  });
};
const getPostLikes = async (postId: number) => {
  try {
    const likes = await Like.findAll({
      where: {
        postId: postId,
      },
    });
    return likes;
  } catch (err: any) {
    throw new Error("Error getting likes");
  }
};
const getPostLikesByUser = async (postId: number, userId: number) => {
  try {
    const likes = await Like.findOne({
      where: {
        postId: postId,
        userId: userId,
      },
    });
    return likes;
  } catch (err: any) {
    throw new Error("Error getting likes by user");
  }
};
const getPostAndUserLikes = async (postId: number, userId: number) => {
  try {
    const likes = await Like.findAll({
      where: {
        postId: postId,
        userId: userId,
      },
    });
    return likes;
  } catch (err: any) {
    throw new Error("Error getting likes");
  }
};
const getLikes = async () => {
  try {
    const likes = await Like.findAll();
    return likes;
  } catch (err: any) {
    throw new Error();
  }
};
const getUserLikes = async (postId: number) => {
  try {
    const likes = await Like.findAll({
      where: {
        postId: postId,
      },
      include: {
        model: User,
        as: "user",
      },
    });
  } catch (err: any) {
    throw new Error("nema user like-ova");
  }
};
const createLike = async (body: any) => {
  try {
    const user = await getOneById(body.userId);
    const post = await getPost(body.postId);
    const like = {
      userId: body.userId,
      postId: body.postId,
      user: user,
      post: post,
    };
    Like.create(like);
    return like;
  } catch (err: any) {
    throw new Error();
  }
};
export {
  getLike,
  getLikes,
  createLike,
  getPostLikes,
  getPostAndUserLikes,
  getPostLikesByUser,
};
