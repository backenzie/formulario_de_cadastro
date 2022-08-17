/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '../services/api';

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalAdd, setModalAdd] = useState(false);

  const navigate = useNavigate();

  /* função que registra o usuario */
  async function registerUser(data) {
    await api.post('/users', data).then(() => {
      toast.success('login realizado com sucesso', {
        duration: 2000,
      });
      navigate('/');
    });
  }
  /* função de redirecionamento(p/login) do boão de saida do formulario de cadastro */
  function exit() {
    navigate('/');
  }
  /* useEffect setado para garantir mais segurança e para manter salvo o bearer de autorização */
  async function loadUser() {
    const token = localStorage.getItem('@TOKEN');
    if (token) {
      try {
        api.defaults.headers.Authorization = `Bearer ${token}`;

        const { data } = await api.get('/profile');
        setUser(data);
        navigate('/home');
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  }
  useEffect(() => {
    loadUser();
  }, []);
  /* função que faz o logOut e limpa o localStorage */
  function logout() {
    navigate('/', { replace: true });
    localStorage.removeItem('@USERID');
    localStorage.removeItem('@TOKEN');
  }
  /* função de login do usuario */
  const login = async (data) => {
    const response = await api.post('/sessions', data);

    const { token } = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(response.data.user);

    localStorage.setItem('@USERID', response.data.user.id);
    localStorage.setItem('@TOKEN', response.data.token);

    toast.success('login realizado com sucesso', {
      duration: 2000,
    });
    toast.success('você será redicionado para a Home!', {
      duration: 1000,
    });
    navigate('/home', { replace: true });
  };
  /* função que leva o usuario a tela de cadastro */
  function goToCadastro() {
    navigate('/cadastro', { replace: true });
  }
  /* função para adicionar novas techs */
  async function addTech(data) {
    await api.post('/users/techs', data).then((response) => {
      if (response) {
        toast.success('Tech criada com sucesso', {
          duration: 2000,
        });
        loadUser();
        setModalAdd(false);
      } else {
        toast.error('Não é possivel criar techs com o mesmo nome');
      }
    });
  }
  /* função para remover techs */
  async function removeTech(techID) {
    await api.delete(`/users/techs/${techID}`).then((resp) => {
      if (resp) {
        toast.success('Tech removida com sucesso', {
          duration: 2000,
        });
        loadUser();
      }
    });
  }
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider
      value={{
        user,
        modalAdd,
        loading,
        login,
        goToCadastro,
        registerUser,
        exit,
        setModalAdd,
        addTech,
        removeTech,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
