import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loading from "../components/loading/loading";
import {Button, Col, Form, FormGroup, Row, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"
import {getUserDetails} from "../store/actions/userDetails"
import {updateUserProfile} from "../store/actions/userUpdate"
import {getOrderList} from "../store/actions/orders";

const ProfileScreen = ({history}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, user, error} = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading: loadingOrder, orders, error: errorOrder} = orderListMy


    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if(!user.name) {
                dispatch(getUserDetails("profile"))
                dispatch(getOrderList())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[userInfo, history, user, dispatch])

    const submitHandler = e => {
        e.preventDefault()

        if(password !== confirmPassword) {
            setMessage("Passwords do not match")
        } else {
            setMessage(null)
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
    }

    return (
       <Row>
           <Col md={3}>
               <h2>User Profile</h2>
               {message && <Message variant="danger">{message}</Message>}
               {error && <Message variant="danger">{error}</Message>}
               {success && <Message variant="success">Profile update</Message>}
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
                       Update
                   </Button>
               </Form>
           </Col>
           <Col md={9}>
               <h2>My Orders</h2>
               {loadingOrder ? <Loading />
               : errorOrder ? <Message variant="danger">{errorOrder}</Message>
               : (
                   <Table striped bordered hover responsive className='table-sm'  >
                       <thead>
                           <tr>
                               <th>ID</th>
                               <th>DATE</th>
                               <th>TOTAL</th>
                               <th>PAID</th>
                               <th>DELIVERED</th>
                               <th></th>
                           </tr>
                       </thead>
                       <tbody>
                       {orders.map(order => (
                           <tr key={order._id}>
                               <td>{order._id}</td>
                               <td>{order.createdAt.substring(0,10)}</td>
                               <td>{order.totalPrice}</td>
                               <td>{
                                   order.isPaid ?
                                       order.paidAt.substring(0, 10)
                                       : (<i className="fas fa-times"  style={{color: "red", textAlign: "center"}}/>)
                                   }
                               </td>
                               <td>{
                                   order.isDelivered ?
                                       order.deliveredAt.substring(0, 10)
                                       : (<i className="fas fa-times"  style={{color: "red", textAlign: "center"}}/>)
                               }
                               </td>
                               <td>
                                  <LinkContainer to={`/order/${order._id}`}>
                                      <Button variant="light" className="btn-sm">Details</Button>
                                  </LinkContainer>
                               </td>

                           </tr>
                           ))}
                       </tbody>
                   </Table>
                   )}
           </Col>
       </Row>
    )
}

export default ProfileScreen