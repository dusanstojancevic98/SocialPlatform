/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import '../styles/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useCurrentUserSlice } from './pages/LoginPage/slice';
import { selectUser } from './pages/LoginPage/slice/selectors';
import { HomePage } from './pages/HomePage/Loadable';
import { SearchUserPage } from './pages/SearchUserPage/Loadable';
import { LoginPage } from './pages/LoginPage';
import { Guard } from './components/Guard/Loadable';
import { RegisterPage } from './pages/RegisterPage/Loadable';
import { ProfilePage } from './pages/ProfilePage/Loadable';
import { FriendRequestsPage } from './pages/FriendRequests/Loadable';
import { EditProfilePage } from './pages/EditProfilePage/Loadable';
import { MessagesPage } from './pages/MessagesPage/Loadable';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { HeroPage } from './pages/HeroPage/Loadable';

export function App() {
  const dispatch = useDispatch();

  const { actions } = useCurrentUserSlice();

  const currentUser = useSelector(selectUser);
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    dispatch(actions.getUser());
    dispatch(actions.getUsers());
    setAuth(currentUser?.id !== -1);
  }, []);

  useEffect(() => {
    setAuth(currentUser?.id !== -1);
  }, [currentUser]);

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - InviggoNet"
        defaultTitle="InviggoNet"
      ></Helmet>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        <Route
          exact
          path="/"
          component={() => (auth ? <HomePage /> : <HeroPage />)}
        />
        <Route
          exact
          path="/search/:search"
          component={() => <SearchUserPage />}
        />
        <Route exact path="/edit" component={() => <EditProfilePage />} />
        <Route
          exact
          path="/login"
          component={() => (
            <Guard auth={!auth} redirect={'/'}>
              <LoginPage />
            </Guard>
          )}
        />
        <Route
          exact
          path="/register"
          component={() => (
            <Guard auth={!auth} redirect={'/'}>
              <RegisterPage />
            </Guard>
          )}
        />
        <Route
          exact
          path="/user/:userId"
          component={() => (
            <Guard auth={auth} redirect={'/login'}>
              <ProfilePage />
            </Guard>
          )}
        />
        <Route
          exact
          path="/profile"
          component={() => (
            <Guard auth={auth} redirect={'/login'}>
              <ProfilePage />
            </Guard>
          )}
        />
        <Route
          exact
          path="/requests"
          component={() => (
            <Guard auth={auth} redirect={'/login'}>
              <FriendRequestsPage />
            </Guard>
          )}
        />
        <Route exact path="/messages" component={MessagesPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </BrowserRouter>
  );
}
