import React, {Component}  from "react"
import { Route, Switch } from 'react-router-dom';
import Producto from "./pages/producto/Producto"
import ProductoCrear from "./pages/producto/ProductoCrear"
import ProductoModificar from "./pages/producto/ProductoModificar"

class Routes extends Component{
    render(){
        return(
                <Switch>
                    <Route path="/"  exact/>
                    <Route path="/producto" component={Producto} exact/>
                    <Route path="/producto/crear" component={ProductoCrear} exact/>
                    <Route path="/producto/modificar/:id" component={ProductoModificar} exact/>
                </Switch>
        )
    }
}

export default Routes