import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    cssCodeSplit: true,

    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (id.includes('node_modules/axios')) {
            return 'vendor-http';
          }
          if (
            id.includes('src/components/CheckoutModal') ||
            id.includes('src/components/BuildSummary')
          ) {
            return 'chunk-checkout';
          }
          if (
            id.includes('src/components/PerformanceDashboard') ||
            id.includes('src/components/HardwareHighlights') ||
            id.includes('src/components/ExplodedView') ||
            id.includes('src/components/ConfiguratorStudio')
          ) {
            return 'chunk-below-fold';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },

    target: 'es2020',
    chunkSizeWarningLimit: 600,

    sourcemap: false,
  },
})
