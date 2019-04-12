import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import { Parallax, Background } from 'react-parallax';
import image1 from './Images/Usmentrance.jpg';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import Popper from 'popper.js';



ReactDOM.render(
    <Parallax className="Appbody"
    blur={5}
    bgImage={image1}
    strength={500} >

<Provider store={store} >
<BrowserRouter  >
<App />
</BrowserRouter>
</Provider> </Parallax>
, 
document.getElementById('root'));
registerServiceWorker();
