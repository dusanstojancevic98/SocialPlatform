import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { UserRequest } from '../../components/UserRequest';
import { useEffect } from 'react';
import { selectRequests } from './slice/selectors';
import { useFriendRequestSlice } from './slice';
import { User } from 'app/components/User';
import { selectUser } from '../LoginPage/slice/selectors';

export function FriendRequestsPage() {
  const requests = useSelector(selectRequests);

  const { actions } = useFriendRequestSlice();

  const currentUser = useSelector(selectUser);

  const dispatch = useDispatch();

  const declineRequest = (friendshipId: number) => {
    dispatch(actions.declineRequest(friendshipId));
  };
  const acceptRequest = (friendshipId: number) => {
    dispatch(actions.acceptRequest(friendshipId));
  };

  useEffect(() => {
    if (currentUser) dispatch(actions.getRequests(currentUser.id));
  }, [currentUser, actions, dispatch]);

  return (
    <>
      <Helmet>
        <title>Friend requests</title>
        <meta name="description" content="Friend requests" />
      </Helmet>
      <div className="container">
        <h3>Friend requests</h3>
        <div>
          {!requests || requests.length === 0 ? (
            <h4>Nema rezultata</h4>
          ) : (
            requests.map(req =>
              !req.accepted && req.senderId !== currentUser?.id ? (
                <UserRequest
                  key={req.id}
                  user={req.sender}
                  acceptRequest={() => {
                    acceptRequest(req.id);
                  }}
                  declineRequest={() => {
                    declineRequest(req.id);
                  }}
                />
              ) : req.senderId !== currentUser?.id ? (
                <User
                  key={req.id}
                  user={req.sender}
                  addFriend={undefined}
                  loggedIn={true}
                />
              ) : (
                <User
                  key={req.id}
                  user={{ ...req.reciver, friends: req.accepted }}
                  addFriend={undefined}
                  loggedIn={true}
                />
              ),
            )
          )}
        </div>
      </div>
    </>
  );
}
