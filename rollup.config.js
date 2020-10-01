import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

const extensions = ['.ts', '.tsx']

const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) return () => false
  return (id) => new RegExp(`^(${externalArr.join('|')})($|/)`).test(id)
}

export default [
  {
    input: 'src/index.tsx',
    output: [
      { file: pkg.main, format: 'cjs', exports: 'default' },
      { file: pkg.module, format: 'esm', exports: 'default' },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({ extensions }),
      commonjs(),
      typescript({
        typescript: require('typescript'),
        include: ['*.ts+(|x)', '**/*.ts+(|x)'],
      }),
      babel({
        babelHelpers: 'runtime',
        extensions,
        include: ['src/**/*'],
        exclude: 'node_modules/**',
        babelrc: true,
      }),
    ],
    external: makeExternalPredicate(
      Object.keys(pkg.peerDependencies || {}).concat(Object.keys(pkg.dependencies || {})),
    ),
  },
]
