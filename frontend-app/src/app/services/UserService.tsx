import axios from 'axios';
import { ResponseError } from 'utils/request';
export const registerUser = async (
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  age: number,
  gender: string,
) => {
  return await axios
    .post('http://localhost:5000/api/users', {
      username,
      password,
      firstName,
      lastName,
      email,
      gender,
      age,
    })
    .then(response => {
      return response.data;
    });
};

export async function sendFriendRequest(
  userId: number,
  reciverId: number,
): Promise<{} | { err: ResponseError }> {
  const res = await axios.post(
    `http://localhost:5000/api/friendship/${userId}/${reciverId}`,
  );
  return res.data;
}

export const getMe = async () => {
  return await axios
    .post('http://localhost:5000/api/users/me')
    .then(response => {
      return response.data;
    });
};

export const getCurrent = async () => {
  return await axios
    .post('http://localhost:5000/api/users/current')
    .then(response => {
      return response.data;
    });
};

export const getAll = async () => {
  return await axios.get('http://localhost:5000/api/users').then(response => {
    return response.data;
  });
};

export const getUserInfo = async (userId: number) => {
  return await axios
    .post('http://localhost:5000/api/users/getInfo', {
      userId,
    })
    .then(response => {
      return response.data;
    });
};

export const search = async (search: string) => {
  return await axios
    .get('http://localhost:5000/api/users/search?search=' + search)
    .then(response => {
      return response.data;
    });
};

export const editUser = async (formData: FormData) => {
  const editedUser = await axios.post(
    'http://localhost:5000/api/users/edit',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return editedUser.data;
};
