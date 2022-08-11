import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Cadastro } from '../pages/Cadastro';
import { Login } from '../pages/Login';
import { Home } from '../pages/Homepage';

export const RoutesMain = () => (
  <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </>
);
