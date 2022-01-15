import { globbySync } from 'globby';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postCSSPlugin from 'rollup-plugin-postcss';
import postcssLit from 'rollup-plugin-postcss-lit';
import { terser } from 'rollup-plugin-terser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const postCSS = postCSSPlugin({
  inject: false,
  minimize: {
    discardComments: true,
  },
});
const ignore = ['src/build.js', 'src/**/*stories.js'];
const files = globbySync('src/**/*.js', { ignore });
console.log(files);
const external = files.map((file) => path.resolve(__dirname, file));

const individualFiles = files.map((input) => ({
  input,
  output: [
    {
      file: input.replace('src', 'dist'),
      format: 'esm',
    },
  ],
  external,
  plugins: [postCSS, postcssLit()],
}));

const bundelFiles = {
  input: 'src/build.js',
  output: [
    {
      file: 'dist/porte-widget-core-ui.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [resolve(), commonjs(), postCSS, postcssLit()],
};
const bundelMinFiles = {
  input: 'src/build.js',
  output: [
    {
      file: 'dist/porte-widget-core-ui.min.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [resolve(), commonjs(), postCSS, postcssLit(), terser()],
};
export default [...individualFiles, bundelFiles, bundelMinFiles];
