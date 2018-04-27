import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import WebFontLoader from 'webfontloader';

WebFontLoader.load({
  google: {
    families: ['Pirata One', 'Material Icons'],
  },
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
