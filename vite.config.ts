import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import analyzer from 'rollup-plugin-analyzer';

export default defineConfig({
    base: '/paper-finder',
    plugins: [react(), svgr(),
        analyzer({summaryOnly: true, limit: 5})],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    material: ["@mui/material"],
                    materialReactTable: ["material-react-table"],
                },
            },
        }
    }
});