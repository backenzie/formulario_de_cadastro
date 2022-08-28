/* eslint-disable react/no-array-index-key */
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ModalAddTech } from '../../components/modalAddTech';

import { AuthContext } from '../../context/AuthContext';

import './styles.css';

export const Home = () => {
  const { user, loading, logout, modalAdd, setModalAdd, removeTech } =
    useContext(AuthContext);

  if (loading) return <Navigate to="/" />;

  return user ? (
    <div className="container">
      {modalAdd && <ModalAddTech setModalAdd={setModalAdd} />}
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
      <div className="contanerTechs">
        <div className="headerTechs">
          <p>Tecnologias</p>
          <button
            type="button"
            onClick={() => {
              setModalAdd(true);
            }}
          >
            +
          </button>
        </div>
        <div className="divUl">
          <ul>
            {user.techs?.map((resp) => (
              <li key={resp.id}>
                <div className="divTechs">
                  <span>{resp.title}</span>
                  <p>{resp.status}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    removeTech(resp.id);
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};
