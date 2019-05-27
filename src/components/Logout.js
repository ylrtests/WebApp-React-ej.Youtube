import React from "react"

class Logout extends React.Component{

    componentDidMount(){

        //Debo cerrar sesión en API...
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