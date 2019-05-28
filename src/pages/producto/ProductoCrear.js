import React, { Component } from "react"
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import CategoriasProductoSelect from "../../components/CategoriasProductoSelect"
import axios from 'axios'
import { URL, getToken} from "./../../config/config"
import SweetAlert from 'sweetalert-react'

// Esquema de validaciones
const ProductoSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Demasiado corto!')
        .max(50, 'Demasiado largo!')
        .required('Requerido'),
    price: Yup.number()
        .required('Requerido'),
    category_id: Yup.string()
        .required('Requerido'),
    quantity: Yup.number()
        .required('Requerido'),
});


class ProductoCrear extends Component {

    constructor(props){
        super(props)

        this.state = {
            showSweetAlert: false,
            sweetTitle:'',
            sweetText:'',
            sweetType:''
        }
    }

    handleForm(values, {resetForm}) {

        console.log("Valores del formulario")
        console.log(values)
        axios({
            method: 'post',
            url: URL + '/product',
            headers: {
                "Authorization": 'bearer '+getToken()
            },
            data: values
        }).then((response) => {
            let datos = response.data;

            if (datos.success) {
                this.setState({ 
                    sweetShow: true,
                    sweetTitle: 'Mensaje',
                    sweetText: datos.message
                })
                resetForm()
            }
            else {
                console.log("success falso");
            }

        }).catch( (err) => {
            console.log("Error creando producto "+err)
        })
    }

    render() {
        return (
            <div className="container borderForm">

                <div>
                    <SweetAlert
                        show={this.state.sweetShow}
                        title={this.state.sweetTitle}
                        text={this.state.sweetText}
                        success
                        onConfirm={() => this.setState({ sweetShow: false })}
                    />
                </div>

                <div className="row">
                    <h1 className="col-md-6">Crear producto</h1>
                </div>

                <Formik
                    initialValues={{
                        name: '',
                        price: '',
                        category_id: '',
                        quantity: ''
                    }}
                    validationSchema={ProductoSchema}
                    onSubmit={(value, {resetForm}) => {
                        this.handleForm(value, {resetForm})
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label htmlFor="name"><strong>Nombre</strong></label>
                                    <Field name="name" className="form-control" />
                                    {errors.name && touched.name ? (
                                        <div className="text-danger">{errors.name}</div>
                                    ) : null}
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor="price"><strong>Precio</strong></label>
                                    <Field name="price" className="form-control col-md-6" />
                                    {errors.price && touched.price ? (
                                        <div className="text-danger">{errors.price}</div>
                                    ) : null}
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor="category_id"><strong>Categoria</strong></label>
                                    <CategoriasProductoSelect />
                                    {errors.category_id && touched.category_id ? (
                                        <div className="text-danger">{errors.category_id}</div>
                                    ) : null}
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor="quantity"><strong>Cantidad</strong></label>
                                    <Field name="quantity" className="form-control col-md-6" />
                                    {errors.quantity && touched.quantity ? (
                                        <div className="text-danger">{errors.quantity}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button className="btn btn-success" type="submit">Crear</button>
                                </div>

                            </div>


                        </Form>

                    )}
                </Formik>

            </div >
        )
    }
}

export default ProductoCrear