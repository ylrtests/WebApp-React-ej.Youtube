import React, { Component } from 'react';
import './App.css';
import { BrowserRouter} from 'react-router-dom';
import Routes from "./Routes"
import Navigation from "./components/Navigation"

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
          <Navigation />
          <Routes />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
