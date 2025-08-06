import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ListarLibrosPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Datos de ejemplo para los libros
  const books = [
    {
      title: 'El ingenioso hidalgo Don Quijote de la Mancha',
      author: 'Miguel de Cervantes De loyola',
      price: '89.99',
      image: '/placeholder.svg?height=200&width=150&text=Don+Quijote',
      category: 'Clásicos',
    },
    {
      title: 'ANOTHER',
      author: 'Victor Hugo del grabiel',
      price: '32.00',
      image: '/placeholder.svg?height=200&width=150&text=Another',
      category: 'Misterio',
    },
    {
      title: 'Hellsing',
      author: 'Leo Tolstoys',
      price: '45.00',
      image: '/placeholder.svg?height=200&width=150&text=Hellsing',
      category: 'Fantasía',
    },
    {
      title: 'EL GATO CON BOTAS',
      author: 'Leo Tolstoys',
      price: '31.00',
      image: '/placeholder.svg?height=200&width=150&text=Gato+Botas',
      category: 'Infantil',
    },
    {
      title: 'MONSTER',
      author: 'Denis Huiman',
      price: '44.00',
      image: '/placeholder.svg?height=200&width=150&text=Monster',
      category: 'Misterio',
    },
    {
      title: 'El gato negro',
      author: 'Joshep',
      price: '42.00',
      image: '/placeholder.svg?height=200&width=150&text=Gato+Negro',
      category: 'Terror',
    },
    {
      title: 'A Thousand Splendid Suns (2007)',
      author: 'Khaled Hoseinis',
      price: '67.00',
      image: '/placeholder.svg?height=200&width=150&text=Splendid+Suns',
      category: 'Drama',
    },
    {
      title: 'LA SOMBRA',
      author: 'Miguel de Cervantes De loyola',
      price: '67.00',
      image: '/placeholder.svg?height=200&width=150&text=La+Sombra',
      category: 'Misterio',
    },
  ];

  const categories = [
    'Todas',
    'Tragedia',
    'Drama',
    'Bizantina',
    'Romance',
    'Morisca',
    'Sátira',
    'Aventuras',
    'Realismo',
    'Comedia',
    'Historias',
    'Fantasía',
    'Ciencia',
    'Infantil',
    'Terror',
    'Clásicos',
    'Misterio',
  ];

  const filteredBooks = selectedCategory === 'Todas'
    ? books
    : books.filter(book => book.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8 bg-white"> {/* Fondo blanco */}
      <h1 className="text-3xl font-bold mb-6 text-masala-900">Catálogo de Libros</h1>
      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="category-filter" className="text-masala-700">Filtrar por categoría:</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger id="category-filter" className="w-[180px]">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book, index) => (
          <Card key={index} className="flex flex-col items-center p-4 text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-center p-0">
              <img
                src={book.image || "/placeholder.svg"}
                alt={`Portada de ${book.title}`}
                width={150}
                height={200}
                className="object-cover mb-4 rounded-sm"
              />
              <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
              <p className="text-sm text-masala-600 mb-2">{book.author}</p>
              <p className="text-lg font-bold text-masala-700">S/{book.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
