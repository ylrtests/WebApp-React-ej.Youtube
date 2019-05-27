import React from "react"
import {Link} from "react-router-dom"

class Index extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {

        return (
            <div>
                <h1>Home - Index</h1>
                <Link className="" to="/login">Iniciar sesión</Link>
            
            </div>
        )
    }
}

export default Index