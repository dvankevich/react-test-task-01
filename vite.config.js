import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [
    react(),
    Icons({
      compiler: 'jsx',          // для React
      autoInstall: true,        // автоматично підтягує @iconify-json/* при потребі
      // scale: 1.2,            // опціонально: масштаб за замовчуванням
      // customCollections: {}, // якщо будуть кастомні іконки
    }),
  ],
})