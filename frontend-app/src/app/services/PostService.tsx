import axios from 'axios';
export const postService = async (content: string, username: string) => {
  return await axios
    .post('http://localhost:5000/api/posts', {
      username,
      content,
    })
    .then(response => {
      return response.data;
    });
};
export const getPosts = async (username: string) => {
  return await axios
    .post('http://localhost:5000/api/posts/all', {
      username,
    })
    .then(response => {
      return response.data;
    });
};
export const getFriendsPosts = async (userId: number) => {
  return await axios
    .post('http://localhost:5000/api/posts/friendsPosts', {
      userId,
    })
    .then(response => {
      return response.data;
    });
};
