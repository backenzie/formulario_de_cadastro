import { useNavigate, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import './styles.css';

export const Home = () => {
  const navigate = useNavigate();

  const { user, loading } = useContext(AuthContext);

  function logout() {
    navigate('/', { replace: true });
    localStorage.removeItem('@USERID');
    localStorage.removeItem('@TOKEN');
  }
  if (loading) return <div>Carregando...</div>;
  return user ? (
    <div className="container">
      <header>
        <h1>Kenzie Hub</h1>
        <button onClick={logout} type="button">
          Sair
        </button>
      </header>
      <div className="divUser">
        <h3>{`Olá ${user.name}`}</h3>
        <span>{user.course_module}</span>
      </div>
      <div className="divMessage">
        <h4>Que pena! Estamos em desenvolvimento...</h4>
        <p>Nossa aplicação esta em desenvolvimento, em breve novidades...</p>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};
