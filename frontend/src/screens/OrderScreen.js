import React, {useEffect, useState} from "react"
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import {Link} from "react-router-dom";
import {deliverOrder, getOrderDetails, payOrder} from "../store/actions/orders";
import Loading from "../components/loading/loading";
import {PayPalButton} from "react-paypal-button-v2"
import axios from "axios"
import {ORDER_DELIVER_RESET, ORDER_PAY_RESET} from "../store/actions/typesActions";

const OrderScreen = ({history, match}) => {
    const orderId = match.params.id
    const [sdkReady, SetSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const {loading, order, error} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success : successPay} = orderPay

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading: loadingDeliver, success: successDeliver, error: errorDeliver} = orderDeliver

    const dispatch = useDispatch()


    useEffect(() => {
        if(!userInfo) {
            history.push("/login")
        }

        const addPayPalScript = async () => {
            const {data : clientId} = await axios.get("/api/config/paypal")
            const script = document.createElement("script")
            script.type = "text/javascript"
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                SetSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay || successDeliver || order._id !== orderId){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})

            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript()
            } else {
                SetSdkReady(true)
            }
        }
    }, [history, userInfo, dispatch, order, orderId, successPay, successDeliver])

    if(!loading) {
        const addDecimals = num => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((total, item) => total + item.price * item.qty, 0)
        )
    }

    const successPaymentHandler = paymentResult => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }


    return (
        <>
           <h1>Order {order._id}</h1>
            {loading ? <Loading/> : error ? <Message variant="danger"> {error} </Message>
            :  <Row>
                    <Col md={8}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:{" "}</strong>
                                    {order.user.name}
                                </p>
                                <p>
                                    <strong>Email:{" "}</strong>
                                    <a href={`mailto:${order.user.email}`}>{order.user.email} </a>
                                </p>
                                <p>
                                    <strong>Address: {" "}</strong>
                                    {order.shippingAddress.address},{order.shippingAddress.city} {" "}
                                    {order.shippingAddress.postalCode}, {" "} {order.shippingAddress.country}
                                </p>
                                {order.isDelivered
                                    ? <Message variant="success">Delivered in {order.deliveredAt}</Message>
                                    : <Message variant="danger">Not Delivered</Message>
                                }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid
                                    ? <Message variant="success">Paid in {order.paidAt}</Message>
                                    : <Message variant="danger">Not Paid</Message>
                                }

                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order items</h2>
                                {order.orderItems.length === 0 ? (
                                        <Message>Your cart is empty</Message>
                                    )
                                    : (
                                        <ListGroup variant="flush">
                                            {order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                fluid
                                                                rounded
                                                            />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x {item.price} = {(item.qty * item.price).toFixed(2)}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )
                                }
                            </ListGroup.Item>
                        </ListGroup>

                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Items:
                                        </Col>
                                        <Col>
                                            ${order.itemsPrice}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            Shipping:
                                        </Col>
                                        <Col>
                                            ${order.shippingPrice}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            Tax:
                                        </Col>
                                        <Col>
                                            ${order.taxPrice}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            Total:
                                        </Col>
                                        <Col>
                                            ${order.totalPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loading />}
                                        {!sdkReady ? (
                                            <Loading />
                                            )
                                        : (
                                            <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                            />
                                            )
                                            }
                                    </ListGroup.Item>
                                )}
                                {loadingDeliver && <Loading />}
                                {errorDeliver && <Message variant="danger">{errorDeliver}</Message> }
                                {userInfo &&
                                userInfo.isAdmin &&
                                order.isPaid &&
                                !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            type="button"
                                            className="btn btn-block"
                                            onClick={deliverHandler}
                                        >
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            }
        </>
    )
}

export default OrderScreen