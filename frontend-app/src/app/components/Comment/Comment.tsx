import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function Comment(props) {
  return (
    <div>
      <nav aria-label="secondary mailbox folders">
        <Paper style={{ padding: '40px 20px' }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: 'left' }}>
                {props.comment.user.firstName} {props.comment.user.lastName}
              </h4>
              <p style={{ textAlign: 'left' }}>{props.comment.content}</p>
              <p style={{ textAlign: 'left', color: 'gray' }}>
                {new Date(props.comment.createdAt).toLocaleDateString()}
              </p>
            </Grid>
          </Grid>
        </Paper>
      </nav>
    </div>
  );
}
