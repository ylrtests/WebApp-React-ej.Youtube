import React, { Component } from "react"
import axios from 'axios'
import { URL, getToken } from "./../../config/config"
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import SweetAlert from 'sweetalert-react'
import LoadingIcon from "./../../components/LoadingIcon"
import ProductoCrear from "./ProductoCrear"
import ProductoModificar from "./ProductoModificar"

let contador = 0

class Producto extends Component {

    constructor(props) {
        super(props)

        this.state = {
            productos: [],
            productoEditar: {},
            modal: false,
            modalCreate: false,
            modalEdit: false,
            modalTitle: '',
            sweetAlert: {
                sweetShow: false,
                sweetTitle: '',
                sweetText: '',
                sweetType: 'success'
            }
        }

        this.getProductos = this.getProductos.bind(this)
        this.cambiarEstadoProducto = this.cambiarEstadoProducto.bind(this)
        this.editarProducto = this.editarProducto.bind(this)
        this.listarProductos = this.listarProductos.bind(this)
        this.cargarIconoEspera = this.cargarIconoEspera.bind(this)
        this.toggleModal = this.toggleModal.bind(this);
        this.showSweetAlert = this.showSweetAlert.bind(this);

    }

    componentDidMount() {
        this._mounted = true
        this.getProductos()
    }

    getProductos() {
        axios({
            method: 'get',
            url: URL + '/product',
            headers: {
                "Authorization": 'bearer ' + getToken(),
            }
        }).then((response) => {
            let datos = response.data;

            if (datos.success && this._mounted) {
                this.setState({
                    productos: datos.products
                })
            }
            else {
                //console.log("success falso");
            }
        }).catch((err) => {
            this.props.history.push("/logout")
        });
    }

    cambiarEstadoProducto(productoId) {

        axios({
            method: 'put',
            url: URL + '/product/update/status/' + productoId,
            headers: {
                "Authorization": 'bearer ' + getToken(),
            }
        }).then((response) => {
            let datos = response.data;

            if (datos.success && this._mounted) {
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

                if (this._mounted) {
                    this.setState({
                        productos: updatedProductos
                    })

                }
            }
            else {
                console.log("success falso");
            }

        });


    }

    editarProducto(productoId) {
        // Busca Index del producto al que se debe editar.
        const index = this.state.productos.findIndex((item) => {
            return item.id === productoId
        })
        // Encuentra el producto dentro de la lista de this.state.productos
         let producto = JSON.parse(JSON.stringify(this.state.productos[index]));

         console.log("Esto que es...")
         console.log(producto)

         this.setState({
            productoEditar: producto,
            modal: true,
            modalCreate: false,
            modalEdit: true,
            modalTitle: 'Editar producto - '+producto.name,
        })
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
                                onClick={() => { 
                                    this.editarProducto(producto.id)
                                    }}>Editar
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
                    <LoadingIcon />
                </td>
            </tr>
        )
    }

    toggleModal() {
        console.log("Hago tooggle del modal :D")
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    showSweetAlert(datos){
        console.log(":::::::::::::::::::")
        console.log(datos)

        let updatedSweetAlert = JSON.parse(JSON.stringify(this.state.sweetAlert));
        console.log(updatedSweetAlert)
        updatedSweetAlert.sweetTitle = "Mensaje"
        updatedSweetAlert.sweetShow = true
        updatedSweetAlert.sweetText = datos.message
        updatedSweetAlert.sweetType = datos.success ? "success" : "error"
        
        if(datos.success){
            this.setState({
                modal:false,
                sweetAlert:updatedSweetAlert
            })
    
            this.getProductos()
        }
        else{
            this.setState({
                sweetAlert:updatedSweetAlert
            })
        }
    }

    render() {
        console.log("Hago render..."+(contador++))
        let listaProductos;
        let modalComponent;

        if (this.state.productos.length > 0) {
            listaProductos = this.state.productos.map(this.listarProductos)
        }

        if (this.state.modalCreate) { modalComponent = <ProductoCrear showSweetAlert={this.showSweetAlert} /> }
        else if (this.state.modalEdit) { modalComponent = <ProductoModificar showSweetAlert={this.showSweetAlert} productoEditar={this.state.productoEditar}/>}

        return (
            <div className="container">
                <div className="row">
                    <h1>Lista de productos</h1>
                </div>

                <div className="row mb-4">
                    <Button color="success"
                        onClick={() => {
                            this.toggleModal()
                            this.setState({
                                modalCreate: true,
                                modalEdit: false,
                                modalTitle: 'Crear producto',
                            })
                        }}>
                        Crear
                    </Button>
                </div>

                <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="">
                    <ModalHeader toggle={this.toggleModal}>{this.state.modalTitle}</ModalHeader>
                    <ModalBody>
                        {modalComponent}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleModal}>Cancelar</Button>
                    </ModalFooter>
                </Modal>

                <div className="row">
                    <SweetAlert
                        show={this.state.sweetAlert.sweetShow}
                        title={this.state.sweetAlert.sweetTitle}
                        text={this.state.sweetAlert.sweetText}
                        animation="slide-from-top"
                        type={this.state.sweetAlert.sweetType}
                        onConfirm={() => {
                            let updatedSweetAlert = JSON.parse(JSON.stringify(this.state.sweetAlert));
                            updatedSweetAlert.sweetShow = false
                            this.setState({sweetAlert: updatedSweetAlert})
                            }  
                        }
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

    componentWillUnmount() {
        this._mounted = false;
    }
}

export default Producto