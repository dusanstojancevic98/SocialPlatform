import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

export const User = ({ user, addFriend, loggedIn }) => {
  const history = useHistory();

  const handleUserProfile = (userId: string) => {
    history.push({
      pathname: `/user/${userId}`,
    });
  };

  return (
    <div className="cart">
      <div style={{ display: 'inline-block' }}>
        <h4>Username: {user.username}</h4>
        <p>First name: {user.firstName}</p>
        <p>Last name: {user.lastName}</p>
      </div>
      {addFriend ? (
        <div style={{ display: 'inline-block', float: 'right' }}>
          <Button onClick={addFriend} variant="contained">
            Add friend
          </Button>
        </div>
      ) : user.friends === false ? (
        <div style={{ display: 'inline-block', float: 'right' }}>
          <h3 style={{ color: '#1976d2' }}>Pending</h3>
        </div>
      ) : loggedIn ? (
        <div style={{ display: 'inline-block', float: 'right' }}>
          <div>
            <h3 style={{ color: '#1976d2', textAlign: 'center' }}>Friends</h3>
            <Button
              onClick={() => {
                handleUserProfile(user.id);
              }}
              style={{ width: '100px' }}
              variant="contained"
            >
              Profile
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'inline-block', float: 'right' }}>
          <div>
            <Button
              onClick={() => {
                handleUserProfile(user.id);
              }}
              style={{ width: '100px' }}
              variant="contained"
            >
              Profile
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
