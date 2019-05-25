import React, { Component } from "react"
import axios from 'axios'
import { URL, TOKEN } from "./../../config/config"
import { Table } from 'reactstrap';

class Producto extends Component {

    constructor(props) {
        super(props)

        this.state = {
            productos: []
        }

        this.listarProductos = this.listarProductos.bind(this)
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: URL + '/product',
            headers: {
                "Authorization": 'bearer ' + TOKEN,
            }
        }).then((response) => {
            let datos = response.data;

            if (datos.success) {
                this.setState({
                    productos: datos.products
                })
            }
            else {
                console.log("success falso");
            }

        });
    }

    listarProductos(producto){
        return(
            <tr key={producto.id}>
                <th>{producto.id}</th>
                <td>{producto.name}</td>
                <td>{producto.price}</td>
                <td>{producto.quantity}</td>
                <td>{producto.category.name}</td>
                <td>{producto.status === 1 ? 'Activo' : 'Inactivo'}</td>
                <td>

                </td>
            </tr>
        )
    }

    render() {

        let listaProductos;

        console.log(this.state.productos)

        if(this.state.productos.length > 0){
            listaProductos = this.state.productos.map(this.listarProductos)
        }

        return (
            <div className="container">
                <div className="row">
                    <h1>Lista de productos</h1>
                </div>
                
                <div className="row">
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Nombre</td>
                                <td>Precio</td>
                                <td>Cantidad</td>
                                <td>Categoria</td>
                                <td>Estado</td>
                                <td>Acciones</td>
                            </tr>
                        </thead>
                        <tbody>
                            {!listaProductos? "Cargando...":listaProductos}
                        </tbody>
                    </Table>
                </div>
                
            </div>
        )
    }
}

export default Producto