/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import './modalAddStyle.css';

const schema = yup.object({
  title: yup.string().required('Nome da tech Obrigatório!'),
});

export const ModalAddTech = ({ setModalAdd }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { addTech } = useContext(AuthContext);

  return (
    <div className="divContainer">
      <div className="formContainer">
        <div className="divHeaderAddTech">
          <h2>Cadastrar tecnologia</h2>
          <button
            type="button"
            onClick={() => {
              setModalAdd(false);
            }}
          >
            X
          </button>
        </div>
        <form className="formAddTech" onSubmit={handleSubmit(addTech)}>
          <label htmlFor="title">Nome</label>
          <input
            type="text"
            id="title"
            placeholder="Ex  -  JavaScript"
            {...register('title')}
          />
          <p>{errors.tittle?.message}</p>
          <p className="pStatus">Selecione um status</p>
          <select id="status" {...register('status')}>
            <option value="iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
          <button type="submit">Cadastrar Tecnologia</button>
        </form>
      </div>
    </div>
  );
};
