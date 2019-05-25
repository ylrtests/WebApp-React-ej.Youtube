import React, {Component} from "react"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ProductoSchema = Yup.object().shape({
    name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

// 'name', 'price', 'category_id', 'quantity', 'status'

class ProductoCrear extends Component {

    render(){
        return(
            <div>
                <p>Hola: ProductoCrear</p>
            </div>
        )
    }
}

export default ProductoCrear