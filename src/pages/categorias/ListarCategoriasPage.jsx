import React, { useEffect, useState } from 'react';
import { Folder } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { listarCategorias } from '@/api/index';

export default function ListarCategoriasPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const categorias = await listarCategorias();
        setCategories(categorias);
      } catch (err) {
        setError('Error al cargar las categorías.');
      } finally {
        setLoading(false);
      }
    }
    fetchCategorias();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-masala-900 text-center">Categorías disponibles</h1>
      {loading ? (
        <p className="text-center">Cargando categorías...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="flex flex-col items-center p-4 text-center shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="flex flex-col items-center p-0">
                <Folder className="h-12 w-12 text-masala-700 mb-4" />
                <p className="text-lg font-medium">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
