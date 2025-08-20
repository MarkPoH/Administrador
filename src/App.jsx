import React, { useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import Layout from './components/Layout.jsx';
import DashboardAdminPage from './pages/DashboardAdminPage.jsx';
import ListarAutoresPage from './pages/autores/ListarAutoresPage.jsx';
import RegistrarAutorPage from './pages/autores/RegistrarAutorPage.jsx';
import EditarAutorPage from './pages/autores/EditarAutorPage.jsx';
import ListarCategoriasPage from './pages/categorias/ListarCategoriasPage.jsx';
import CrearCategoriaPage from './pages/categorias/CrearCategoriaPage.jsx';
import EditarCategoriaPage from './pages/categorias/EditarCategoriaPage.jsx';
import ListarLibrosPage from './pages/libros/ListarLibrosPage.jsx';
import CrearLibroPage from './pages/libros/CrearLibroPage.jsx';
import EditarLibroPage from './pages/libros/EditarLibroPage.jsx';
import EliminarLibroPage from './pages/libros/EliminarLibroPage.jsx';

function App() {
  // Estado para simular el enrutamiento y el estado de login
  const [currentPage, setCurrentPage] = useState('/login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('/dashboard-admin'); // Redirige al dashboard después del login
  };

  const renderPage = () => {
    if (!isLoggedIn && currentPage !== '/login') {
      return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    switch (currentPage) {
      case '/login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      case '/dashboard-admin':
        return <Layout setCurrentPage={setCurrentPage} currentPage={currentPage}><DashboardAdminPage /></Layout>;
      case '/autores/listar':
        return <Layout setCurrentPage={setCurrentPage} currentPage={currentPage}><ListarAutoresPage /></Layout>;
      case '/autores/registrar':
        return <Layout setCurrentPage={setCurrentPage} currentPage={currentPage}><RegistrarAutorPage /></Layout>;
      case '/autores/editar':
        return <Layout setCurrentPage={setCurrentPage} currentPage={currentPage}><EditarAutorPage setCurrentPage={setCurrentPage} currentPage={currentPage} /></Layout>;
      case '/categorias/listar':
        return <Layout setCurrentPage={setCurrentPage} currentPage={currentPage}><ListarCategoriasPage /></Layout>;
      case '/categorias/crear':
        return <Layout setCurrentPage={setCurrentPage} currentPage={currentPage}><CrearCategoriaPage /></Layout>;
      case '/categorias/editar':
        return <Layout setCurrentPage={setCurrentPage} currentPage={currentPage}><EditarCategoriaPage /></Layout>;
      case '/libros/listar':
        return <Layout setCurrentPage={setCurrentPage} currentPage={currentPage}><ListarLibrosPage /></Layout>;
      case '/libros/crear':
        return <Layout setCurrentPage={setCurrentPage} currentPage={currentPage}><CrearLibroPage /></Layout>;
      case '/libros/editar':
        return <Layout setCurrentPage={setCurrentPage} currentPage={currentPage}><EditarLibroPage /></Layout>;
      case '/libros/eliminar':
        return <Layout setCurrentPage={setCurrentPage} currentPage={currentPage}><EliminarLibroPage /></Layout>;
      default:
        return <Layout setCurrentPage={setCurrentPage} currentPage={currentPage}><DashboardAdminPage /></Layout>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  );
}

export default App;