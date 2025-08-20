import axios from 'axios';

const API_URL = 'http://54.191.143.35:3000';

// Función para obtener el token
const getToken = () => {
  return localStorage.getItem('token');
};

// Función para obtener headers con token
const getHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ============ AUTORES ============
export const listarAutores = async () => {
  const response = await axios.get(`${API_URL}/autor/listar`);
  return response.data;
};

export const crearAutor = async (autorData) => {
  const response = await axios.post(`${API_URL}/autor/registrar`, autorData);
  return response.data;
};

export const editarAutor = async (id, autorData) => {
  const response = await axios.put(`${API_URL}/autor/actualizar/${id}`, autorData, { headers: getHeaders() });
  return response.data;
};

export const eliminarAutor = async (id) => {
  const response = await axios.delete(`${API_URL}/autor/eliminar/${id}`, { headers: getHeaders() });
  return response.data;
};

export const obtenerAutorPorId = async (id) => {
  const response = await axios.get(`${API_URL}/autor/obtener/individual/${id}`);
  return response.data;
};

// ============ CATEGORÍAS ============
export const listarCategorias = async () => {
  const response = await axios.get(`${API_URL}/categorias/listar`);
  return response.data;
};

export const crearCategoria = async (categoriaData) => {
  const response = await axios.post(`${API_URL}/categorias/registrar`, categoriaData, { headers: getHeaders() });
  return response.data;
};

export const editarCategoria = async (id, categoriaData) => {
  const response = await axios.put(`${API_URL}/categorias/${id}`, categoriaData, { headers: getHeaders() });
  return response.data;
};

export const eliminarCategoria = async (id) => {
  const response = await axios.delete(`${API_URL}/categorias/${id}`, { headers: getHeaders() });
  return response.data;
};

export const obtenerCategoriaPorId = async (id) => {
  const response = await axios.get(`${API_URL}/categorias/${id}`);
  return response.data;
};

// ============ LIBROS ============
export const listarLibros = async () => {
  const response = await axios.get(`${API_URL}/libro/listar`);
  return response.data;
};

export const crearLibro = async (libroData) => {
  const response = await axios.post(`${API_URL}/libro/crear`, libroData, { headers: getHeaders() });
  return response.data;
};

export const editarLibro = async (id, libroData) => {
  const response = await axios.put(`${API_URL}/libro/${id}`, libroData, { headers: getHeaders() });
  return response.data;
};

export const eliminarLibro = async (id) => {
  const response = await axios.delete(`${API_URL}/libro/${id}`, { headers: getHeaders() });
  return response.data;
};

export const obtenerLibroPorId = async (id) => {
  const response = await axios.get(`${API_URL}/libro/${id}`);
  return response.data;
};

// ============ AUTENTICACIÓN ============
export const login = async (credentials) => {
  const response = await axios.post(API_URL + '/auth/iniciar-sesion', credentials);
  
  // Guardar token en localStorage si existe en la respuesta
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  
  return response.data;
};