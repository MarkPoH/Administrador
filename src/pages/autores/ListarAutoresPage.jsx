import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { listarAutores } from '@/api/index';

export default function ListarAutoresPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAutores() {
      try {
        const autores = await listarAutores();
        setAuthors(autores);
      } catch (err) {
        setError('Error al cargar los autores.');
      } finally {
        setLoading(false);
      }
    }
    fetchAutores();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Lista de Autores</h1>
      {loading ? (
        <p className="text-center">Cargando autores...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {authors.map((author, index) => (
            <Card key={index} className="flex flex-col items-center p-4 text-center shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="flex flex-col items-center p-0">
                <img
                  src={author.image || "/placeholder.svg"}
                  alt={`Foto de ${author.name}`}
                  width={100}
                  height={100}
                  className="rounded-full object-cover mb-4 aspect-square"
                />
                <p className="text-lg font-medium">{author.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
