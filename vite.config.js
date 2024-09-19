import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({

plugins: [react()],
base: './',
build: {
    outDir: 'dist',
    rollupOptions: {
        input: './index.html'

    }

},
server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
        '/api': {
            target: 'http://localhost:8081',
            changeOrigin: true
        }
    }

}

})