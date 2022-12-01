import axios from 'axios';
export const addComment = async (
  content: string,
  userId: number,
  postId: number,
) => {
  return await axios
    .post('http://localhost:5000/api/comments', {
      content,
      userId,
      postId,
    })
    .then(response => {
      return response.data;
    });
};
export const getComments = async (postId: number) => {
  return await axios
    .post('http://localhost:5000/api/comments/getAllPostComments', {
      postId,
    })
    .then(response => {
      return response.data;
    });
};
