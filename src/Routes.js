import React, { Component } from "react"
import { Route, Switch, Redirect } from 'react-router-dom';
import Producto from "./pages/producto/Producto"
import ProductoCrear from "./pages/producto/ProductoCrear"
import ProductoModificar from "./pages/producto/ProductoModificar"
import Home from "./pages/Home"
import AuthenticatedComponent from "./components/AuthenticatedComponent"
import Login from "./components/Login"

class Routes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userIsVerified: undefined,
            isLoading: true,
            user: undefined
        }

        this.changeEstadoUsuario = this.changeEstadoUsuario.bind(this)
    }

    changeEstadoUsuario(e) {
        console.log("Cambiare estado de usuario")
        console.log(e)
        this.setState({
            userIsVerified: e.userIsVerified,
            isLoading: e.isLoading,
            user: e.user
        })
    }

    render() {

        if (!this.state.userIsVerified) {
            console.log(">> No loggeado")
            return (
                <div>

                    <AuthenticatedComponent
                        changeEstadoUsuario={e => this.changeEstadoUsuario(e)}
                        userIsVerified={this.state.userIsVerified}
                        isLoading={this.state.isLoading}
                    >
                        <Switch>
                            <Route path="/login" exact component={Login} />
                            <Route path="/" exact component={Home} />
                            <Route render={() => <Redirect to="/login" />} />
                        </Switch>

                    </AuthenticatedComponent>
                </div>
            )
        }
        console.log(">> Loggeado")
        return (
            <div>
                <AuthenticatedComponent
                    changeEstadoUsuario={e => this.changeEstadoUsuario(e)}
                    userIsVerified={this.state.userIsVerified}
                    isLoading={this.state.isLoading}
                >

                    <Switch>
                        <Route path="/login" exact render={() => <Redirect to="/" />} />
                        <Route path="/" exact component={() => <div>Hola home logeado</div>} />
                        <Route path="/home" exact component={Home} />
                        <Route path="/producto" exact component={Producto} />
                        <Route path="/producto/crear" component={ProductoCrear} exact />
                        <Route path="/producto/modificar/:id" component={ProductoModificar} exact />
                        <Route render={() => <Redirect to="/" />} />
                    </Switch>

                </AuthenticatedComponent>


            </div>

        )
    }
}

export default Routes