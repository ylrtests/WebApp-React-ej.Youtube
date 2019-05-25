import React, { Component } from "react"
import { Field } from 'formik'
import axios from 'axios'
import {URL,TOKEN} from "./../config/config"

class CategoriasProductoSelect extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categorias: []
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: URL+'/categories/select',
            headers: {
              "Authorization": 'bearer '+TOKEN,
            }
          }).then( (response) => {
                let datos = response.data;

                if(datos.success){
                    this.setState({
                        categorias:datos.categorias
                    })
                }
                else{
                    console.log("success falso");
                }
                
          });
    }

    getListaCategorias(categoria){
        return(
            <option value={categoria.id} key={categoria.id}>{categoria.name}</option>
        )
    }

    render() {
        let listaCategorias;

        if(this.state.categorias.length > 0){
            listaCategorias = this.state.categorias.map(this.getListaCategorias)
        }

        return (
            <Field className="form-control col-md-6" component="select" name="category_id">
                <option hidden  >Seleccionar</option>
                {listaCategorias}
            </Field>
        )
    }
}

export default CategoriasProductoSelect