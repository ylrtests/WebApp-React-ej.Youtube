import React, { Component } from "react"
import { getToken, URL } from "./../config/config"
import axios from "axios"
import LoadingIcon from "./LoadingIcon"


class AuthenticatedComponent extends Component {
   
    componentDidMount() {

        const jwt = getToken()

        if (!jwt) {
            this.props.changeEstadoUsuario({
                userIsVerified: false,
                isLoading: false,
                user: undefined
            })
        }
        else {
            axios({
                method: 'get',
                url: URL + "/user",
                headers: {
                    "Authorization": 'bearer ' + getToken(),
                }
            }).then((response) => {
                let datos = response.data
                console.log(datos)
                //Verificación de usuario exitosa
                if (datos.success) {
                    this.props.changeEstadoUsuario({
                        userIsVerified: true,
                        isLoading: false,
                        user: datos.user
                    })
                }

                //No se ha verificado usuario
                else {
                    localStorage.removeItem('jwt')
                    this.props.changeEstadoUsuario({
                        userIsVerified: false,
                        isLoading: false,
                        user: undefined
                    })
                }

            }).catch(err => {
                console.log('Error autenticando usuario' + err)
                localStorage.removeItem('jwt')
                    this.props.changeEstadoUsuario({
                        userIsVerified: false,
                        isLoading: false,
                        user: undefined
                    })
            })
        }
    }

    render() {
        if(this.props.isLoading){
            console.log("Verificando usuario...")
            return(
                <div className="container">
                    <div className="row h-100 justify-content-center align-items-center">
                        <LoadingIcon type="ellipsis"/>
                    </div>
                </div>
            )
        }
        else{
            console.log("Ya cargue rutas...")
           return(
               <div>
                   {this.props.children}
               </div>
           )
        }
    }
}

export default AuthenticatedComponent