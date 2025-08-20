import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
import { login } from '@/api/index';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const credentials = {
        correo: email,
        contrasena: password
      };
      
      const response = await login(credentials);
      console.log('Inicio de sesión exitoso:', response);
      onLoginSuccess(); // Llama a la función de éxito de login
    } catch (error) {
      console.error('Error en login:', error);
      
      // Mostrar error más específico
      if (error.response) {
        // Error del servidor (4xx, 5xx)
        const message = error.response.data?.message || 'Error del servidor';
        setError(`Error: ${message}`);
      } else if (error.request) {
        // Error de red/conexión
        setError('Error de conexión. Verifique su conexión a internet.');
      } else {
        // Otro tipo de error
        setError('Error inesperado. Intente nuevamente.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-gray-900">
      <div className="w-full max-w-sm p-8 space-y-6">
        <h1 className="text-4xl font-semibold text-center mb-8">Iniciar sesión</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email-username" className="text-gray-700">Correo electrónico o nombre de usuario</Label>
            <Input
              id="email-username"
              type="text"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-700">Contraseña</Label>
            <div className="relative mt-2">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                <span className="ml-1">Ver</span>
              </button>
            </div>
          </div>


          {error && <p className="text-red-500 text-sm text-center">{error}</p>}


          <Button
            type="submit"
            className="w-full py-3 rounded-full bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-colors"
          >
            Iniciar sesión
          </Button>
        </form>

        <div className="text-center space-y-4 mt-6">
          <a href="#" className="text-gray-700 underline hover:text-gray-900">
            Olvidaste tu contraseña?
          </a>
          <p className="text-gray-700">
            No tienes una cuenta?{' '}
            <a href="#" className="text-gray-900 underline hover:text-gray-700">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
}
