import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import JSON from '@rollup/plugin-json'
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
    terser(), // 可选，用于生产环境压缩代码
    typescript({
      tsconfig: './tsconfig.json',
      clean: true,
      useTsconfigDeclarationDir: true,
    }),
    JSON(),
  ],
  external: ['commander', 'execa', 'inquirer'],
}
