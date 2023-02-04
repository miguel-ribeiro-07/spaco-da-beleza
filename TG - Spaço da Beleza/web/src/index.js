import React from 'react';
import ReactDOM from 'react-dom/client';
import Rotas from './allroutes';
import {Provider} from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Provider store={store}> <Rotas/> </Provider>);
