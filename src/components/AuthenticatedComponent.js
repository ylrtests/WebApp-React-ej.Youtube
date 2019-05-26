import React,{Component} from "react"


class AuthenticatedComponent extends Component{
    //Hacer proxy en package

    constructor(props){
        super(props)

        this.state = {
            user: undefined
        }
    }
    render(){
        return(
            <div>
                Auth
            </div>
        )
    }
}

export default AuthenticatedComponent