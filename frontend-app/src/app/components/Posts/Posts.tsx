import './styles.css';
import Post from '../Post/Post';
export default function Posts(props) {
  return (
    <div>
      <h1 className="center">Posts</h1>
      {props.posts.map((post, i) => (
        <Post key={i} post={post} />
      ))}
    </div>
  );
}
