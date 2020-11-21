import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  preserveSymlinks: true,
  input: ['ModalLayer.js'],
  output: {
    file: 'dist/ModalLayer.min.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    babel(),
    terser(),
  ],
};