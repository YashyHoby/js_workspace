import fs from 'fs';
import { defineConfig } from 'vite';

export default defineConfig( {
    server: {
        https: {
            key: fs.readFileSync('../../private_info/localhost/cert/localhost-key.pem'),
            cert: fs.readFileSync('../../private_info/localhost/cert/localhost.pem')
        }
    }
});