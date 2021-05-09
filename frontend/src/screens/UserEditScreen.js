import React, {useEffect, useState} from "react"
import FormContainer from "../components/FormContainer";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loading from "../components/loading/loading";
import {Button, Form, FormGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {USER_UPDATE_RESET} from "../store/actions/typesActions";
import {getUserDetails} from "../store/actions/userDetails";
import {updateUser} from "../store/actions/userUpdate";

const UserEditScreen = ({history, match}) => {
    const userId = match.params.id

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, user, error} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {
        loading: loadingUpdate,
        success: successUpdate,
        error: errorUpdate
    } = userUpdate

    useEffect(() => {
        if(successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            history.push("/admin/userlist")
        } else {
            if(!user.name || user._id !== userId ) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    },[dispatch,history,successUpdate,userId, user])


    const submitHandler = e => {
        e.preventDefault()
        dispatch(updateUser({id: userId, name, email, isAdmin}))
    }

    return (
        <>
            <Link to={"/admin/userlist"} className='btn btn-light my-3'>
                Go back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loading />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message> }
                {loading
                    ? <Loading/>
                    : error ?
                        <Message variant="danger">{error}</Message>
                        : (

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
                            <FormGroup controlId="isAdmin">
                                <Form.Check
                                    label="Este admin"
                                    type="checkbox"
                                    checked={isAdmin}
                                    onChange={e => setIsAdmin(e.target.checked)}
                                />
                            </FormGroup>

                            <Button type="submit" variant="primary">
                                Update
                            </Button>
                        </Form>
                        )}

            </FormContainer>
        </>
    )
}

export default UserEditScreen