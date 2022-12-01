import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { User } from '../../components/User';
import { selectSearchResult } from './slice/selectors';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSearchPageSlice } from './slice';
import { SearchParam } from './slice/types';
import { selectUser } from '../LoginPage/slice/selectors';

export function SearchUserPage() {
  const searchResult = useSelector(selectSearchResult);

  const currentUser = useSelector(selectUser);

  const dispatch = useDispatch();

  const { actions } = useSearchPageSlice();

  const { search } = useParams<SearchParam>();

  useEffect(() => {
    dispatch(actions.search(search));
  }, [search, dispatch, actions]);

  const handleAdd = (senderId: number, reciverId: number) => {
    dispatch(actions.addFriend([senderId, reciverId]));
  };
  return (
    <>
      <Helmet>
        <title>User result</title>
        <meta name="description" content="Result of search" />
      </Helmet>
      <div className="container">
        <h3>Search result</h3>
        <div>
          {searchResult ? (
            searchResult.length === 0 ? (
              <h4>Nema rezultata</h4>
            ) : currentUser?.id !== -1 ? (
              searchResult.map(user =>
                user.friends === null ? (
                  <User
                    key={user.id}
                    user={user}
                    addFriend={() => {
                      if (currentUser) handleAdd(currentUser.id, user.id);
                    }}
                    loggedIn={true}
                  />
                ) : (
                  <User
                    key={user.id}
                    user={user}
                    addFriend={undefined}
                    loggedIn={true}
                  />
                ),
              )
            ) : (
              searchResult.map(user => (
                <User
                  key={user.id}
                  user={user}
                  addFriend={undefined}
                  loggedIn={false}
                />
              ))
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
