import React, { useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import Sidebar from './components/Sidebar.jsx';
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
        return <DashboardAdminPage />;
      case '/autores/listar':
        return <ListarAutoresPage />;
      case '/autores/registrar':
        return <RegistrarAutorPage />;
      case '/autores/editar':
        return <EditarAutorPage />;
      case '/categorias/listar':
        return <ListarCategoriasPage />;
      case '/categorias/crear':
        return <CrearCategoriaPage />;
      case '/categorias/editar':
        return <EditarCategoriaPage />;
      case '/libros/listar':
        return <ListarLibrosPage />;
      case '/libros/crear':
        return <CrearLibroPage />;
      case '/libros/editar':
        return <EditarLibroPage />;
      case '/libros/eliminar':
        return <EliminarLibroPage />;
      default:
        return <DashboardAdminPage />; // Página por defecto
    }
  };

  return (
    <div className="flex min-h-screen bg-white"> {/* Fondo blanco para toda la aplicación */}
      {isLoggedIn && <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />}
      <main className={`flex-1 ${isLoggedIn ? 'p-6 md:p-8 lg:p-10' : ''}`}>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;