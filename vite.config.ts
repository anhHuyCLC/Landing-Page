import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    // Gộp tất cả CSS thành 1 file duy nhất, tránh nhiều <link> block render
    cssCodeSplit: false,

    // Tối ưu chunk splitting cho JS
    rollupOptions: {
      output: {
        // Tách vendor libraries thành chunk riêng để cache tốt hơn
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor';
          }
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/framer-motion')) {
            return 'ui';
          }
        },
        // Đặt tên chunks rõ ràng
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },

    // Giảm kích thước chunk warning threshold
    chunkSizeWarningLimit: 1000,
  },
})
