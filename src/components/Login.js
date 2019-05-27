import React,{Component} from "react"
import axios from 'axios'
import { URL } from "./../config/config"

class Login extends Component {

    constructor(props){
        super(props)

        this.state = {
            "email": "",
            "password": ""
        }

        this.change = this.change.bind(this)
        this.submit = this.submit.bind(this)
    }
    
    change(e){
        this.setState({
            //Con esta sintaxis obtiene el nombre de la propiedad y le asigna el valor
            [e.target.name]: e.target.value
        })
    }

    submit(e){
        e.preventDefault()
        axios({
            method: 'post',
            url: URL+'/login',
            data: {
                "email": this.state.email,
                "password": this.state.password
            }
        }).then((response) => {
            let datos = response.data;
            console.log(datos)
            localStorage.setItem('jwt',datos.token)
            this.props.history.go('/')
            this.props.history.push('/')
            
        });
    }

    render(){
        return(
            <div>
                <form onSubmit={ e=> this.submit(e) }>
                    <label>email</label>
                    <input type="text"name="email" onChange={e => this.change(e)} value={this.state.email}/>
                    <label>password</label>
                    <input type="password" name="password"onChange={e => this.change(e)} value={this.state.password}/>

                    <button type="submit">Iniciar sesión</button>
                </form>
            </div>
        )
    }
}

export default Login