import React, {useState} from "react"
import FormContainer from "../components/FormContainer";
import {Button, Form, FormGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingAddress} from "../store/actions/Cart";
import CheckOutSteps from "../components/CheckOutSteps";

const ShippingScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = e => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push("/payment")

    }
    return (
        <FormContainer>
            <CheckOutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup controlId="address">
                    <div className="form-label">Address</div>
                    <input
                        className="form-control"
                        placeholder="Introdu adresa"
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="name">
                    <div className="form-label">City</div>
                    <input
                        className="form-control"
                        placeholder="Introdu orasul"
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="postalCode">
                    <div className="form-label">Postal Code</div>
                    <input
                        className="form-control"
                        placeholder="Introdu codul postal"
                        type="text"
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="country">
                    <div className="form-label">Country</div>
                    <input
                        className="form-control"
                        placeholder="Introdu tara"
                        type="text"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    />
                </FormGroup>

                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen