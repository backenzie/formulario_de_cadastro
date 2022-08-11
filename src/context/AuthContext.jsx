/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem('@TOKEN');
      if (token) {
        try {
          api.defaults.headers.authorization = `Bearer ${token}`;

          const { data } = await api.get('/profile');
          setUser(data);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async (data) => {
    const response = await api.post('/sessions', data);

    const { token } = response.data;
    api.defaults.headers.authorization = `Bearer ${token}`;
    setUser(response.data.user);

    localStorage.setItem('@USERID', response.data.user.id);
    localStorage.setItem('@TOKEN', response.data.token);

    navigate('/home', { replace: true });
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
