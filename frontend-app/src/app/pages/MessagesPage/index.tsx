import Chat from 'app/components/Chat';
import FriendList from 'app/components/FriendList';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Friendship } from 'types/models/Friendship';
import { User } from 'types/models/User';
import { useFriendRequestSlice } from '../FriendRequests/slice';
import { selectRequests } from '../FriendRequests/slice/selectors';
import { selectUser } from '../LoginPage/slice/selectors';
import io, { Socket } from 'socket.io-client';

const mapedRequests = (
  requests: Friendship[] | undefined,
  currentUser: User | undefined,
) => {
  return requests
    ?.filter(req => req.accepted)
    .map(friend => {
      let newObj = { ...friend };
      if (friend.reciverId === currentUser?.id)
        newObj['friend'] = friend.sender;
      else newObj['friend'] = friend.reciver;

      delete newObj.reciver;
      delete newObj.sender;
      return newObj;
    });
};

export const MessagesPage = () => {
  const requests = useSelector(selectRequests);

  const { actions } = useFriendRequestSlice();

  const currentUser = useSelector(selectUser);

  const dispatch = useDispatch();

  const [chat, setChat] = useState(0);

  const [friend, setFriend] = useState<User>();

  const [socket, setSocket] = useState<Socket>();

  const changeChat = (friendshipId: number) => {
    const findFriendship = requests?.find(req => req.id === friendshipId);
    if (findFriendship?.reciverId === currentUser?.id)
      setFriend(findFriendship?.sender);
    else setFriend(findFriendship?.reciver);
    setChat(friendshipId);
    if (socket) socket.emit('join_room', friendshipId);
  };

  useEffect(() => {
    if (socket) socket.disconnect();
    const initSocket = io('ws://localhost:5000');
    setSocket(initSocket);
    if (currentUser) dispatch(actions.getRequests(currentUser.id));
  }, [currentUser, actions, dispatch]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 3, width: '30%', height: 'calc(100vh - 68px)' }}>
        <FriendList
          friends={mapedRequests(requests, currentUser)}
          changeChat={changeChat}
        />
      </div>
      <div style={{ flexGrow: 7, width: '70%', height: 'calc(100vh - 68px)' }}>
        {chat !== 0 ? (
          <Chat
            friend={friend}
            socket={socket}
            friendshipId={chat}
            sender={currentUser}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
