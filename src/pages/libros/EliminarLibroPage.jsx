import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { listarLibros, listarCategorias, eliminarLibro } from '@/api/index';
import { Modal } from '@/components/ui/modal';

export default function EliminarLibroPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState(['Todas']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

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
        setError('Error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredBooks = selectedCategory === 'Todas'
    ? books
    : books.filter(book => book.categoria === selectedCategory || book.categoria_nombre === selectedCategory);

  const handleDelete = async (id) => {
    const book = books.find(b => b.id === id);
    setSelectedBook(book);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    setError(null);
    setSuccess('');
    try {
      await eliminarLibro(selectedBook.id);
      setSuccess('Libro eliminado correctamente.');
      setBooks(prev => prev.filter(book => book.id !== selectedBook.id));
      setDeleteModalOpen(false);
    } catch (err) {
      setError('Error al eliminar el libro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-masala-900 text-center">Eliminar Libros</h1>
      <Card className="max-w-md mx-auto p-6 shadow-lg bg-white dark:bg-masala-900">
        <CardContent className="p-0 space-y-6">
          <div className="mb-4">
            <Label htmlFor="category-select" className="text-masala-700 dark:text-masala-300">Seleccionar Categoría</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category-select" className="w-full mt-1 border-masala-300 dark:border-masala-700 bg-masala-100 dark:bg-masala-800 text-masala-950 dark:text-masala-50">
                <SelectValue placeholder="Todas las categorías" />
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
          {loading && <div className="text-center py-4">Cargando libros...</div>}
          {error && <div className="text-red-600 text-center">{error}</div>}
          {success && <div className="text-green-600 text-center">{success}</div>}
          {!loading && !error && filteredBooks.length > 0 && (
            <div className="space-y-4">
              {filteredBooks.map(book => (
                <Card key={book.id} className="flex items-center justify-between p-2 shadow-sm">
                  <div>
                    <span className="font-medium">{book.titulo || book.title}</span>
                    <span className="ml-2 text-sm text-masala-600">{book.autor_nombre || book.author}</span>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(book.id)}>
                    Eliminar
                  </Button>
                </Card>
              ))}
            </div>
          )}
          <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Eliminar Libro">
            <p>¿Estás seguro de que quieres eliminar el libro <b>{selectedBook?.titulo || selectedBook?.title}</b>?</p>
            <div className="flex gap-2 justify-end mt-4">
              <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancelar</Button>
              <Button variant="destructive" onClick={confirmDelete} disabled={loading}>Eliminar</Button>
            </div>
          </Modal>
          {!loading && !error && filteredBooks.length === 0 && (
            <div className="text-center text-gray-600">No se encontraron libros para eliminar.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
