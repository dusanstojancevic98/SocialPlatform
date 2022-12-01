import { Request, Response } from "express";
import { upload } from "../firebase/firebase";
import {
  register,
  getUsers,
  getMe,
  searchUsers,
  infoForLogin,
  searchUsersNotLogedIn,
  getFriendInfo,
  editUser,
} from "../services/user.service";

exports.findAll = async (req: any, res: any) => {
  const users = await getUsers();
  res.send(JSON.stringify(users));
};
exports.registerUser = async (req: any, res: any) => {
  const user = await register(req.body);
  res.send(JSON.stringify(user));
};
exports.getMyInfo = async (req: any, res: any) => {
  if (!req.user) {
    res.sendStatus(401);
  } else {
    const user = await getMe(req.user.user_name);
    res.send(JSON.stringify(user));
  }
};
exports.getFriend = async (req: any, res: any) => {
  if (!req.body) {
    res.sendStatus(401);
  } else {
    const user = await getFriendInfo(req.body.userId);
    res.send(JSON.stringify(user));
  }
};

exports.getCurrentUser = async (req: any, res: any) => {
  if (!req.user) {
    res.sendStatus(401);
  } else {
    const user = await infoForLogin(req.user.user_name);
    res.send(JSON.stringify(user));
  }
};

exports.search = async (req: any, res: Response) => {
  const search = req.query.search as string;
  try {
    let users;
    if (req.user) users = await searchUsers(search, req.user.user_id);
    else users = await searchUsersNotLogedIn(search);
    return res.json(users);
  } catch (error) {
    return res.sendStatus(400);
  }
};

exports.edit = async (req: Request, res: Response) => {
  if (req.busboy) {
    let fileData: Uint8Array | Buffer | null = null;
    let fileName: any;
    const user: any = {
      id: -1,
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      image: "",
      age: 0,
      gender: "",
    };
    req.busboy.on("file", (name, file, info) => {
      fileName = info;
      file.on("data", (data) => {
        if (fileData === null) {
          fileData = data;
        } else {
          fileData = Buffer.concat([fileData, data]);
        }
      });
    });
    req.busboy.on("field", (fieldName, value) => {
      user[fieldName] = value;
    });

    req.busboy.on("finish", async () => {
      if (fileName) {
        const url = await upload(fileData, fileName);
        user.image = url;
      }
      const newUser = await editUser(user);
      res.json(newUser);
    });
  }
};
