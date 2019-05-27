import React, { Component } from 'react';
import './App.css';
import { BrowserRouter} from 'react-router-dom';
import Routes from "./Routes"

/*
import AppEjemploReactRouter from "./pruebas/AppEjemploReactRouter"
Ejemplo sencillo de React Router Dom
*/

class App extends Component {
  render() {
    return (
      /* <AppEjemploReactRouter /> */
      
      <div>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
