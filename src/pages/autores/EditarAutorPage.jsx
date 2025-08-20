import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Pencil, Trash2, Search } from 'lucide-react';
import { listarAutores } from '../../api';
import { Modal } from '../../components/ui/modal';

const EditarAutorPage = ({ setCurrentPage, currentPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        const data = await listarAutores();
        if (Array.isArray(data)) {
          setAuthors(data);
        } else if (data && Array.isArray(data.autores)) {
          setAuthors(data.autores);
        } else {
          setAuthors([]);
        }
        setError(null);
      } catch (err) {
        if (err.response) {
          setError(`Error del servidor: ${err.response.status} - ${err.response.data?.message || 'Error desconocido'}`);
        } else if (err.request) {
          setError('Error de conexión: No se pudo conectar al servidor');
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  const filteredAuthors = authors.filter(author => {
    if (!searchTerm) return true;
    return author.nombre?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleEdit = (id) => {
    const author = authors.find(a => a.id === id);
    setSelectedAuthor(author);
    setEditName(author?.nombre || '');
    setEditModalOpen(true);
  };

  const handleDelete = (id) => {
    const author = authors.find(a => a.id === id);
    setSelectedAuthor(author);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Aquí iría la lógica real de eliminación
    alert(`Autor con ID ${selectedAuthor?.id} eliminado.`);
    setDeleteModalOpen(false);
  };

  const confirmEdit = () => {
    // Aquí iría la lógica real de edición
    alert(`Autor con ID ${selectedAuthor?.id} editado. Nuevo nombre: ${editName}`);
    setEditModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Editar / Eliminar Autor</h1>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      {loading && (
        <div className="text-center py-8">
          <p>Cargando autores...</p>
        </div>
      )}
      {error && (
        <div className="text-center py-8 text-red-600">
          <p>{error}</p>
        </div>
      )}
      {!loading && !error && (
        <div className="space-y-4">
          {filteredAuthors.length > 0 ? (
            filteredAuthors.map(author => (
              <Card key={author.id} className="flex items-center justify-between p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <img
                    src={author.url_foto || "/placeholder.svg"}
                    alt={`Foto de ${author.nombre}`}
                    width={50}
                    height={50}
                    className="rounded-full object-cover aspect-square"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg";
                    }}
                  />
                  <span className="text-lg font-medium">{author.nombre}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(author.id)}>
                    <Pencil className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(author.id)}>
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-600">No se encontraron autores.</p>
          )}
        </div>
      )}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)} title="Editar Autor">
        <div className="space-y-4">
          <Input
            type="text"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            placeholder="Nuevo nombre del autor"
          />
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>Cancelar</Button>
            <Button onClick={confirmEdit}>Guardar</Button>
          </div>
        </div>
      </Modal>
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Eliminar Autor">
        <p>¿Estás seguro de que quieres eliminar a <b>{selectedAuthor?.nombre}</b>?</p>
        <div className="flex gap-2 justify-end mt-4">
          <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancelar</Button>
          <Button variant="destructive" onClick={confirmDelete}>Eliminar</Button>
        </div>
      </Modal>
    </div>
  );
};

export default EditarAutorPage;
