import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        category: resolve(__dirname, 'src/category/index.html'),
        item: resolve(__dirname, 'src/item/index.html'),
        list: resolve(__dirname, 'src/list/index.html')
      },
    },
  },
});
