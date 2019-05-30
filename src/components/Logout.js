import React from "react"
import axios from "axios"
import { getToken, URL } from "../config/config"

class Logout extends React.Component{

    componentDidMount(){

        
        if(getToken()){
            axios({
                method: "get",
                url: URL + "/logout?token="+getToken(),
                headers: {
                    "Authorization": 'bearer ' + getToken(),
                }
            }).then( (response) => {
                console.log(response.data)
            }).catch( (error) => {
                console.log(error)
            })
        }

        
        localStorage.removeItem('jwt')

        this.props.changeEstadoUsuario({
            userIsVerified: false,
            isLoading: false,
            user: undefined
        })
    }

    render(){
        return(
            <div>Cierra sesión</div>
        )
    }
}

export default Logout