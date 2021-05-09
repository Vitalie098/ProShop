import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap"
import {deleteUser, getUsersList} from "../store/actions/users";
import Loading from "../components/loading/loading";
import Message from "../components/Message";
import {Button, Table} from "react-bootstrap";

const UserListScreen = ({history}) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, users, error} = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {

            dispatch(getUsersList())
        } else {
            history.push("/login")
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteUserHandler = id => {
        if(window.confirm("Sunteti sigur?")) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <>
            <h1>Users</h1>
            {loadingDelete && <Loading />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message> }
            {loading ? <Loading /> : error ? <Message variant="danger">{error} </Message> :
                (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                          <tr>
                              <th>ID</th>
                              <th>NAME</th>
                              <th>EMAIL</th>
                              <th>ADMIN</th>
                              <th></th>
                          </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a> </td>
                                <td>
                                    {
                                        user.isAdmin
                                        ?( <i className="fas fa-check" style={{color: "green"}} /> )
                                        :( <i className="fas fa-times" style={{color: "red"}} /> )
                                    }
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit" />
                                        </Button>
                                    </LinkContainer>
                                    {" "}
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteUserHandler(user._id)}>
                                        <i className="fas fa-trash" />
                                    </Button>

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )}
        </>
    )
}

export default UserListScreen
