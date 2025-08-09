

// --- Autores ---
// Reemplazar todas las llamadas a apiFetch por fetch nativo
// Ejemplo para listarAutores:
export async function listarAutores() {
  const response = await fetch("/api/autores");
  if (!response.ok) throw new Error("Error al obtener autores");
  return await response.json();
}

export async function registrarAutor(data) {
  const response = await fetch("/api/autores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Error al registrar autor");
  return await response.json();
}

export async function editarAutor(id, data) {
  const response = await fetch(`/api/autores/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Error al editar autor");
  return await response.json();
}

// --- Categorías ---
export async function listarCategorias() {
  const response = await fetch("/api/categorias");
  if (!response.ok) throw new Error("Error al obtener categorías");
  return await response.json();
}

export async function crearCategoria(data) {
  const response = await fetch("/api/categorias", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Error al crear categoría");
  return await response.json();
}

export async function editarCategoria(id, data) {
  const response = await fetch(`/api/categorias/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Error al editar categoría");
  return await response.json();
}

// --- Libros ---
export async function listarLibros() {
  const response = await fetch("/api/libros");
  if (!response.ok) throw new Error("Error al obtener libros");
  return await response.json();
}

export async function crearLibro(data) {
  const response = await fetch("/api/libros", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Error al crear libro");
  return await response.json();
}

export async function editarLibro(id, data) {
  const response = await fetch(`/api/libros/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Error al editar libro");
  return await response.json();
}

export async function eliminarLibro(id) {
  const response = await fetch(`/api/libros/${id}`, {
    method: "DELETE" });
  if (!response.ok) throw new Error("Error al eliminar libro");
  return await response.json();
}

export async function login(data) {
  const response = await fetch("/auth/iniciar-sesion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Error al iniciar sesión");
  return await response.json();
}