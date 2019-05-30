import React, { Component } from "react"
import axios from 'axios'
import { URL } from "./../config/config"
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import './login.css'

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email no válido')
        .required('Email requerido'),
    password: Yup.string()
        .min(6, 'Contraseña demasiada corta')
        .max(20, 'Se ha excedido el número de caracteres')
        .required('Email requerido')
})

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            "email": "",
            "password": ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit(values) {

        console.log("Valores del formulario")
        console.log(values)

        axios({
            method: 'post',
            url: URL + '/login',
            data: values
        }).then((response) => {
            let datos = response.data;
            console.log(datos)
            localStorage.setItem('jwt', datos.token)
            this.props.history.go('/')
            this.props.history.push('/')

        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="flex-container" >
                    <div className="login-item">
                        <h1 className="positionTitle">Iniciar sesión</h1>
                        <div className="gapBottom"></div>

                        <Formik
                            initialValues={{
                                email: this.state.email,
                                password: this.state.email
                            }}

                            validationSchema={LoginSchema}
                            onSubmit={(value) => {
                                this.handleSubmit(value)
                            }}
                        >

                            {({ errors, touched }) => (
                                <Form>
                                    <div className="row justify-content-center">
                                        <div className="form-group adjustSize">
                                            <label htmlFor="email"><strong>Email</strong></label>
                                            <Field
                                                name="email"
                                                className="form-control"
                                                type="email"
                                            />
                                            {errors.email && touched.name ? (
                                                <div className="text-danger">{errors.email}</div>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="row justify-content-center">
                                        <div className="form-group adjustSize">
                                            <label htmlFor="password"><strong>Password</strong></label>
                                            <Field
                                                name="password"
                                                className="form-control"
                                                type="password"
                                            />
                                            {errors.email && touched.name ? (
                                                <div className="text-danger">{errors.email}</div>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="row justify-content-center gapBottom">
                                        <button className="btn btn-success adjustSize" type="submit">Iniciar Sesión</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login