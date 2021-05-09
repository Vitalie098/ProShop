import React, {useEffect, useState} from "react"
import FormContainer from "../components/FormContainer";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loading from "../components/loading/loading";
import {Button, Col, Form, FormGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {register} from "../store/actions/users"

const RegisterScreen = ({history, location}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {loading, userInfo, error} = userRegister

    const redirect = location.search ? location.search.split("=")[1] : "/"

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    },[userInfo, redirect, history])

    const submitHandler = e => {
        e.preventDefault()

        if(password !== confirmPassword) {
            setMessage("Passwords do not match")
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Sign up</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loading />}
            <Form onSubmit={submitHandler}>
                <FormGroup controlId="name">
                    <div className="form-label">Name</div>
                    <input
                    className="form-control"
                    placeholder="Introdu numele"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="email">
                    <div className="form-label">Email</div>
                    <input
                        className="form-control"
                        placeholder="Introdu email-ul"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password">
                    <div className="form-label">Password</div>
                    <input
                        className="form-control"
                        placeholder="Introdu parola"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword">
                <div className="form-label">Confirm Password</div>
                <input
                    className="form-control"
                    placeholder="Introdu parola din nou"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                </FormGroup>

                <Button type="submit" variant="primary">
                    Sign up
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Have an Account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen