import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import JSON from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
export default {
  input: 'src/index.ts',
  output: {
    file: 'bin/egit-cli.js',
    format: 'esm',
    name: 'egit',
    banner: '#!/usr/bin/env node',
  },
  plugins: [
    resolve(),
    commonjs(),
    terser({
      mangle: false,
    }),
    typescript({
      tsconfig: './tsconfig.json',
      clean: true,
      // useTsconfigDeclarationDir: true,
    }),
    JSON(),
    alias({
      entries: [{ find: '@', replacement: './src' }],
    }),
  ],
  external: ['commander', 'execa', 'inquirer'],
}
