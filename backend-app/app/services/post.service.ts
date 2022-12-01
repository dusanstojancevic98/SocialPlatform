import {
  createPost,
  getPosts,
  getFriendsPosts,
} from "../repositories/post.repository";
import { io } from "../server";
import { Friendship } from "../ts-models/Friendship";
import { Post } from "../ts-models/Post";
import { getMe } from "./user.service";

const addPost = async (params: any) => {
  createPost(params).then((post) => io.emit("post-added", post));
};
const getAllUserPost = async (params: any) => {
  try {
    const userPosts = await getPosts(params);
    return userPosts;
  } catch (err) {
    throw new Error("Error");
  }
};
const friendsPosts = async (params: any) => {
  try {
    const friends = await getFriendsPosts(params);
    var posts = friends.filter((x: any, y: any) => friends.indexOf(x) == y);
    return JSON.stringify(posts);
  } catch (err: any) {
    throw new Error();
  }
};

export { addPost, getAllUserPost, friendsPosts };
