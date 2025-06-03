import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import TrimestrePage from './components/TrimestrePage';
import DisciplinaPage from './components/DisciplinaPage';
import AtividadePage from './components/AtividadePage';
import CalendarioPage from './components/CalendarioPage';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="trimestre/:trimestre" element={<TrimestrePage />} />
        <Route path="trimestre/:trimestre/:disciplina" element={<DisciplinaPage />} />
        <Route path="atividade/:trimestre/:disciplina/:id" element={<AtividadePage />} />
        <Route path="calendario" element={<CalendarioPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
