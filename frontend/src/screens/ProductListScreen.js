import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap"
import Loading from "../components/loading/loading";
import Message from "../components/Message";
import {Row, Button, Col, Table} from "react-bootstrap";
import {createProduct, deleteProduct, listProducts} from "../store/actions/productsList";
import {PRODUCT_CREATE_RESET} from "../store/actions/typesActions";
import Paginate from "../components/Paginate";

const ProductListScreen = ({history, match}) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productsList)
    const {products, page, pages, loading, error} = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { product: createdProduct, success: successCreate} = productCreate

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if(!userInfo || !userInfo.isAdmin) {
            history.push("/login")
        }

        if(successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else {
            dispatch(listProducts("", pageNumber))
        }
    }, [dispatch, history, userInfo, successDelete,successCreate, createdProduct, pageNumber])

    const deleteProductHandler = id => {
        if(window.confirm("Sunteti sigur?")) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }
    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"/> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loading />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message> }
            {loading ? <Loading /> : error ? <Message variant="danger">{error} </Message> :
                (
                    <>
                        <Table striped bordered hover responsive className="table-sm">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant="light" className="btn-sm">
                                                <i className="fas fa-edit" />
                                            </Button>
                                        </LinkContainer>
                                        {" "}
                                        <Button variant="danger" className="btn-sm" onClick={() => deleteProductHandler(product._id)}>
                                            <i className="fas fa-trash" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <Paginate page={page} pages={pages} isAdmin={true} />
                    </>
                )}
        </>
    )
}

export default ProductListScreen