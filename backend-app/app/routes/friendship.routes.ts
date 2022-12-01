import express, { Express } from 'express'
import * as friendController from '../controllers/friendship.controller'

module.exports = (app: Express) => {
  
    var router = express.Router();

    router.get('/:id', friendController.getFriendRequests);
    router.post('/:senderId/:reciverId', friendController.addRequest);
    router.put('/:id', friendController.acceptFriendRequest)
    router.delete('/:id', friendController.deleteFriendRequest);
    app.use("/api/friendship", router);
  };
  