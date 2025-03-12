import { defineConfig } from 'vite';

export default defineConfig({
  base: './', 
  build: {
    outDir: 'dist' 
  },
  optimizeDeps: {
    include: ['three']
  }
});
