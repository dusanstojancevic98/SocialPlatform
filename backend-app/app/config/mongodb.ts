import * as mongoDB from "mongodb";
const mongoose = require("mongoose");
import { Message } from "../models/Message";
const url =
  "mongodb+srv://milica:milica98@cluster0.4pd5n.mongodb.net/inviggoNet?retryWrites=true&w=majority";
//("mongodb+srv://milica:milica98@cluster0.4pd5n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(url);

  await client.connect();
  mongoose.connect(url, { useNewUrlParser: true });
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
  mongoose.connection.on("open", function () {
    console.log("Connected to MongoDB database.");
  });
  const messageCollection: mongoDB.Collection = db.collection("messages");

  //collections.games = gamesCollection;

  // console.log(
  //   `Successfully connected to database: ${db.databaseName} and collection: ${messageCollection.collectionName}`
  // );

  db.collection("messages").insertOne({
    content: { type: String, required: true },
    friendshipId: { type: Number, required: true },
    senderId: { type: Number, required: true },
  });
}
