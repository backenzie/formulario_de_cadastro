import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import './style.css';

const schema = yup.object({
  name: yup.string().required('Nome Obrigatório').max(30),
  email: yup
    .string()
    .email('Precisa ser um E-mail!')
    .required('E-mail Obrigatório!'),
  password: yup
    .string()
    .required('Campo Obrigatório')
    .matches(/[A-Z]/, 'deve conter ao menos 1 letra maiúscula')
    .matches(/([a-z])/, 'deve conter ao menos 1 letra minúscula')
    .matches(/(\d)/, 'deve conter ao menos 1 número')
    .matches(/(\W)|_/, 'deve conter ao menos 1 caracter especial')
    .matches(/.{8,}/, 'deve conter ao menos 8 dígitos'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'A senha não Combina'),
  contact: yup.string().required('Contato é Obrigatório'),
});

export const Cadastro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { exit, registerUser } = useContext(AuthContext);

  return (
    <div className="divMain">
      <div className="divHeader">
        <h1>KenzieHub</h1>
        <button onClick={exit} type="button">
          Voltar
        </button>
      </div>

      <form className="formCadastro" onSubmit={handleSubmit(registerUser)}>
        <div className="divInitForm">
          <h3>Crie sua conta</h3>
          <p>Rapido e grátis, vamos nessa</p>
        </div>

        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          placeholder="Nome Completo"
          {...register('name')}
        />

        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          placeholder="E-mail"
          {...register('email')}
        />

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          placeholder="Senha"
          {...register('password')}
        />

        <label htmlFor="confirmPassword">Confirmar Senha</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirmar Senha"
        />

        <label htmlFor="bio">Bio</label>
        <input
          type="text"
          id="bio"
          placeholder="Conte-nos um pouco sobre você"
          {...register('bio')}
        />

        <label htmlFor="contact">Contato</label>
        <input
          type="text"
          id="contact"
          placeholder="Linkedin de Preferência"
          {...register('contact')}
        />
        <label htmlFor="mod">
          <span id="mod">Selecionar Módulo</span>
        </label>
        <select id="course_module" {...register('course_module')}>
          <option value="Primeiro módulo (Introdução ao Frontend)">
            Primeiro módulo - Introdução ao Frontend
          </option>
          <option
            value="Segundo módulo (Frontend
            Avançado)"
          >
            Segundo módulo - Frontend Avançado
          </option>
          <option value="Terceiro módulo (Introdução ao Backend)">
            Terceiro módulo - Introdução ao Backend
          </option>
          <option value="Quarto módulo (Backend Avançado)">
            Quarto módulo - Backend Avançado
          </option>
        </select>
        <button type="submit">Cadastrar</button>
      </form>
      <ul className="ulErrors">
        <li>{errors.name?.message}</li>
        <li>{errors.email?.message}</li>
        <li>{errors.password?.message}</li>
        <li>{errors.confirmPassword?.message}</li>
        <li>{errors.contact?.message}</li>
      </ul>
    </div>
  );
};
