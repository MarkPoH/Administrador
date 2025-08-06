import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';

export default function EditarCategoriaPage() {
  const categories = [
    { id: 1, name: 'Tragedia' },
    { id: 2, name: 'Drama' },
    { id: 3, name: 'Bizantina' },
    { id: 4, name: 'Romance' },
    { id: 5, name: 'Morisca' },
    { id: 6, name: 'Sátira' },
    { id: 7, name: 'Aventuras' },
    { id: 8, name: 'Realismo' },
    { id: 9, name: 'Comedia' },
    { id: 10, name: 'Historias' },
    { id: 11, name: 'Fantasía' },
    { id: 12, name: 'Ciencia' },
  ];

  const handleEdit = (id) => {
    console.log(`Editar categoría con ID: ${id}`);
    // Lógica para navegar a la página de edición de categoría o abrir un modal
  };

  const handleDelete = (id) => {
    console.log(`Eliminar categoría con ID: ${id}`);
    // Lógica para eliminar la categoría (con confirmación)
    if (confirm(`¿Estás seguro de que quieres eliminar la categoría con ID ${id}?`)) {
      // Lógica de eliminación real
      alert(`Categoría con ID ${id} eliminada.`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white"> {/* Fondo blanco */}
      <h1 className="text-3xl font-bold mb-6 text-masala-900 text-center">Editar Categorías</h1>
      <div className="space-y-4 max-w-lg mx-auto">
        {categories.map(category => (
          <Card key={category.id} className="flex items-center justify-between p-4 shadow-sm bg-white dark:bg-masala-900">
            <span className="text-lg font-medium text-masala-900 dark:text-masala-100">{category.name}</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(category.id)}>
                <Edit className="h-5 w-5 text-masala-700 dark:text-masala-300" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)}>
                <Trash2 className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
