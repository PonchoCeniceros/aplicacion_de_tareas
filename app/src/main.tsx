// dominio
// aplicación
// infraestructura
import './main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ui
import LoginForm from './features/auth/components/LoginForm';
import Sidebar from './components/sidebar';
import FormPage from './pages/form';
import ListPage from './pages/list';

/**
 *
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Sidebar />}>
          <Route path="form" element={<FormPage />} />
          <Route path="list" element={<ListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
