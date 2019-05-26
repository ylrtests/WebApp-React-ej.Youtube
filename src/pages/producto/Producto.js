import React, { Component } from "react"
import axios from 'axios'
import { URL, TOKEN } from "./../../config/config"
import { Table } from 'reactstrap'
import SweetAlert from 'sweetalert-react'


class Producto extends Component {

    constructor(props) {
        super(props)

        this.state = {
            productos: [],
            showSweetAlert: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: ''
        }

        this.listarProductos = this.listarProductos.bind(this)
        this.getProductos = this.getProductos.bind(this)
        this.cambiarEstadoProducto = this.cambiarEstadoProducto.bind(this)

    }

    componentDidMount() {
        this.getProductos()
    }

    getProductos() {
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

    cambiarEstadoProducto(productoId) {

        axios({
            method: 'put',
            url: URL + '/product/update/status/' + productoId,
            headers: {
                "Authorization": 'bearer ' + TOKEN,
            }
        }).then((response) => {
            let datos = response.data;

            if (datos.success) {
                console.log(datos);
                this.setState({
                    sweetShow: true,
                    sweetTitle: 'Mensaje',
                    sweetText: datos.message
                })


                // Busca Index del producto al que se debe actualizar el estado.
                const index = this.state.productos.findIndex((item) => {
                    return item.id === productoId
                })

                // Encuentra el producto dentro de la lista de this.state.productos
                // Para posteriormente actualizarlo.
                // --> Usando la funcion de JSON, hace un deep copy del objeto
                let producto = JSON.parse(JSON.stringify(this.state.productos[index]));
                producto.status = producto.status === 1 ? 0 : 1


                //let updatedProductos = Object.assign([],this.state.productos)
                let updatedProductos = JSON.parse(JSON.stringify(this.state.productos));
                updatedProductos[index] = producto

                this.setState({
                    productos: updatedProductos
                })

            }
            else {
                console.log("success falso");
            }

        });


    }

    editarProducto(productoId){
        this.props.history.push('/producto/modificar/'+productoId)
    }

    listarProductos(producto) {
        return (
            <tr key={producto.id}>
                <th>{producto.id}</th>
                <td>{producto.name}</td>
                <td>{producto.price}</td>
                <td>{producto.quantity}</td>
                <td>{producto.category.name}</td>
                <td>{producto.status === 1 ? 'Activo' : 'Inactivo'}</td>
                <td className="text-center">
                    <div className="row">
                        {
                            producto.status === 1 ?
                                <div className="col-6">
                                    <button className="btn btn-danger "
                                            onClick={() => { this.cambiarEstadoProducto(producto.id) }}>Inactivar
                                    </button>
                                </div>
                                :
                                <div className="col-6">
                                    <button className="btn btn-success "
                                            onClick={() => { this.cambiarEstadoProducto(producto.id) }}>Activar
                                    </button>
                                </div>
                        }

                        <div className="col-6">
                            <button className="btn btn-primary "
                                    onClick={() => {this.editarProducto(producto.id)}}>Editar
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }

    cargarIconoEspera() {
        return (
            <tr>
                <td colSpan="7" className="text-center">
                    <object width="100" height="100" type="image/svg+xml" data="img/loading.svg">
                    </object>
                </td>
            </tr>
        )
    }

    render() {
        let listaProductos;

        if (this.state.productos.length > 0) {
            listaProductos = this.state.productos.map(this.listarProductos)
        }

        return (
            <div className="container">
                <div className="row">
                    <h1>Lista de productos</h1>
                </div>

                <div className="row">
                    <SweetAlert
                        show={this.state.sweetShow}
                        title={this.state.sweetTitle}
                        text={this.state.sweetText}
                        success
                        onConfirm={() => this.setState({ sweetShow: false })}
                    />
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Categoria</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!listaProductos ? this.cargarIconoEspera() : listaProductos}
                        </tbody>
                    </Table>
                </div>

            </div>
        )
    }
}

export default Producto