import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { listarLibros, listarCategorias } from '@/api/index';

export default function ListarLibrosPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState(['Todas']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [librosData, categoriasData] = await Promise.all([
          listarLibros(),
          listarCategorias()
        ]);
        setBooks(Array.isArray(librosData) ? librosData : librosData.libros || []);
        setCategories(['Todas', ...(Array.isArray(categoriasData) ? categoriasData.map(cat => cat.nombre || cat.name) : [])]);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos del catálogo.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredBooks = selectedCategory === 'Todas'
    ? books
    : books.filter(book => book.categoria === selectedCategory || book.categoria_nombre === selectedCategory);

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
      {loading && <div className="text-center py-8"><p>Cargando libros...</p></div>}
      {error && <div className="text-center py-8 text-red-600"><p>{error}</p></div>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <Card key={book.id || index} className="flex flex-col items-center p-4 text-center shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center p-0">
                  <img
                    src={book.imagen_portada || "/placeholder.svg"}
                    alt={`Portada de ${book.titulo || book.title}`}
                    width={150}
                    height={200}
                    className="object-cover mb-4 rounded-sm"
                    onError={e => { e.target.src = "/placeholder.svg"; }}
                  />
                  <h3 className="text-lg font-semibold mb-1">{book.titulo || book.title}</h3>
                  <p className="text-sm text-masala-600 mb-2">{book.autor_nombre || book.author}</p>
                  <p className="text-lg font-bold text-masala-700">S/{book.precio || book.price}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-600">No se encontraron libros.</p>
          )}
        </div>
      )}
    </div>
  );
}
