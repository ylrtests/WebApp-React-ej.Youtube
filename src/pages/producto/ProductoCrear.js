import React, { Component } from "react"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Esquema de validaciones
const ProductoSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Demasiado corto!')
        .max(50, 'Demasiado largo!')
        .required('Requerido'),
    price: Yup.number()
        .required('Requerido'),
    category_id: Yup.number()
        .required('Requerido'),
    quantity: Yup.number()
        .required('Requerido'),
});


class ProductoCrear extends Component {

    handleForm(values) {
        console.log(values)
    }

    render() {
        return (
            <div className="container borderForm">
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
                    onSubmit={(value) => {
                        this.handleForm(value)
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label htmlFor = "name"><strong>Nombre</strong></label>
                                    <Field name="name" className="form-control" />
                                    {errors.name && touched.name ? (
                                        <div className="text-danger">{errors.name}</div>
                                    ) : null}
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor = "price"><strong>Precio</strong></label>
                                    <Field name="price" className="form-control col-md-6" />
                                    {errors.price && touched.price ? (
                                        <div className="text-danger">{errors.price}</div>
                                    ) : null}
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor = "category_id"><strong>Categoria</strong></label>
                                    <Field name="category_id" className="form-control col-md-6" />
                                    {errors.category_id && touched.category_id ? (
                                        <div className="text-danger">{errors.category_id}</div>
                                    ) : null}
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor = "quantity"><strong>Cantidad</strong></label>
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