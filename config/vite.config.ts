import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
    
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, '../src'),
      '@components': path.resolve(import.meta.dirname, '../src/components'),
      '@pages': path.resolve(import.meta.dirname, '../src/pages'),
      '@hooks': path.resolve(import.meta.dirname, '../src/hooks'),
      '@lib': path.resolve(import.meta.dirname, '../src/lib'),
    },
  }
}) 