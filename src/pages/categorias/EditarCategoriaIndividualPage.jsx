import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { editarCategoria } from '@/api/index';

export default function EditarCategoriaIndividualPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Simular carga de datos de la categoría (en una app real, harías una llamada a la API)
  useEffect(() => {
    // Aquí cargarías los datos de la categoría desde la API
    // Por ahora, simulamos con datos de ejemplo
    const mockCategory = {
      name: 'Categoría de Ejemplo'
    };
    setCategoryName(mockCategory.name);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await editarCategoria(id, { name: categoryName });
      setSuccess(`Categoría "${categoryName}" actualizada con éxito.`);
      setTimeout(() => {
        navigate('/categorias');
      }, 2000);
    } catch (err) {
      setError('Error al actualizar la categoría.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/categorias');
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-masala-900 text-center">Editar Categoría</h1>
      <Card className="max-w-lg mx-auto p-6 shadow-lg bg-white dark:bg-masala-900">
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
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {success && <p className="text-green-500 text-sm text-center">{success}</p>}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1 border-masala-300 text-masala-700 hover:bg-masala-100"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-masala-900 text-white hover:bg-masala-800 dark:bg-masala-700 dark:hover:bg-masala-600"
                disabled={loading}
              >
                {loading ? 'Actualizando...' : 'Actualizar Categoría'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}