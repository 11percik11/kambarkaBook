import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   allowedHosts: [
  //     '7e20-94-241-174-72.ngrok-free.app' // 👈 добавляем сюда
  //   ]
  // }
})
