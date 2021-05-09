import React, {useState} from "react"
import FormContainer from "../components/FormContainer";
import {Button, Col, Form, FormGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import CheckOutSteps from "../components/CheckOutSteps";
import {savePaymentMethod} from "../store/actions/Cart";

const PaymentScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress) {
        history.push("/shipping")
    }
    const [paymentMethod, setPaymentMethod] = useState("PayPal")
    const dispatch = useDispatch()


    const submitHandler = e => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push("/placeorder")
    }

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3 />
            <h1>Payment</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Form.Label as="legend">Choose Payment Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={e => setPaymentMethod(e.target.value)}
                        />
                        {/* <input
                            type="radio"
                            className="form-check"
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={e => setPaymentMethod(e.target.value)}
                        />*/}
                    </Col>
                </FormGroup>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen