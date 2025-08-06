import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

export default function CrearCategoriaPage() {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Crear Categoría:', { categoryName });
    // Aquí iría la lógica para enviar los datos a tu API/base de datos
    alert(`Categoría "${categoryName}" creada.`);
    setCategoryName('');
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white"> {/* Fondo blanco */}
      <h1 className="text-3xl font-bold mb-6 text-masala-900 text-center">Crear Categoría</h1>
      <Card className="max-w-md mx-auto p-6 shadow-lg bg-white dark:bg-masala-900">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="category-name" className="text-masala-700 dark:text-masala-300">Nombre de la categoría</Label>
              <Input
                id="category-name"
                type="text"
                placeholder="Nombre de la categoría"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                className="mt-1 block w-full border-masala-300 dark:border-masala-700 bg-masala-100 dark:bg-masala-800 text-masala-950 dark:text-masala-50"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-masala-900 text-white hover:bg-masala-800 dark:bg-masala-700 dark:hover:bg-masala-600"
            >
              Crear
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
