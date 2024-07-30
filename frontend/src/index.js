 import React from 'react';
 import ReactDOM from 'react-dom';
 import { Provider } from 'react-redux';
 import store from './store//.';
 import App from './App';
 import {positions,transitions,Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";



 const Options={  //if error are show so error are show in  template from
   timeout:5000,
   positions:positions.BOTTOM_CENTER,
   transitions:transitions.SCALE
 }
 ReactDOM.render(
   <Provider store={store}>
     <AlertProvider template={AlertTemplate} {...Options}>
     <App />
     </AlertProvider>
   </Provider>,
   document.getElementById('root')
 ); 

