import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(page);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar setCurrentPage={handlePageChange} currentPage={currentPage} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}