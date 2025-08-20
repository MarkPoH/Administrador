import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children, setCurrentPage, currentPage }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}