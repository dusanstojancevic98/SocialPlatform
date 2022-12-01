import { Profile } from 'app/components/Profile/Profile';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { User } from 'types/models/User';
import { selectUser, selectUsers } from '../LoginPage/slice/selectors';

type ProfileParam = {
  userId: string | undefined;
};

export function ProfilePage() {
  const [user, setUser] = useState<User>({
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    age: 1,
    gender: '',
  });

  const currentUser = useSelector(selectUser);
  const users = useSelector(selectUsers);

  const { userId } = useParams<ProfileParam>();

  useEffect(() => {
    if (userId) {
      const chosenOne = users?.find(user => user.id === parseInt(userId));
      if (chosenOne) setUser(chosenOne);
    } else {
      if (currentUser) {
        setUser(currentUser);
      }
    }
  }, [userId]);

  return (
    <>
      <Helmet>Profile</Helmet>

      {user.id !== 0 && (
        <Profile user={user} myProfile={userId === undefined} />
      )}
    </>
  );
}
