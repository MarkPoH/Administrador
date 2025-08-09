import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { listarLibros, listarCategorias } from '@/api/index';

export default function ListarLibrosPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState(['Todas']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const libros = await listarLibros();
        setBooks(libros);
        const categorias = await listarCategorias();
        setCategories(['Todas', ...categorias.map(cat => cat.name)]);
      } catch (err) {
        setError('Error al cargar libros o categorías.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredBooks = selectedCategory === 'Todas'
    ? books
    : books.filter(book => book.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-masala-900">Catálogo de Libros</h1>
      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="category-filter" className="text-masala-700">Filtrar por categoría:</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger id="category-filter" className="w-[180px]">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {loading ? (
        <p className="text-center">Cargando libros...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book, index) => (
            <Card key={index} className="flex flex-col items-center p-4 text-center shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="flex flex-col items-center p-0">
                <img
                  src={book.image || "/placeholder.svg"}
                  alt={`Portada de ${book.title}`}
                  width={150}
                  height={200}
                  className="object-cover mb-4 rounded-sm"
                />
                <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                <p className="text-sm text-masala-600 mb-2">{book.author}</p>
                <p className="text-lg font-bold text-masala-700">S/{book.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
