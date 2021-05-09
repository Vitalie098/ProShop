import React, { useEffect } from "react"
import {Row,Col} from "react-bootstrap"
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux"
import {listProducts} from "../store/actions/products";
import Loading from "../components/loading/loading";
import Paginate from "../components/Paginate";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import {Link} from "react-router-dom";
import Meta from "../components/Meta";

const HomeScreen = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()
    const productsList = useSelector(state => state.productsList)
    const {products, page, pages, loading, error} = productsList

    useEffect(() => {
     dispatch(listProducts(keyword, pageNumber))
    },[dispatch, keyword, pageNumber])

    return (
        <>
            <Meta />
            {!keyword
                ? <ProductCarousel />
                : <Link to={"/"} className="btn btn-light">
                    Go Back
                </Link>
            }
            <h1>Latest Products</h1>
            {
                loading
                ? <Loading />
                    : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                 <>
                        <Row>
                            {products && products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword ? keyword : ""} />
                    </>
                    ) }
        </>

    )
}

export default HomeScreen