import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function EditarLibroPage() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { id: '1', name: 'Tragedia' },
    { id: '2', name: 'Drama' },
    { id: '3', name: 'Fantasía' },
    { id: '4', name: 'Ciencia Ficción' },
    { id: '5', name: 'Misterio' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Editar Libro con categoría:', selectedCategory);
    alert(`Libro editado para la categoría: ${selectedCategory}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white"> {/* Fondo blanco */}
      <h1 className="text-3xl font-bold mb-6 text-masala-900 text-center">Editar Libro</h1>
      <Card className="max-w-md mx-auto p-6 shadow-lg bg-white dark:bg-masala-900">
        <CardContent className="p-0 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="category-select" className="text-masala-700 dark:text-masala-300">Seleccionar Categoría</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category-select" className="w-full mt-1 border-masala-300 dark:border-masala-700 bg-masala-100 dark:bg-masala-800 text-masala-950 dark:text-masala-50">
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Aquí iría el resto del formulario de edición del libro, similar al de creación */}
            <Button
              type="submit"
              className="w-full bg-masala-900 text-white hover:bg-masala-800 dark:bg-masala-700 dark:hover:bg-masala-600"
            >
              Actualizar Libro
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
