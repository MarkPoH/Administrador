import React from 'react';
import { LayoutDashboard, Users, Folder, Book, Home } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export default function Sidebar({ setCurrentPage, currentPage }) {
  const navItems = [
    {
      section: 'Panel Admin',
      links: [
        { href: '/dashboard-admin', label: 'Dashboard Admin', icon: LayoutDashboard },
      ],
    },
    {
      section: 'Autores',
      links: [
        { href: '/autores/registrar', label: 'Registrar Autor', icon: Users },
        { href: '/autores/editar', label: 'Editar Autor', icon: Users },
        { href: '/autores/listar', label: 'Listar Autores', icon: Users },
      ],
    },
    {
      section: 'Categorías',
      links: [
        { href: '/categorias/crear', label: 'Crear Categoría', icon: Folder },
        { href: '/categorias/editar', label: 'Editar Categoría', icon: Folder },
        { href: '/categorias/listar', label: 'Listar Categorías', icon: Folder },
      ],
    },
    {
      section: 'Libros',
      links: [
        { href: '/libros/crear', label: 'Crear Libro', icon: Book },
        { href: '/libros/editar', label: 'Editar Libro', icon: Book },
        { href: '/libros/eliminar', label: 'Eliminar Libro', icon: Book },
        { href: '/libros/listar', label: 'Listar Libros', icon: Book },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-masala-950 text-masala-50 p-6 flex flex-col shadow-lg">
      <div className="flex items-center gap-2 mb-8">
        <Home className="h-6 w-6" />
        <span className="text-xl font-semibold">Panel Admin</span>
      </div>
      <nav className="space-y-2">
        {/* Sección de Panel Admin (no es un acordeón) */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-masala-300 uppercase tracking-wider mb-2">
            Panel Admin
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                onClick={() => setCurrentPage('/dashboard-admin')}
                className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                  currentPage === '/dashboard-admin'
                    ? 'bg-masala-800 text-masala-50'
                    : 'hover:bg-masala-900 text-masala-100'
                }`}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard Admin</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Secciones de Autores, Categorías, Libros (como acordeones) */}
        <Accordion type="multiple" className="w-full">
          {navItems.slice(1).map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="flex items-center gap-3 p-2 rounded-md text-masala-300 hover:text-masala-50 hover:no-underline">
                <span className="text-sm font-medium uppercase tracking-wider">
                  {item.section}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <ul className="space-y-2 pl-4">
                  {item.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href="#"
                        onClick={() => setCurrentPage(link.href)}
                        className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                          currentPage === link.href
                            ? 'bg-masala-800 text-masala-50'
                            : 'hover:bg-masala-900 text-masala-100'
                        }`}
                      >
                        <link.icon className="h-5 w-5" />
                        <span>{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </nav>
    </aside>
  );
}
