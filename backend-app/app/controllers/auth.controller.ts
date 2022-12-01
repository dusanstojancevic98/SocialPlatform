import { Response } from "express";

const jwt = require("jsonwebtoken");
import { infoForLogin } from "../services/user.service";
exports.login = async (req: any, res: Response) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    res.status(400).send("All input is required");
    return;
  }
  const user = await infoForLogin(username);
  if (user == null || user == undefined) {
    res.status(401).send("Bad credentials");
    return;
  }
  if (user.password !== password) {
    res.status(401).send("Bad credentials");
    return;
  }
  const token = jwt.sign(
    { user_id: user?.id, user_name: user?.username },
    "sedrftghyjkds567wikjd678ik3",
    {
      expiresIn: "2h",
    }
  );

  res.send(token);
};
