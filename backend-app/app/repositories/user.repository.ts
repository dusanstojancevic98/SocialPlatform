import { User } from "../ts-models/User";
import { getPost } from "../repositories/post.repository";
import { Op, fn, col, where } from "sequelize";

const searchUser = async (
  query: string,
  userId: number | undefined
): Promise<User[]> => {
  let users;
  if (userId) {
    users = await User.findAll({
      raw: true,
      where: {
        id: {
          [Op.not]: userId,
        },
        [Op.or]: [
          where(fn("concat", col("firstName"), " ", col("lastName")), {
            [Op.substring]: query,
          }),
          {
            username: {
              [Op.substring]: query,
            },
          },
          {
            firstName: {
              [Op.substring]: query,
            },
          },
          {
            lastName: {
              [Op.substring]: query,
            },
          },
        ],
      },
    });
  } else {
    users = await User.findAll({
      raw: true,
      where: {
        [Op.or]: [
          where(fn("concat", col("firstName"), " ", col("lastName")), {
            [Op.substring]: query,
          }),
          {
            username: {
              [Op.substring]: query,
            },
          },
          {
            firstName: {
              [Op.substring]: query,
            },
          },
          {
            lastName: {
              [Op.substring]: query,
            },
          },
        ],
      },
    });
  }

  return users;
};

const updateUser = async (user: User) => {
  try {
    await User.update(user, {
      where: {
        id: user.id,
      },
    });

    const updateUser = await getOneById(user.id);
    return updateUser;
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  let users = await User.findAll();
  return users;
};
const getOne = async (username: any) => {
  try {
    const user = await User.findOne({
      where: {
        username: username.username,
      },
    });
    return user;
  } catch (err: any) {
    throw new Error(err);
  }
};
const getInfo = async (username: string) => {
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    return user;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getOneById = async (id: number): Promise<User | null> => {
  const user = await User.findByPk(id);
  return user;
};

const createUser = async (body: any) => {
  try {
    const user = {
      email: String(body.email),
      username: String(body.username),
      password: String(body.password),
      firstName: String(body.firstName),
      lastName: String(body.lastName),
      gender: String(body.gender),
      age: Number(body.age),
    };
    try {
      const newUser = await User.create(user);
    } catch (err) {
      console.log(err, user.email);
    }
    return user;
  } catch (err: any) {
    throw new Error(err);
  }
};
const addPostToUser = async (body: any) => {
  const id = body.userId;

  try {
    const result = await User.update({ posts: body }, { where: { id } });
  } catch (err) {
    throw new Error();
  }
};
export {
  createUser,
  getAllUsers,
  getOne,
  addPostToUser,
  searchUser,
  getInfo,
  updateUser,
};
