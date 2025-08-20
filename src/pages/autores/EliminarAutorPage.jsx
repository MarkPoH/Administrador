import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { eliminarAutor } from '@/api/index';

export default function EliminarAutorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Simular carga de datos del autor (en una app real, harías una llamada a la API)
  useEffect(() => {
    // Aquí cargarías los datos del autor desde la API
    // Por ahora, simulamos con datos de ejemplo
    const mockAuthor = {
      id: id,
      name: 'Autor de Ejemplo',
      image: '/placeholder.svg?height=150&width=150&text=Autor'
    };
    setAuthor(mockAuthor);
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    try {
      await eliminarAutor(id);
      alert(`Autor "${author.name}" eliminado con éxito.`);
      navigate('/autores');
    } catch (err) {
      setError('Error al eliminar el autor.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/autores');
  };

  if (!author) {
    return (
      <div className="container mx-auto px-4 py-8 bg-white">
        <div className="text-center">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-masala-900 text-center">Eliminar Autor</h1>
      <Card className="max-w-lg mx-auto p-6 shadow-lg bg-white dark:bg-masala-900">
        <CardContent className="p-0">
          <div className="text-center space-y-6">
            <div className="border border-masala-300 dark:border-masala-700 rounded-md p-4 flex justify-center items-center min-h-[150px] bg-masala-100 dark:bg-masala-800">
              <img
                src={author.image || "/placeholder.svg"}
                alt={author.name}
                width={150}
                height={150}
                className="object-contain max-h-[150px] max-w-full"
                onError={(e) => {
                  e.target.src = '/placeholder.svg?height=150&width=150&text=Error+Carga';
                }}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-masala-900 dark:text-masala-100 mb-2">
                {author.name}
              </h2>
              <p className="text-masala-600 dark:text-masala-400 mb-4">
                ¿Estás seguro de que deseas eliminar este autor?
              </p>
              <p className="text-sm text-red-600 dark:text-red-400">
                Esta acción no se puede deshacer.
              </p>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1 border-masala-300 text-masala-700 hover:bg-masala-100"
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                disabled={loading}
              >
                {loading ? 'Eliminando...' : 'Eliminar Autor'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}