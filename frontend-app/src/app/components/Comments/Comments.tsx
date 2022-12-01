import { getComments } from 'app/services/CommentService';
import { useEffect, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import './styles.css';
import { io } from 'socket.io-client';
import { Comment as komentar } from 'types/models/Comment';
import Comment from '../Comment/Comment';

export default function Comments(props) {
  const [comments, setComments] = useState([]) as any;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const allComments = allPostComments();
    allComments.then(comment => setComments(comment));
  }, []);
  useEffect(() => {
    const socket = io('ws://localhost:5000');

    socket.on('connnection', () => {
      console.log('connected to server');
    });

    socket.on('comment-added', (newComment: Comment) => {
      console.log(newComment);
      setComments(comments => [...comments, newComment]);
    });

    socket.on('message', message => {
      console.log(message);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnecting');
    });
    return () => {
      setComments({}); // This worked for me
    };
  }, []);
  const allPostComments = async () => {
    const comments = await getComments(props.postId);
    return comments;
  };
  return (
    <div>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Comments
          </ListSubheader>
        }
      >
        {comments.length > 0 && (
          <div>
            <ListItemButton onClick={handleClick} className="width">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText
                    className="width"
                    primary={comments.map((comment, i) => (
                      <Comment
                        key={i}
                        comment={comment}
                        postId={props.postId}
                      />
                    ))}
                  />
                </ListItemButton>
              </List>
            </Collapse>
          </div>
        )}
      </List>
    </div>
  );
}
