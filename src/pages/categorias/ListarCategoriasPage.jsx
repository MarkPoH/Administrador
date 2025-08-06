import React from 'react';
import { Folder } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ListarCategoriasPage() {
  const categories = [
    { name: 'Tragedia', icon: Folder },
    { name: 'Drama', icon: Folder },
    { name: 'Bizantina', icon: Folder },
    { name: 'Romance', icon: Folder },
    { name: 'Morisca', icon: Folder },
    { name: 'Sátira', icon: Folder },
    { name: 'Aventuras', icon: Folder },
    { name: 'Realismo', icon: Folder },
    { name: 'Comedia', icon: Folder },
    { name: 'Historias', icon: Folder },
    { name: 'Fantasía', icon: Folder },
    { name: 'Ciencia', icon: Folder },
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-white"> {/* Fondo blanco */}
      <h1 className="text-3xl font-bold mb-6 text-masala-900 text-center">Categorías disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Card key={index} className="flex flex-col items-center p-4 text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-center p-0">
              <category.icon className="h-12 w-12 text-masala-700 mb-4" />
              <p className="text-lg font-medium">{category.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
