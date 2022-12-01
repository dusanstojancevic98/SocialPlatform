import axios from 'axios';

const login = async (username: string, password: string) => {
  const res = await axios.post('http://localhost:5000/api/users/login', {
    username,
    password,
  });
  if (res.status !== 200) throw new Error('Wrong username or password');
  localStorage.setItem('token', res.data);
};

const logout = () => {
  localStorage.removeItem('token');
};

const checkLogin = () => {
  return localStorage.getItem('token') !== null;
};

const getUserData = async () => {
  try {
    if (!localStorage.getItem('token')) return null;
    const res = await axios.get('http://localhost:5000/users/userData');
    return res.data;
  } catch (error) {
    return null;
  }
};
export { login, logout, getUserData, checkLogin };
