import * as React from 'react';
import Menu from '@mui/material/Menu';
import { Divider, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCurrentUserSlice } from 'app/pages/LoginPage/slice';
export default function NotLogedMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { actions } = useCurrentUserSlice();

  const dispatch = useDispatch();

  const history = useHistory();

  const handleNavigate = (route: string) => {
    return () => {
      history.push({
        pathname: route,
      });
      handleClose();
    };
  };

  const handleLogout = () => {
    dispatch(actions.logout(undefined));
    history.push({
      pathname: '/login',
    });
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem color="inherit" onClick={handleNavigate('/profile')}>
          Profile
        </MenuItem>
        <MenuItem color="inherit" onClick={handleNavigate('/edit')}>
          Edit Profile
        </MenuItem>
        <MenuItem />
        <MenuItem color="inherit" onClick={handleNavigate('/requests')}>
          Requests
        </MenuItem>

        <Divider />
        <MenuItem color="inherit" onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
