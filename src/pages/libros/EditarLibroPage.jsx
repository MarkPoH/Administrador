import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { listarCategorias, editarLibro } from '@/api/index';

export default function EditarLibroPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editSuccess, setEditSuccess] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const categoriasData = await listarCategorias();
        setCategories(Array.isArray(categoriasData) ? categoriasData : []);
        setError(null);
      } catch (err) {
        setError('Error al cargar las categorías.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const confirmEdit = async () => {
    setLoading(true);
    setError(null);
    setEditSuccess('');
    try {
      // Aquí deberías obtener el ID del libro a editar y los datos del formulario
      // await editarLibro(id, { categoria_id: selectedCategory });
      setEditSuccess('Libro editado correctamente (simulación).');
      setEditModalOpen(false);
    } catch (err) {
      setError('Error al editar el libro.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess('');
    try {
      // Aquí deberías obtener el ID del libro a editar y los datos del formulario
      // Por ejemplo:
      // await editarLibro(id, { categoria_id: selectedCategory });
      setSuccess('Libro editado correctamente (simulación).');
    } catch (err) {
      setError('Error al editar el libro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
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
                      {category.nombre || category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {error && <div className="text-red-600 text-center">{error}</div>}
            {success && <div className="text-green-600 text-center">{success}</div>}
            <Button
              type="button"
              className="w-full bg-masala-900 text-white hover:bg-masala-800 dark:bg-masala-700 dark:hover:bg-masala-600"
              disabled={loading}
              onClick={handleEdit}
            >
              Editar Libro
            </Button>
            <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)} title="Editar Libro">
              <div className="space-y-4">
                <Label htmlFor="category-select-modal" className="text-masala-700 dark:text-masala-300">Seleccionar Categoría</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category-select-modal" className="w-full mt-1 border-masala-300 dark:border-masala-700 bg-masala-100 dark:bg-masala-800 text-masala-950 dark:text-masala-50">
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.nombre || category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {error && <div className="text-red-600 text-center">{error}</div>}
                {editSuccess && <div className="text-green-600 text-center">{editSuccess}</div>}
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setEditModalOpen(false)}>Cancelar</Button>
                  <Button onClick={confirmEdit} disabled={loading}>Guardar</Button>
                </div>
              </div>
            </Modal>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
