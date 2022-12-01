import { UserSearchDTO } from "../dto/user..search.dto.";
import {
  getAllUsers,
  createUser,
  getOne,
  searchUser,
  getInfo,
  getOneById,
  updateUser,
} from "../repositories/user.repository";
import { checkFriends } from "../repositories/friendship.repository";
import { User } from "../ts-models/User";

const getUsers = async () => {
  const users = await getAllUsers();
  return users;
};
const register = async (params: any) => {
  const createdUser = await createUser(params);
};
const getMe = async (username: string) => {
  try {
    const user = await getOne(username);
    return user;
  } catch (err: any) {
    throw new Error();
  }
};
const infoForLogin = async (params: string) => {
  try {
    const user = await getInfo(params);
    return user;
  } catch (err: any) {
    throw new Error();
  }
};
const getFriendInfo = async (userId: number) => {
  try {
    const user = await getOneById(userId);
    return user;
  } catch (err: any) {
    throw new Error();
  }
};
const searchUsers = async (
  query: string,
  userId: number
): Promise<UserSearchDTO[]> => {
  const users = await searchUser(query, userId);
  const usersDTO: UserSearchDTO[] = [];
  for (const user of users) {
    const userDTO: UserSearchDTO = user;
    userDTO.friends = await checkFriends(userId, user.id);
    usersDTO.push(userDTO);
  }
  return usersDTO;
};

const searchUsersNotLogedIn = async (query: string): Promise<User[]> => {
  const users = await searchUser(query, undefined);
  return users;
};

const editUser = async (user: User) => {
  const newUser = await updateUser(user);
  return newUser;
};

export {
  register,
  getUsers,
  getMe,
  searchUsers,
  infoForLogin,
  getFriendInfo,
  searchUsersNotLogedIn,
  editUser,
};
