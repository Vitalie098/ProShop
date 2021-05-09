import React, {useEffect, useState} from "react"
import FormContainer from "../components/FormContainer";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../components/loading/loading";
import Message from "../components/Message";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {login} from "../store/actions/userAuth";


const LoginScreen = ({history, location}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const {loading, userInfo, error} = useSelector(state => state.userLogin)

    const redirect = location.search ? location.search.split("=")[1] : "/"

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    },[history,redirect, userInfo])

    const submitHandler = e => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign in</h1>
            {loading && <Loading />}
            {error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={submitHandler}>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        className="form-control"
                        placeholder="Introdu email-ul"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                        className="form-control"
                        placeholder="Introdu parola"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <Button type="submit" variant="primary">
                    Sign in
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer? {" "}
                    <Link to={redirect ? `/register/redirect=${redirect}` : "/register"}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen