import { Button } from '@mui/material';
import { postService } from '../../services/PostService';
import { useForm, SubmitHandler } from 'react-hook-form';
import './styles.css';

type FormValues = {
  content: string;
};
export default function AddPost({ username }) {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data =>
    addPost(data.content, username);

  const addPost = async (text: string, username: string) => {
    const addPost = await postService(text, username);
    return addPost;
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        id="text"
        placeholder="text"
        {...register('content', {
          required: 'Required',
        })}
      />
      <Button type="submit">Add post</Button>
    </form>
  );
}
