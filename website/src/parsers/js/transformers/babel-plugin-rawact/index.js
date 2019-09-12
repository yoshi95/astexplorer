import presetReact from '@babel/preset-react';
import rawact from 'babel-plugin-rawact';
import pkg from 'babel-plugin-rawact/package';

const ID = 'babel-plugin-rawact';
export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'babylon7',

  loadTransformer(callback) {
    require([
      'prettier/standalone',
      'prettier/parser-babylon',
      'babel7',
    ], (prettier, prettierParser, babel) => callback({
      prettier, prettierParser, babel,
    }));
  },

  transform({ prettier, prettierParser, babel }, transformCode) {
    const prettierOptions = { plugins: [prettierParser] };
    const optionsJsx = {
      presets: [presetReact],
      ast: false,
      babelrc: false,
      highlightCode: true,
    };
    const jsxTransformed = prettier.format(
      babel.transform(transformCode, optionsJsx).code,
      prettierOptions
    );

    const options = {
      plugins: [rawact],
      ast: false,
      babelrc: false,
      highlightCode: true,
    };

    return `
/*
${jsxTransformed}
*/
${babel.transform(jsxTransformed, options).code}
    `;
  },
};
