import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getPosts } from '../../services/PostService';
import AddPost from '../AddPost/AddPost';
import Posts from '../Posts/Posts';
import { Avatar } from '@mui/material';
import { io } from 'socket.io-client';
import { Post } from 'types/models/Post';

export function Profile({ user, myProfile }) {
  const [posts, setPosts] = useState([]) as any;

  useEffect(() => {
    const userPost = async () => {
      const receivedPosts = await userPosts(user.username);
      setPosts(receivedPosts);
    };
    userPost();
  }, []);
  useEffect(() => {
    const socket = io('ws://localhost:5000');

    socket.on('connnection', () => {
      console.log('connected to server');
    });

    socket.on('post-added', (newPost: Post) => {
      setPosts(posts => [...posts, newPost]);
    });

    socket.on('message', message => {
      console.log(message);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnecting');
    });
    return () => {
      setPosts({});
    };
  }, [user]);

  const userPosts = async (username: string) => {
    const receivedPosts = await getPosts(username);
    return receivedPosts;
  };

  return (
    <div>
      <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item>
            {user?.image ? (
              <Avatar
                alt=""
                src={user?.image + ''}
                sx={{ width: 100, height: 100 }}
              />
            ) : (
              <Avatar sx={{ width: 100, height: 100 }} />
            )}
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  First name: {user.firstName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Last name: {user.lastName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Email: {user.email}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Age: {user.age}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Gender: {user.gender}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      {myProfile ? <AddPost username={user.username} /> : <></>}
      <Posts posts={posts} />
    </div>
  );
}
