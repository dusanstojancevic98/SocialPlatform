import { Comment } from "../ts-models/Comment";
import { User } from "../ts-models/User";
import { getPost } from "./post.repository";
import { getOne, getOneById } from "./user.repository";

const createComment = async (body: any) => {
  try {
    const user = await getOneById(body.userId);
    const idPosta = body.postId;
    const post = await getPost(idPosta);
    const postId = post?.id;
    const comment = {
      content: String(body.content),
      createdAt: new Date(),
      post: post,
      user: user,
      postId: body.postId,
      userId: user?.id,
    };
    Comment.create(comment);
    return comment;
  } catch (err: any) {
    throw new Error();
  }
};
const getComments = async (id: any) => {
  try {
    const comments = await Comment.findAll({
      where: {
        postId: id,
      },
      include: {
        model: User,
        as: "user",
      },
    });
    return comments;
  } catch (err: any) {
    throw new Error();
  }
};
const getUserComments = async (id: any) => {
  try {
    const comments = await Comment.findAll({
      where: {
        userId: id,
      },
    });
  } catch (err: any) {
    throw new Error();
  }
};
const getComment = async (id: number) => {
  try {
    const comment = await Comment.findOne({
      where: {
        id: id,
      },
    });
    return comment;
  } catch (err: any) {
    throw new Error();
  }
};
export { getComment, getComments, getUserComments, createComment };
