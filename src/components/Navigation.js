import React, { Component } from "react"
import {Link} from "react-router-dom"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem
} from 'reactstrap';

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link className="nav-link" to="/">App</Link>
                    </NavItem>
                </Nav>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link className="nav-link" to="/producto">Productos</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to="/producto/crear">Crear Productos</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigation