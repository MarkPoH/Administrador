import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, ArrowLeft } from 'lucide-react';
import { listarAutores, listarCategorias, listarLibros, editarLibro, obtenerLibroPorId } from '@/api/index';

export default function EditarLibroIndividualPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [coverPreviewUrl, setCoverPreviewUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfFileName, setPdfFileName] = useState('');
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoadingData(true);
        
        // Cargar autores y categorías
        const [autores, categorias, libros] = await Promise.all([
          listarAutores(),
          listarCategorias(),
          listarLibros()
        ]);
        
        setAuthors(autores);
        setCategories(categorias);
        
        // Buscar el libro específico por ID
        const libro = libros.find(book => book.id === parseInt(id));
        if (libro) {
          setTitle(libro.titulo || '');
          setSelectedAuthor(libro.autor_id ? libro.autor_id.toString() : '');
          setSelectedCategory(libro.categoria_id ? libro.categoria_id.toString() : '');
          setIsbn(libro.isbn || '');
          setDescription(libro.descripcion || '');
          setPrice(libro.precio || '');
          setCoverImageUrl(libro.imagen_portada || '');
          setCoverPreviewUrl(libro.imagen_portada || '');
          setPdfUrl(libro.archivo_pdf || '');
          setPdfFileName(libro.archivo_pdf ? 'archivo.pdf' : '');
        } else {
          setError('Libro no encontrado.');
        }
      } catch (err) {
        setError('Error al cargar los datos del libro.');
      } finally {
        setLoadingData(false);
      }
    }
    fetchData();
  }, [id]);

  const handleCoverImageUrlChange = (e) => {
    const url = e.target.value;
    setCoverImageUrl(url);
    setCoverPreviewUrl(url);
  };

  const handleCoverImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setCoverPreviewUrl(url);
      setCoverImageUrl(url);
    }
  };

  const handlePdfUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPdfFileName(file.name);
      setPdfUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !selectedAuthor || !selectedCategory || !price) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const libroData = {
        title,
        author: selectedAuthor,
        category: selectedCategory,
        isbn,
        description,
        price: parseFloat(price),
        image: coverImageUrl,
        pdfUrl,
        pdfFileName
      };

      await editarLibro(id, libroData);
      setSuccess('Libro actualizado exitosamente.');
      
      setTimeout(() => {
        navigate('/libros/editar');
      }, 2000);
    } catch (err) {
      setError('Error al actualizar el libro. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="container mx-auto px-4 py-8 bg-white">
        <p className="text-center">Cargando datos del libro...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/libros/editar')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <h1 className="text-3xl font-bold text-masala-900">Editar Libro</h1>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ingresa el título del libro"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="author">Autor *</Label>
                  <Select value={selectedAuthor} onValueChange={setSelectedAuthor} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un autor" />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem key={author.id} value={author.name}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Categoría *</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input
                    id="isbn"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    placeholder="Ingresa el ISBN"
                  />
                </div>

                <div>
                  <Label htmlFor="price">Precio (S/) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Portada del libro</Label>
                  <div className="space-y-2">
                    <Input
                      value={coverImageUrl}
                      onChange={handleCoverImageUrlChange}
                      placeholder="URL de la imagen"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-masala-600">o</span>
                      <Label htmlFor="cover-upload" className="cursor-pointer flex items-center gap-2 text-sm text-masala-600 hover:text-masala-800">
                        <Upload className="h-4 w-4" />
                        Subir imagen
                      </Label>
                      <Input
                        id="cover-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                  {coverPreviewUrl && (
                    <div className="mt-2">
                      <img
                        src={coverPreviewUrl}
                        alt="Vista previa"
                        className="w-32 h-40 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="pdf-upload">Archivo PDF</Label>
                  <div className="space-y-2">
                    <Label htmlFor="pdf-upload" className="cursor-pointer flex items-center gap-2 p-2 border border-dashed border-masala-300 rounded hover:border-masala-400">
                      <Upload className="h-4 w-4" />
                      {pdfFileName || 'Seleccionar archivo PDF'}
                    </Label>
                    <Input
                      id="pdf-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción del libro"
                rows={4}
              />
            </div>

            <div className="mt-6 flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/libros/editar')}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Actualizando...' : 'Actualizar Libro'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}