import React, {useEffect} from "react"
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../store/actions/Cart";
import Message from "../components/Message";
import {Link} from "react-router-dom";

const CartScreen = ({match, location, history}) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split("=")[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId,qty))
        }
    },[match,location,history])

    const removeFromCartHandler = id => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandle = () => {
        history.push("/login?redirect=shipping")
    }

    return (
        <Row>
            <Col md={8}>
                <h1 style={{fontSize: "1.8rem", padding: "1rem 0"}}>Shopping Cart</h1>
                {
                    cartItems.length === 0
                        ? (<Message>Your cart is empty <Link to="/">Go Back</Link></Message>)
                    : (
                        <ListGroup variant="flush">
                            {cartItems.map(item => (
                                <li key={item.product} className="list-group-item">
                                    <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}> {item.name} </Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>


                                        <Col md={2}>
                                            <select
                                                className="form-control"
                                                value={item.qty}
                                                onChange={ e => dispatch(
                                                    addToCart(item.product, Number(e.target.value))
                                                )
                                                }
                                            >

                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}

                                            </select>
                                        </Col>

                                    <Col md={2}>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() => removeFromCartHandler(item.product)}
                                            >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                    </Row>
                                </li>
                            ))}
                        </ListGroup>
                      )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <li className="list-group-item">
                            <h2 style={{fontSize: "1.4rem", padding: "0.5rem 0"}}>SubTotal ({cartItems.reduce((acc, item) => acc + item.qty,0)}) items </h2>
                            ${
                            cartItems.reduce((acc, item) => acc + item.qty * item.price,0).toFixed(2)
                             }
                        </li>
                        <li className="list-group-item">
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandle}
                            >
                                Proceed To Checkout
                            </Button>
                        </li>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen