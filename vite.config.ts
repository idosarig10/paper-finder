import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    base: '/paper-finder',
    plugins: [react(), svgr()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    material: ["@mui/material"],
                },
            },
        }
    }
});