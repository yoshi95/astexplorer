import es2015 from 'babel-preset-es2015';
import stage0 from 'babel-preset-stage-0';
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
      'babel7',
    ], (babel) => callback({
      babel,
    }));
  },

  transform({ babel }, transformCode) {
    const options = {
      presets: [presetReact],
      plugins: [rawact],
      ast: false,
      babelrc: false,
      highlightCode: true,
    };

    return babel.transform(transformCode, options);
  },
};
