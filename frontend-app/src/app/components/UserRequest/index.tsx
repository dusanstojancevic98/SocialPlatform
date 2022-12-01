import { Button } from '@mui/material';

export const UserRequest = ({ user, acceptRequest, declineRequest }) => {
  return (
    <div className="cart">
      <div style={{ display: 'inline-block' }}>
        <h4>Username: {user.username}</h4>
        <p>First name: {user.firstName}</p>
        <p>Last name: {user.lastName}</p>
      </div>
      <div style={{ float: 'right' }}>
        <div style={{ margin: '10px' }}>
          <Button
            style={{ width: '150px' }}
            variant="contained"
            color="success"
            onClick={acceptRequest}
          >
            Accept ✓
          </Button>
        </div>
        <div style={{ margin: '10px' }}>
          <Button
            style={{ width: '150px' }}
            variant="contained"
            color="error"
            onClick={declineRequest}
          >
            Decline ✕
          </Button>
        </div>
      </div>
    </div>
  );
};
