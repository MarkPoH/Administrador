import React, { useEffect, useState } from 'react';
import { listarAutores } from '@/api/index';

export default function ListarAutoresPage() {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAutores = async () => {
      setLoading(true);
      try {
        const data = await listarAutores();
        setAutores(Array.isArray(data) ? data : data.autores || []);
        setError('');
      } catch (err) {
        setError('Error al cargar autores.');
      } finally {
        setLoading(false);
      }
    };
    fetchAutores();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-masala-900 text-center">Lista de Autores</h1>
      {loading ? (
        <div className="text-center text-masala-600">Cargando autores...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <table className="min-w-full bg-white border border-masala-300 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {autores.map((autor) => (
              <tr key={autor.id} className="hover:bg-masala-100">
                <td className="py-2 px-4 border-b">{autor.id}</td>
                <td className="py-2 px-4 border-b">{autor.nombre || autor.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
