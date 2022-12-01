import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../pages/LoginPage/slice/selectors';
import LoggedMenu from '../Menu/LoggedMenu';
import NotLoggedMenu from '../Menu/NotLoggedMenu';
import { Avatar } from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';

export function Header() {
  const [search, setSearch] = useState('');

  const user = useSelector(selectUser);

  const history = useHistory();

  const handleSearch = () => {
    if (!search) return;
    setSearch('');
    history.push({
      pathname: '/search/' + search,
    });
  };

  const handleEnter = e => {
    if (e.code === 'Enter') {
      handleSearch();
    }
  };

  const handleNavigate = (route: string) => {
    return () => {
      history.push({
        pathname: route,
      });
    };
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: 'red' }}>
        <Toolbar sx={{ alignContent: 'center' }}>
          <Typography
            onClick={handleNavigate('/')}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            InviggoNet
          </Typography>
          {user?.id !== -1 ? (
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <IconButton onClick={handleSearch}>
                <SearchIcon style={{ fill: 'white' }} />
              </IconButton>
              <TextField
                id="outlined-search"
                type="search"
                variant="outlined"
                inputProps={{
                  style: { backgroundColor: 'white' },
                }}
                size="small"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                }}
                onKeyPress={handleEnter}
              />
            </Box>
          ) : (
            <></>
          )}
          {user?.id !== -1 ? (
            <DraftsIcon
              onClick={handleNavigate('/messages')}
              sx={{
                marginLeft: '20px',
                cursor: 'pointer',
              }}
            />
          ) : (
            <></>
          )}
          {user?.id !== -1 ? (
            user?.image ? (
              <>
                <Avatar
                  alt=""
                  src={user?.image + ''}
                  sx={{
                    marginLeft: '20px',
                    cursor: 'pointer',
                  }}
                  onClick={handleNavigate('/profile')}
                />
              </>
            ) : (
              <Avatar
                sx={{
                  marginLeft: '20px',
                  cursor: 'pointer',
                }}
                onClick={handleNavigate('/profile')}
              />
            )
          ) : (
            <></>
          )}

          {user?.id === -1 ? <NotLoggedMenu /> : <LoggedMenu />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
