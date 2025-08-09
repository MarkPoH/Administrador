import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

// Dashboard
import DashboardAdminPage from '../pages/DashboardAdminPage';

// Autores
import ListarAutoresPage from '../pages/autores/ListarAutoresPage';
import EditarAutorPage from '../pages/autores/EditarAutorPage';
import RegistrarAutorPage from '../pages/autores/RegistrarAutorPage';

// Categorías
import ListarCategoriasPage from '../pages/categorias/ListarCategoriasPage';
import CrearCategoriaPage from '../pages/categorias/CrearCategoriaPage';
import EditarCategoriaPage from '../pages/categorias/EditarCategoriaPage';

// Libros
import ListarLibrosPage from '../pages/libros/ListarLibrosPage';
import CrearLibroPage from '../pages/libros/CrearLibroPage';
import EditarLibroPage from '../pages/libros/EditarLibroPage';
import EliminarLibroPage from '../pages/libros/EliminarLibroPage';

import { getToken } from '../utils/token';

function PrivateRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage onLoginSuccess={() => window.location.href = '/dashboard'} />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardAdminPage />
            </PrivateRoute>
          }
        />

        {/* Autores */}
        <Route
          path="/autores"
          element={
            <PrivateRoute>
              <ListarAutoresPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/autores/editar/:id"
          element={
            <PrivateRoute>
              <EditarAutorPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/autores/registrar"
          element={
            <PrivateRoute>
              <RegistrarAutorPage />
            </PrivateRoute>
          }
        />

        {/* Categorías */}
        <Route
          path="/categorias"
          element={
            <PrivateRoute>
              <ListarCategoriasPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/categorias/crear"
          element={
            <PrivateRoute>
              <CrearCategoriaPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/categorias/editar/:id"
          element={
            <PrivateRoute>
              <EditarCategoriaPage />
            </PrivateRoute>
          }
        />

        {/* Libros */}
        <Route
          path="/libros"
          element={
            <PrivateRoute>
              <ListarLibrosPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/libros/crear"
          element={
            <PrivateRoute>
              <CrearLibroPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/libros/editar/:id"
          element={
            <PrivateRoute>
              <EditarLibroPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/libros/eliminar/:id"
          element={
            <PrivateRoute>
              <EliminarLibroPage />
            </PrivateRoute>
          }
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}