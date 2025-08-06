import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function ListarAutoresPage() {
  // Datos de ejemplo para los autores
  const authors = [
    { name: 'Khaled Hoseinis', image: '/placeholder.svg?height=100&width=100' },
    { name: 'Miguel de Cervantes De loyola', image: '/placeholder.svg?height=100&width=100' },
    { name: 'Joshep', image: '/placeholder.svg?height=100&width=100' },
    { name: 'Charles Dicke', image: '/placeholder.svg?height=100&width=100' },
    { name: 'Victor Hugo del grabiel', image: '/placeholder.svg?height=100&width=100' },
    { name: 'Leo Tolstoys', image: '/placeholder.svg?height=100&width=100' },
    { name: 'Thomas Hardys', image: '/placeholder.svg?height=100&width=100' },
    { name: 'Jane Austen del huerta jhose', image: '/placeholder.svg?height=100&width=100' },
    { name: 'Denis Huiman', image: '/placeholder.svg?height=100&width=100' },
    { name: 'Fyodor D', image: '/placeholder.svg?height=100&width=100' },
    { name: 'Julio Ramonde', image: '/placeholder.svg?height=100&width=100' },
    { name: 'Habran Valdelo', image: '/placeholder.svg?height=100&width=100' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-white"> {/* Fondo blanco */}
      <h1 className="text-2xl font-bold mb-6 text-center">Lista de Autores</h1>
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
    </div>
  );
}
