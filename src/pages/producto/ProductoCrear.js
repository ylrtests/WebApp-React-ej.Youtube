import React, { Component } from "react"
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import CategoriasProductoSelect from "../../components/CategoriasProductoSelect"
import axios from 'axios'
import { URL, getToken} from "./../../config/config"

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
        this.handleForm = this.handleForm.bind(this)
        
        this.refButton = React.createRef()
    }

    componentDidMount(){
        this._mounted = true;
    }

    handleForm(values, {resetForm}) {
        this.refButton.current.setAttribute("disabled","")

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
                this.props.showSweetAlert(datos)
            }
            else {
                this.refButton.current.removeAttribute("disabled")
                this.props.showSweetAlert(datos)
            }

        }).catch( (err) => {
            console.log("Error creando producto "+err)
        })
    }

    render() {
        return (
            <div className="container">

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
                                <div className="col-12 form-group">
                                    <label htmlFor="name"><strong>Nombre</strong></label>
                                    <Field name="name" className="form-control" />
                                    {errors.name && touched.name ? (
                                        <div className="text-danger">{errors.name}</div>
                                    ) : null}
                                </div>

                                <div className="col-sm-6 form-group">
                                    <label htmlFor="price"><strong>Precio</strong></label>
                                    <Field name="price" className="form-control" />
                                    {errors.price && touched.price ? (
                                        <div className="text-danger">{errors.price}</div>
                                    ) : null}
                                </div>

                                <div className="col-sm-6 form-group">
                                    <label htmlFor="category_id"><strong>Categoria</strong></label>
                                    <CategoriasProductoSelect />
                                    {errors.category_id && touched.category_id ? (
                                        <div className="text-danger">{errors.category_id}</div>
                                    ) : null}
                                </div>

                                <div className="col-sm-6 form-group">
                                    <label htmlFor="quantity"><strong>Cantidad</strong></label>
                                    <Field name="quantity" className="form-control" />
                                    {errors.quantity && touched.quantity ? (
                                        <div className="text-danger">{errors.quantity}</div>
                                    ) : null}
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <button ref={this.refButton} className="btn btn-success" type="submit">Crear</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div >
        )
    }

    componentWillUnmount(){        
        this._mounted = false;
    }
}

export default ProductoCrear