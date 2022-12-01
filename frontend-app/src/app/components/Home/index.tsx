import { getFriendsPosts } from 'app/services/PostService';
import { useEffect, useState } from 'react';
import Posts from '../Posts/Posts';
import { io } from 'socket.io-client';
import { Post } from '../../../types/models/Post';
import { useSelector } from 'react-redux';
import { selectUser } from '../../pages/LoginPage/slice/selectors';
export function Home() {
  const [posts, setPosts]: any = useState([]);
  const currentUser = useSelector(selectUser);
  if (currentUser?.id === undefined) {
    throw new Error('Unexpected error: Missing id');
  }
  let id = currentUser?.id;
  useEffect(() => {
    const friendsPosts = async () => {
      const allFriendsPosts = await getFriendsPosts(id);
      for (let index = 0; index < allFriendsPosts.length; index++) {
        const post = allFriendsPosts[index];
        if (id != post.userId) {
          setPosts(posts => [...posts, post]);
        }
      }
    };
    friendsPosts();
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
      setPosts({}); // This worked for me
    };
  }, []);
  return (
    <>
      <Posts posts={posts} />
    </>
  );
}
