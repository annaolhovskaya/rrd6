import React from 'react';
import {
  Link,
  Outlet,
  Route,
  Routes,
  Navigate,
  useParams,
  useLocation,
} from 'react-router-dom';

const AppLayout = () => {
  return (
    <>
      <h1>App Layout</h1>
      <HomePage />
    </>
  );
};

const UsersLayout = () => {
  let { pathname } = useLocation();
  const { userId } = useParams();

  if (pathname === `/users/${userId}/`) {
    return <Navigate to={`/users/${userId}/profile`} />;
  }

  return <Outlet />;
};

const HomePage = () => {
  return (
    <>
      <Link to="/users">Users List page</Link>
      <h1>Home Page</h1>
    </>
  );
};

const UsersListPage = () => {
  const users = [
    { id: 1, name: 'user 0' },
    { id: 2, name: 'user 1' },
    { id: 3, name: 'user 2' },
    { id: 4, name: 'user 3' },
    { id: 5, name: 'user 4' },
  ];

  const { pathname } = useLocation();
  if (pathname === '/users/') {
    return <Navigate to="/users" />;
  }

  return (
    <>
      <Link to="/">Home Page</Link>
      <h1>Users List page</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const UserPage = () => {
  const { userId } = useParams();

  return (
    <>
      <h1>User page</h1>
      <ul>
        <li>
          <Link to={`/users/${userId}/edit`}>Edit this user</Link>
        </li>
        <li>
          <Link to="/users">Users list page</Link>
        </li>
      </ul>
      <p>userId: {userId}</p>
    </>
  );
};

const UserEditPage = () => {
  const { userId } = useParams();

  return (
    <>
      <h1>Edit user page</h1>
      <ul>
        <li>
          <Link to={`/users/${userId}/profile`}>User profile page</Link>
        </li>
        <li>
          <Link to={`/users/${+userId + 1}`}>Another user</Link>
        </li>
        <li>
          <Link to="/users">Users list page</Link>
        </li>
      </ul>
    </>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route index element={<AppLayout />} />
        <Route path="users">
          <Route index element={<UsersListPage />} />
          <Route path=":userId/*" element={<UsersLayout />}>
            <Route index element={<UserPage />} />
            <Route path="profile" element={<UserPage />} />
            <Route path="edit" element={<UserEditPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
