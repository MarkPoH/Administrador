import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { registrarAutor } from '@/api/index';

export default function RegistrarAutorPage() {
  const [authorName, setAuthorName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      await registrarAutor({ name: authorName, image: imageUrl });
      setSuccess(`Autor "${authorName}" registrado con éxito.`);
      setAuthorName('');
      setImageUrl('');
      setPreviewUrl('');
    } catch (err) {
      setError('Error al registrar el autor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-masala-900 text-center">Registrar Autor</h1>
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
            <Button
              type="submit"
              className="w-full bg-masala-900 text-white hover:bg-masala-800 dark:bg-masala-700 dark:hover:bg-masala-600"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrar Autor'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
