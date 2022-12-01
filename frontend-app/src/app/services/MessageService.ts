//getAllMessages
import axios from 'axios';
export const getAllMessages = async (friendshipId: number) => {
  return await axios
    .post('http://localhost:5000/api/messages/all', {
      friendshipId,
    })
    .then(response => {
      return response.data;
    });
};
