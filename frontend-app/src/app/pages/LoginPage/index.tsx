import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCurrentUserSlice } from './slice';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { actions } = useCurrentUserSlice();

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(actions.login({ username, password }));
    setUsername('');
    setPassword('');
  };

  const handleEnter = e => {
    if (e.code === 'Enter') {
      handleLogin();
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Log in</h1>
      <div style={{ fontSize: '20px' }}>
        <div className="cart">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              gap: '10px',
            }}
          >
            <TextField
              variant="filled"
              inputProps={{
                style: { backgroundColor: 'white' },
              }}
              label="Username"
              size="small"
              sx={{
                width: '70%',
                margin: 'auto',
              }}
              value={username}
              onChange={e => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              variant="filled"
              inputProps={{
                style: { backgroundColor: 'white' },
              }}
              sx={{
                width: '70%',
                margin: 'auto',
              }}
              label="Password"
              size="small"
              type="password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
              onKeyPress={handleEnter}
            />
            <Button
              onClick={handleLogin}
              variant="contained"
              style={{
                background: 'red',
                color: 'white',
                width: '100px',
                margin: 'auto',
              }}
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
