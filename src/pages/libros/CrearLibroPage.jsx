import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';

export default function CrearLibroPage() {
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [coverPreviewUrl, setCoverPreviewUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfFileName, setPdfFileName] = useState('');

  const authors = [
    { id: '1', name: 'Khaled Hoseinis' },
    { id: '2', name: 'Miguel de Cervantes De loyola' },
    { id: '3', name: 'Leo Tolstoys' },
    { id: '4', name: 'Victor Hugo del grabiel' },
  ];

  const categories = [
    { id: '1', name: 'Tragedia' },
    { id: '2', name: 'Drama' },
    { id: '3', name: 'Fantasía' },
    { id: '4', name: 'Ciencia Ficción' },
  ];

  const handleCoverImageUrlChange = (e) => {
    const url = e.target.value;
    setCoverImageUrl(url);
    setCoverPreviewUrl(url);
  };

  const handleCoverImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreviewUrl(reader.result);
        // En un caso real, aquí subirías el archivo y obtendrías una URL
        console.log('Archivo de portada subido:', file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPdfFileName(file.name);
      // En un caso real, aquí subirías el archivo y obtendrías una URL
      console.log('Archivo PDF subido:', file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar el libro
    alert('Libro guardado exitosamente!');
    // Resetear formulario
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white"> {/* Fondo blanco */}
      <h1 className="text-3xl font-bold mb-6 text-masala-900 text-center">Crear Nuevo Libro</h1>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
        {/* Sección Portada */}
        <Card className="p-6 shadow-lg bg-white dark:bg-masala-900">
          <CardContent className="p-0 space-y-4">
            <h2 className="text-xl font-semibold text-masala-900 dark:text-masala-100 mb-4">Portada</h2>
            <div>
              <Label htmlFor="cover-image-url" className="text-masala-700 dark:text-masala-300">URL de la imagen</Label>
              <Input
                id="cover-image-url"
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={coverImageUrl}
                onChange={handleCoverImageUrlChange}
                className="mt-1 block w-full border-masala-300 dark:border-masala-700 bg-masala-100 dark:bg-masala-800 text-masala-950 dark:text-masala-50"
              />
            </div>
            <div className="border border-masala-300 dark:border-masala-700 rounded-md p-4 flex justify-center items-center min-h-[200px] bg-masala-100 dark:bg-masala-800">
              {coverPreviewUrl ? (
                <img
                  src={coverPreviewUrl || "/placeholder.svg"}
                  alt="Vista previa de la portada"
                  width={200}
                  height={250}
                  className="object-contain max-h-[250px] max-w-full"
                  onError={() => setCoverPreviewUrl('/placeholder.svg?height=250&width=200&text=Error+Carga')}
                />
              ) : (
                <span className="text-masala-500 dark:text-masala-400">Vista previa de la imagen</span>
              )}
            </div>
            <Label htmlFor="cover-upload" className="flex items-center justify-center gap-2 cursor-pointer text-masala-700 dark:text-masala-300 hover:text-masala-900 dark:hover:text-masala-100">
              <Upload className="h-5 w-5" />
              Subir imagen desde tu equipo
              <Input id="cover-upload" type="file" className="sr-only" onChange={handleCoverImageUpload} accept="image/*" />
            </Label>
          </CardContent>
        </Card>

        {/* Sección Información del Libro */}
        <Card className="p-6 shadow-lg bg-white dark:bg-masala-900">
          <CardContent className="p-0 space-y-4">
            <h2 className="text-xl font-semibold text-masala-900 dark:text-masala-100 mb-4">Información del Libro</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="text-masala-700 dark:text-masala-300">Título</Label>
                <Input id="title" type="text" placeholder="Título del libro" required className="mt-1 block w-full border-masala-300 dark:border-masala-700 bg-masala-100 dark:bg-masala-800 text-masala-950 dark:text-masala-50" />
              </div>
              <div>
                <Label htmlFor="isbn" className="text-masala-700 dark:text-masala-300">ISBN</Label>
                <Input id="isbn" type="text" placeholder="ISBN" className="mt-1 block w-full border-masala-300 dark:border-masala-700 bg-masala-100 dark:bg-masala-800 text-masala-950 dark:text-masala-50" />
              </div>
            </div>
            <div>
              <Label htmlFor="author" className="text-masala-700 dark:text-masala-300">Autor</Label>
              <Select>
                <SelectTrigger id="author" className="mt-1 block w-full border-masala-300 dark:border-masala-700 bg-masala-100 dark:bg-masala-800 text-masala-950 dark:text-masala-50">
                  <SelectValue placeholder="Seleccione un autor" />
                </SelectTrigger>
                <SelectContent>
                  {authors.map(author => (
                    <SelectItem key={author.id} value={author.id}>{author.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description" className="text-masala-700 dark:text-masala-300">Descripción</Label>
              <Textarea id="description" placeholder="Descripción del libro" rows={4} className="mt-1 block w-full border-masala-300 dark:border-masala-700 bg-masala-100 dark:bg-masala-800 text-masala-950 dark:text-masala-50" />
            </div>
          </CardContent>
        </Card>

        {/* Sección Categoría y Precio */}
        <Card className="p-6 shadow-lg bg-white dark:bg-masala-900">
          <CardContent className="p-0 space-y-4">
            <h2 className="text-xl font-semibold text-masala-900 dark:text-masala-100 mb-4">Categoría y Precio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="text-masala-700 dark:text-masala-300">Categoría</Label>
                <Select>
                  <SelectTrigger id="category" className="mt-1 block w-full border-masala-300 dark:border-masala-700 bg-masala-100 dark:bg-masala-800 text-masala-950 dark:text-masala-50">
                    <SelectValue placeholder="Seleccione una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price" className="text-masala-700 dark:text-masala-300">Precio (S/)</Label>
                <Input id="price" type="number" step="0.01" placeholder="0.00" required className="mt-1 block w-full border-masala-300 dark:border-masala-700 bg-masala-100 dark:bg-masala-800 text-masala-950 dark:text-masala-50" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección Archivo PDF */}
        <Card className="p-6 shadow-lg bg-white dark:bg-masala-900">
          <CardContent className="p-0 space-y-4">
            <h2 className="text-xl font-semibold text-masala-900 dark:text-masala-100 mb-4">Archivo PDF</h2>
            <Label htmlFor="pdf-upload" className="flex items-center justify-center gap-2 cursor-pointer text-masala-700 dark:text-masala-300 hover:text-masala-900 dark:hover:text-masala-100 border border-dashed border-masala-400 dark:border-masala-600 rounded-md p-4 bg-masala-100 dark:bg-masala-800">
              <Upload className="h-6 w-6" />
              {pdfFileName ? `Archivo seleccionado: ${pdfFileName}` : 'Subir Archivo PDF'}
              <Input id="pdf-upload" type="file" className="sr-only" onChange={handlePdfUpload} accept=".pdf" />
            </Label>
            <div>
              <Label htmlFor="pdf-url" className="text-masala-700 dark:text-masala-300">URL del archivo PDF</Label>
              <Input
                id="pdf-url"
                type="url"
                placeholder="https://ejemplo.com/ejemplo.pdf"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                className="mt-1 block w-full border-masala-300 dark:border-masala-700 bg-masala-100 dark:bg-masala-800 text-masala-950 dark:text-masala-50"
              />
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full bg-masala-900 text-white hover:bg-masala-800 dark:bg-masala-700 dark:hover:bg-masala-600 py-3 text-lg font-semibold"
        >
          GUARDAR LIBRO
        </Button>
      </form>
    </div>
  );
}
