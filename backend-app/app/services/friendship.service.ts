import { addRequestFriendship, acceptFriendRequest, getFriendRequests, deleteFriendRequest } from '../repositories/friendship.repository';
import { getOneById } from '../repositories/user.repository'
import { Friendship } from '../ts-models/Friendship';

export const addFriendRequest = async (senderId: number, reciverId: number): Promise<void> => {

    const sender = await getOneById(senderId);
    const reciver = await getOneById(reciverId);

    if (!sender || !reciver)
        throw Error('Invalid users');
        
    await addRequestFriendship(sender, reciver);
};

export const acceptRequest = async (friendshipId: number): Promise<void> => {
    await acceptFriendRequest(friendshipId);
}

export const getRequests = async (userId: number): Promise<Friendship[]> => {
    return await getFriendRequests(userId);
} 

export const deleteRequest = async (friendshipId: number): Promise<void> => {
    return await deleteFriendRequest(friendshipId);
}