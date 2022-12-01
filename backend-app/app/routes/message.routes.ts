module.exports = (app: any) => {
  const messages = require("../controllers/message.controller");
  console.log("u rutama");
  var router = require("express").Router();
  router.post("/", messages.addNewMessage);
  router.post("/all", messages.allMessages);
  app.use("/api/messages", router);
};
