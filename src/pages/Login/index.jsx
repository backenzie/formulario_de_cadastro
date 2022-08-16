import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { useState } from 'react';
import * as yup from 'yup';
// import { api } from '../../services/api';
import './style.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const schema = yup.object({
  email: yup.string().email().required('Campo Obrigatório'),
  password: yup.string().required('Senha ou E-mail incorretos'),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { login, goToCadastro } = useContext(AuthContext);

  return (
    <>
      <h1>Kenzie Hub</h1>
      <div className="divLoginMain">
        <div className="divForm">
          <h3>Login</h3>
          <form className="form" onSubmit={handleSubmit(login)}>
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              placeholder="Digite aqui seu Email"
              {...register('email')}
            />
            <span>{errors.email?.message}</span>

            <label htmlFor="password">Senha</label>
            <input
              type="password"
              placeholder="Digite aqui sua senha"
              id="password"
              {...register('password')}
            />
            <span>{errors.password?.message}</span>

            <button type="submit">Entrar</button>
            <div className="divCadastro">
              <p>Ainda não possui uma conta?</p>
              <button onClick={goToCadastro} type="button">
                Cadastre-se
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
