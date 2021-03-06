import React from "react"
import {Nav, Navbar, Container, NavDropdown} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/actions/users"
import {Route} from "react-router-dom";
import SearchBox from "./SearchBox";

const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const logoutHandler = () => {
    dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Route render={({ history }) => <SearchBox history={history} />} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart" />Cart
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo
                                ? <NavDropdown id="username" title={userInfo.name}>
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                                : <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fas fa-user"/>Sign in
                                    </Nav.Link>
                                </LinkContainer>
                            }
                            { userInfo && userInfo.isAdmin && (
                                <NavDropdown id="Admin" title="adminmenu">
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header