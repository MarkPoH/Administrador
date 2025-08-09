import { login as apiLogin } from '../api/index';
import { saveToken } from '../utils/token';

export async function login(email, password) {
  const data = await apiLogin(email, password);
  saveToken(data.token); // Guarda el token recibido
  return data;
}