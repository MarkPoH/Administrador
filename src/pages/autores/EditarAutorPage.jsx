import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';

export default function EditarAutorPage() {
  const [filterLetter, setFilterLetter] = useState('Todos');

  const authors = [
    { id: 1, name: 'Khaled Hoseinis', image: '/placeholder.svg?height=50&width=50&text=KH' },
    { id: 2, name: 'Miguel de Cervantes De loyola', image: '/placeholder.svg?height=50&width=50&text=MC' },
    { id: 3, name: 'Joshep', image: '/placeholder.svg?height=50&width=50&text=J' },
    { id: 4, name: 'Charles Dicke', image: '/placeholder.svg?height=50&width=50&text=CD' },
    { id: 5, name: 'Victor Hugo del grabiel', image: '/placeholder.svg?height=50&width=50&text=VH' },
    { id: 6, name: 'Leo Tolstoys', image: '/placeholder.svg?height=50&width=50&text=LT' },
    { id: 7, name: 'Thomas Hardys', image: '/placeholder.svg?height=50&width=50&text=TH' },
    { id: 8, name: 'Jane Austen del huerta jhose', image: '/placeholder.svg?height=50&width=50&text=JA' },
    { id: 9, name: 'Denis Huiman', image: '/placeholder.svg?height=50&width=50&text=DH' },
    { id: 10, name: 'Fyodor D', image: '/placeholder.svg?height=50&width=50&text=FD' },
    { id: 11, name: 'Julio Ramonde', image: '/placeholder.svg?height=50&width=50&text=JR' },
    { id: 12, name: 'Habran Valdelo', image: '/placeholder.svg?height=50&width=50&text=HV' },
  ];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredAuthors = authors.filter(author => {
    if (filterLetter === 'Todos') return true;
    return author.name.startsWith(filterLetter);
  });

  const handleEdit = (id) => {
    console.log(`Editar autor con ID: ${id}`);
    // Lógica para navegar a la página de edición de autor o abrir un modal
  };

  const handleDelete = (id) => {
    console.log(`Eliminar autor con ID: ${id}`);
    // Lógica para eliminar el autor (con confirmación)
    if (confirm(`¿Estás seguro de que quieres eliminar al autor con ID ${id}?`)) {
      // Lógica de eliminación real
      alert(`Autor con ID ${id} eliminado.`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white"> {/* Fondo blanco */}
      <h1 className="text-3xl font-bold mb-6 text-masala-900 text-center">Editar / Eliminar Autor</h1>

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        <Button
          variant={filterLetter === 'Todos' ? 'default' : 'outline'}
          onClick={() => setFilterLetter('Todos')}
          className="bg-masala-900 text-white hover:bg-masala-800 dark:bg-masala-700 dark:hover:bg-masala-600"
        >
          Todos
        </Button>
        {alphabet.map(letter => (
          <Button
            key={letter}
            variant={filterLetter === letter ? 'default' : 'outline'}
            onClick={() => setFilterLetter(letter)}
            className="bg-masala-100 text-masala-900 hover:bg-masala-200 dark:bg-masala-800 dark:text-masala-100 dark:hover:bg-masala-700"
          >
            {letter}
          </Button>
        ))}
        <Button
          variant="destructive"
          onClick={() => setFilterLetter('Todos')} // "Limpiar" resetea el filtro
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Limpiar
        </Button>
      </div>

      <div className="space-y-4">
        {filteredAuthors.length > 0 ? (
          filteredAuthors.map(author => (
            <Card key={author.id} className="flex items-center justify-between p-4 shadow-sm bg-white dark:bg-masala-900">
              <div className="flex items-center gap-4">
                <img
                  src={author.image || "/placeholder.svg"}
                  alt={`Foto de ${author.name}`}
                  width={50}
                  height={50}
                  className="rounded-full object-cover aspect-square"
                />
                <span className="text-lg font-medium text-masala-900 dark:text-masala-100">{author.name}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(author.id)}>
                  <Edit className="h-5 w-5 text-masala-700 dark:text-masala-300" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(author.id)}>
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-masala-600 dark:text-masala-400">No se encontraron autores con la letra seleccionada.</p>
        )}
      </div>
    </div>
  );
}
