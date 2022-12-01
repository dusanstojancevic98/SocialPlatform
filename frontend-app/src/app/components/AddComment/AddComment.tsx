import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { addComment } from 'app/services/CommentService';
import './styles.css';
import { selectUser } from '../../pages/LoginPage/slice/selectors';
import { useSelector } from 'react-redux';
export default function AddComment(props) {
  const { register, handleSubmit } = useForm();
  const currentUser = useSelector(selectUser);
  let userId;
  const onSubmit = data => {
    const comment = data.comment;
    const postId = props.postId;
    if (currentUser != undefined) {
      userId = currentUser.id;
    }
    if (comment !== '') {
      addComments(comment, userId, postId);
    } else {
      return console.log('nema nista');
    }
  };

  const addComments = async (content, userId, postId) => {
    const addedComm = await addComment(content, userId, postId);
    return addedComm;
  };
  return (
    <div>
      <nav aria-label="secondary mailbox folders">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className="width-input"
            {...register('comment')}
            label="comment"
          />
          <div>
            <Button type="submit" variant="contained" color="primary">
              add comment
            </Button>
          </div>
        </form>
      </nav>
    </div>
  );
}
