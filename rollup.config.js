import resolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'

const extensions = ['.ts', '.tsx']

export default [
  {
    input: 'src/index.tsx',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' },
    ],
    plugins: [
      resolve({ extensions }),
      commonjs(),
      typescript({
        typescript: require('typescript'),
        include: ['*.ts+(|x)', '**/*.ts+(|x)'],
      }),
      babel({
        presets: ['react-app'],
        extensions,
        include: ['src/**/*'],
        runtimeHelpers: true,
      }),
    ],
  },
]
