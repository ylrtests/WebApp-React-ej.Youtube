import React, {Component} from "react"

class ProductoModificar extends Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        console.log(this.props.match.params.id)
    }

    render(){
        return(
            <div>
                <p>Hola: ProductoModificar</p>
            </div>
        )
    }
}

export default ProductoModificar