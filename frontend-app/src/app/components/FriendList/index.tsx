import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Avatar } from '@mui/material';

const FriendList = ({ friends, changeChat }) => {
  return (
    <div
      className="containerWithoutMargin"
      style={{ padding: '10px', backgroundColor: '#00aaff', height: '100%' }}
    >
      <h1 style={{ color: 'white', textAlign: 'center' }}> FRIENDS</h1>
      <List>
        {friends.map(({ friend, id }) => (
          <ListItem
            onClick={() => {
              changeChat(id);
            }}
            className="containerLittleMargin"
            key={friend.id}
            sx={{
              border: 'solid black 1px',
              borderRadius: '10px',
              margin: '0px',
            }}
          >
            {friend.image ? (
              <Avatar
                style={{ marginRight: '10px', width: '50px', height: '50px' }}
                src={friend.image}
              />
            ) : (
              <Avatar
                style={{ marginRight: '10px', width: '50px', height: '50px' }}
              />
            )}

            <h2 style={{ color: 'white' }}>
              {friend.firstName} {friend.lastName}
            </h2>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FriendList;
