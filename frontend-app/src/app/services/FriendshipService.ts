import axios from 'axios';
import { Friendship } from 'types/models/Friendship';

export async function getFriendRequest(userId: number): Promise<Friendship[]> {
  const res = await axios.get(`http://localhost:5000/api/friendship/${userId}`);
  return res.data;
}

export async function deleteFriendRequest(friendshipId: number) {
  await axios.delete(`http://localhost:5000/api/friendship/${friendshipId}`);
}

export async function acceptFriendRequest(friendshipId: number) {
  await axios.put(`http://localhost:5000/api/friendship/${friendshipId}`);
}
