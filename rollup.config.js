import pkg from './package.json' assert { type: 'json' };
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'index.ts',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
  ],
  plugins: [
    resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
    commonjs(),
    typescript(),
    babel({
      babelHelpers: 'bundled',
      exclude: ['node_modules/**', '**/*.ts', '**/*.tsx'],
      presets: ['@babel/preset-env'],
    }),
    terser(),
  ],
};
