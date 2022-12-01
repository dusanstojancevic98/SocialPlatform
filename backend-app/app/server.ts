import express, { Request, Response } from "express";
import cors from "cors";
import { sequelize } from "./sequelize";
import { User } from "./ts-models/User";
import { Friendship } from "./ts-models/Friendship";
import * as http from "http";

import { connectToDatabase } from "../app/config/mongodb";
import { getMessages, newMessage } from "./services/message.service";

async function start() {
  try {
    await sequelize.sync({ force: true });
    await Friendship.destroy({
      where: {},
    });
    await User.destroy({
      where: {},
    });
    for (let i = 0; i < 10; i++) {
      const user = {
        email: i + "dusanstoajn@gmail.com",
        username: "user" + i,
        firstName: "Dusan" + i,
        lastName: "Stojancevic" + i,
        password: "1234" + i,
        age: 30,
        gender: i % 2 ? "male" : "female",
      };
      await User.create(user);
    }

    await Friendship.create({
      accepted: true,
      senderId: 1,
      reciverId: 2,
    });

    Friendship.create({
      accepted: true,
      senderId: 1,
      reciverId: 3,
    });

    connectToDatabase();
  } catch (error) {
    console.log(error);
  }
}

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to inviggo application." });
});

require("../app/routes/user.routes")(app);
require("../app/routes/post.routes")(app);
require("../app/routes/message.routes")(app);
require("../app/routes/friendship.routes")(app);
require("../app/routes/comment.routes")(app);
require("../app/routes/like.routes")(app);

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
io.on("connection", (socket: any) => {
  socket.on("join_room", (data: any) => {
    socket.join(data);
    getMessages(data).then((messages) =>
      io.in(data).emit("chat_messages", messages)
    );
  });

  socket.on("send_message", (data: any) => {
    async function message(data: any) {
      const addedMessage = await newMessage(data);
      return addedMessage;
    }
    message(data).then((added) =>
      io.in(data.friendshipId).emit("receive_message", added)
    );
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
console.log("usao");
server.listen(5000, () => {
  start();
  console.log("Running at localhost:5000");
});

export { io };
