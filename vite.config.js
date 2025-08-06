import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Importa 'path' para resolver rutas absolutas

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Configura el alias '@' para que apunte a la carpeta 'src'
      '@': path.resolve(__dirname, './src'),
    },
  },
});
