import { Request, Response } from 'express'
import { acceptRequest, addFriendRequest, getRequests, deleteRequest } from '../services/friendship.service'

export const acceptFriendRequest = async (req: Request, res: Response) => {
    try {
        const param = parseInt(req.params.id);
        await acceptRequest(param);
        res.json(true);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const addRequest = async (req: Request, res: Response) => {
    try {

        const senderId = parseInt(req.params.senderId);
        const reciverId = parseInt(req.params.reciverId);
        await addFriendRequest(senderId, reciverId);
        res.json(true);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const getFriendRequests = async (req: Request, res: Response) => {
    try {
        const param = parseInt(req.params.id);
        const friendReq = await getRequests(param);
        res.json(friendReq);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const deleteFriendRequest = async (req: Request, res: Response) => {
    try {
        const param = parseInt(req.params.id);
        await deleteRequest(param);
        res.json(true);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}