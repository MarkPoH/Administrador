import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';
import { listarCategorias, editarCategoria, eliminarCategoria } from '@/api/index';
import { Modal } from '@/components/ui/modal';

export default function EditarCategoriaPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      try {
        const data = await listarCategorias();
        setCategories(Array.isArray(data) ? data : data.categorias || []);
        setError(null);
      } catch (err) {
        setError('Error al cargar las categorías.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategorias();
  }, []);

  const handleEdit = async (id) => {
    const category = categories.find(cat => cat.id === id);
    setSelectedCategory(category);
    setEditName(category?.nombre || category?.name || '');
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    const category = categories.find(cat => cat.id === id);
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const confirmEdit = async () => {
    setLoading(true);
    setError(null);
    setSuccess('');
    try {
      await editarCategoria(selectedCategory.id, { nombre: editName });
      setSuccess('Categoría editada correctamente.');
      setCategories(prev => prev.map(cat => cat.id === selectedCategory.id ? { ...cat, nombre: editName } : cat));
      setEditModalOpen(false);
    } catch (err) {
      setError('Error al editar la categoría.');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    setLoading(true);
    setError(null);
    setSuccess('');
    try {
      await eliminarCategoria(selectedCategory.id);
      setSuccess('Categoría eliminada correctamente.');
      setCategories(prev => prev.filter(cat => cat.id !== selectedCategory.id));
      setDeleteModalOpen(false);
    } catch (err) {
      setError('Error al eliminar la categoría.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-masala-900 text-center">Editar Categorías</h1>
      {loading && <div className="text-center py-4">Cargando categorías...</div>}
      {error && <div className="text-red-600 text-center">{error}</div>}
      {success && <div className="text-green-600 text-center">{success}</div>}
      {!loading && !error && (
        <div className="space-y-4 max-w-lg mx-auto">
          {categories.map(category => (
            <Card key={category.id} className="flex items-center justify-between p-4 shadow-sm bg-white dark:bg-masala-900">
              <span className="text-lg font-medium text-masala-900 dark:text-masala-100">{category.nombre || category.name}</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(category.id)} disabled={loading}>
                  <Edit className="h-5 w-5 text-masala-700 dark:text-masala-300" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)} disabled={loading}>
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)} title="Editar Categoría">
        <div className="space-y-4">
          <input
            type="text"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            placeholder="Nuevo nombre de la categoría"
            className="w-full border rounded px-3 py-2"
          />
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>Cancelar</Button>
            <Button onClick={confirmEdit} disabled={loading}>Guardar</Button>
          </div>
        </div>
      </Modal>
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Eliminar Categoría">
        <p>¿Estás seguro de que quieres eliminar la categoría <b>{selectedCategory?.nombre || selectedCategory?.name}</b>?</p>
        <div className="flex gap-2 justify-end mt-4">
          <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancelar</Button>
          <Button variant="destructive" onClick={confirmDelete} disabled={loading}>Eliminar</Button>
        </div>
      </Modal>
      {!loading && !error && categories.length === 0 && (
        <div className="text-center text-gray-600">No se encontraron categorías.</div>
      )}
    </div>
  );
}
