import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { editarAutor } from '@/api/index';

export default function EditarAutorIndividualPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [authorName, setAuthorName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Simular carga de datos del autor (en una app real, harías una llamada a la API)
  useEffect(() => {
    // Aquí cargarías los datos del autor desde la API
    // Por ahora, simulamos con datos de ejemplo
    const mockAuthor = {
      name: 'Autor de Ejemplo',
      image: '/placeholder.svg?height=150&width=150&text=Autor'
    };
    setAuthorName(mockAuthor.name);
    setImageUrl(mockAuthor.image);
    setPreviewUrl(mockAuthor.image);
  }, [id]);

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setPreviewUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await editarAutor(id, { name: authorName, image: imageUrl });
      setSuccess(`Autor "${authorName}" actualizado con éxito.`);
      setTimeout(() => {
        navigate('/autores');
      }, 2000);
    } catch (err) {
      setError('Error al actualizar el autor.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/autores');
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-masala-900 text-center">Editar Autor</h1>
      <Card className="max-w-lg mx-auto p-6 shadow-lg bg-white dark:bg-masala-900">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="author-name" className="text-masala-700 dark:text-masala-300">Nombre del autor</Label>
              <Input
                id="author-name"
                type="text"
                placeholder="Nombre del autor"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
                className="mt-1 block w-full border-masala-300 dark:border-masala-700 bg-masala-100 dark:bg-masala-800 text-masala-950 dark:text-masala-50"
              />
            </div>
            <div>
              <Label htmlFor="image-url" className="text-masala-700 dark:text-masala-300">URL de la imagen</Label>
              <Input
                id="image-url"
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={imageUrl}
                onChange={handleImageUrlChange}
                className="mt-1 block w-full border-masala-300 dark:border-masala-700 bg-masala-100 dark:bg-masala-800 text-masala-950 dark:text-masala-50"
              />
            </div>
            <div className="border border-masala-300 dark:border-masala-700 rounded-md p-4 flex justify-center items-center min-h-[150px] bg-masala-100 dark:bg-masala-800">
              {previewUrl ? (
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Vista previa"
                  width={150}
                  height={150}
                  className="object-contain max-h-[150px] max-w-full"
                  onError={() => setPreviewUrl('/placeholder.svg?height=150&width=150&text=Error+Carga')}
                />
              ) : (
                <span className="text-masala-500 dark:text-masala-400">Vista previa</span>
              )}
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
                {loading ? 'Actualizando...' : 'Actualizar Autor'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}