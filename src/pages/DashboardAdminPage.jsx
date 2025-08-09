import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Users, BookOpen, FileText, CalendarDays, UserPlus } from 'lucide-react';
import { listarAutores, listarCategorias, listarLibros } from '@/api/index';

export default function DashboardAdminPage() {
  const [stats, setStats] = useState([
    { title: 'Total Ventas', value: 'S/ 0.00', icon: ShoppingCart, iconColor: 'text-green-500' },
    { title: 'Autores Registrados', value: '...', icon: Users, iconColor: 'text-blue-500' },
    { title: 'Usuarios Registrados', value: '...', icon: UserPlus, iconColor: 'text-purple-500' },
    { title: 'Libros en Catálogo', value: '...', icon: BookOpen, iconColor: 'text-orange-500' },
    { title: 'Compras Realizadas', value: '...', icon: FileText, iconColor: 'text-red-500' },
    { title: 'Categorías Disponibles', value: '...', icon: CalendarDays, iconColor: 'text-indigo-500' },
  ]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const autores = await listarAutores();
        const categorias = await listarCategorias();
        const libros = await listarLibros();
        setStats((prev) => prev.map((stat) => {
          if (stat.title === 'Autores Registrados') return { ...stat, value: autores.length };
          if (stat.title === 'Libros en Catálogo') return { ...stat, value: libros.length };
          if (stat.title === 'Categorías Disponibles') return { ...stat, value: categorias.length };
          return stat;
        }));
      } catch (err) {
        // Manejo de error simple
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-masala-900 dark:text-masala-100">Dashboard - Administración</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 shadow-md bg-white dark:bg-masala-900">
            <CardContent className="flex items-center justify-between p-0">
              <div>
                <p className="text-masala-700 dark:text-masala-300 text-sm mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-masala-900 dark:text-masala-100">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.iconColor}`} />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="p-6 shadow-md bg-white dark:bg-masala-900">
        <CardContent className="p-0">
          <h2 className="text-xl font-semibold mb-2 text-masala-900 dark:text-masala-100">Próximamente: Análisis por día y mes</h2>
          <p className="text-masala-600 dark:text-masala-400">Funcionalidad en desarrollo...</p>
        </CardContent>
      </Card>
    </div>
  );
}
