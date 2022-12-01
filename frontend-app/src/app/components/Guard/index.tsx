import { Redirect } from 'react-router-dom';

export const Guard = ({ children, auth, redirect }) => {
  return auth ? children : <Redirect to={redirect} />;
};
