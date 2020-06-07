import resolve from '@rollup/plugin-node-resolve';
import { brotliCompressSync } from 'zlib';
import { terser } from "rollup-plugin-terser";
import gzipPlugin from 'rollup-plugin-gzip';

export default {
    input: ['src/index.js', 'src/cli.js'],
    output: {
        dir: 'dist',
        format: 'cjs'
    },
    plugins: [
	resolve(), 
	terser(),
	gzipPlugin({
		customCompression: content =>
		       brotliCompressSync(Buffer.from(content)), fileName: '.br'
	})
    ]
};
