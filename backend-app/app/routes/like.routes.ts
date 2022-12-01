import express, { Express } from "express";
import * as likeController from "../controllers/like.controller";
module.exports = (app: any) => {
  const likes = require("../controllers/like.controller");
  console.log("usao");
  var router = require("express").Router();
  router.post("/", likes.createLike);
  router.get("/", likes.getAllLikes);
  router.get("/:id", likes.getOne);
  app.use("api/likes", router);
};
