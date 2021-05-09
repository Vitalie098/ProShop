import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import Rating from "../components/Rating";
import {Row, Col, Image, ListGroup, Form, Button, Card, FormGroup, FormLabel, FormControl} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux"
import Loading from "../components/loading/loading";
import {listProductDetails} from "../store/actions/products"
import Message from "../components/Message";
import {PRODUCT_CREATE_REVIEW_RESET} from "../store/actions/types/productsTypes";
import {createReviews} from "../store/actions/products";
import Meta from "../components/Meta";

const ProductScreen = ({history, match}) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {product, loading} = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewsCreate = useSelector(state => state.productReviewsCreate)
    const {loading: loadingProductReview, success: successProductReview, error: errorProductReview} = productReviewsCreate

    useEffect(() => {
        if(successProductReview) {
            setRating(0)
            setComment("")
        }
        if(!product._id || product._id !== match.params.id || successProductReview) {
            dispatch(listProductDetails(match.params.id))
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
    },[product, dispatch,match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = e => {
        e.preventDefault()
        dispatch(createReviews(match.params.id, {rating, comment}))
    }

    return (
        <>
        <Link className="btn btn-light my-3" to="/">
          Go Back
        </Link>
            {
                loading
                ? <Loading />
                :
                    <>
                        <Meta title={product.name} />
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <li className="list-group-item">
                                        {product.name}
                                    </li>
                                    <li className="list-group-item">
                                        <Rating values={product.rating} text={`${product.numReviews} reviews`} />
                                    </li>
                                    <li className="list-group-item">
                                        Price: ${product.price}
                                    </li>
                                    <li className="list-group-item">
                                        Description: {product.description}
                                    </li>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <li className="list-group-item">
                                            <Row>
                                                <Col>
                                                    Price:
                                                </Col>
                                                <Col>
                                                    ${product.price}
                                                </Col>
                                            </Row>
                                        </li>
                                        <li className="list-group-item">
                                            <Row>
                                                <Col>
                                                    Status:
                                                </Col>
                                                <Col>
                                                    {product.countInStock > 0 ? "In stock" : "Out of Stock"}
                                                </Col>
                                            </Row>
                                        </li>

                                        {product.countInStock > 0 && (
                                            <li className="list-group-item">
                                                <Row>
                                                    <Col>
                                                        <select className="form-control"
                                                                value={qty}
                                                                onChange={e => setQty(e.target.value)}
                                                        >
                                                            {[...Array(product.countInStock).keys()].map(v => (
                                                                <option key={v} value={v + 1}>
                                                                    {v + 1}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </Col>
                                                </Row>
                                            </li>

                                        )}
                                        <li className="list-group-item">
                                            <Button
                                                type="button"
                                                className="btn-block"
                                                disabled={product.countInStock === 0}
                                                onClick={addToCartHandler}
                                            >
                                                Add To Cart
                                            </Button>
                                        </li>
                                    </ListGroup>
                                </Card>
                            </Col>
                      </Row>
                        <Row>
                            <Col md={6}>
                                <h2>Reviews</h2>
                                {product.reviews && product.reviews.length === 0 && <Message> No Reviews </Message>}
                                <ListGroup variant="flush">
                                    {product.reviews ? product.reviews.map(review => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating values={review.rating} />
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    )) : null }
                                </ListGroup>
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {successProductReview && (
                                        <Message variant='success'>
                                            Review submitted successfully
                                        </Message>
                                    )}
                                    {loadingProductReview && <Loading />}
                                    {errorProductReview && (
                                        <Message variant='danger'>{errorProductReview}</Message>
                                    )}
                                    {userInfo
                                        ? (
                                            <Form onSubmit={submitHandler}>
                                                <FormGroup controlId="rating">
                                                    <FormLabel>Rating</FormLabel>
                                                    <FormControl
                                                        as="select"
                                                        value={rating}
                                                        onChange={e => setRating(e.target.value)}
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="1">1 - Poor</option>
                                                        <option value="2">2 - Fair</option>
                                                        <option value="3">3 - Good</option>
                                                        <option value="4">4 - Very Good</option>
                                                        <option value="5">5 - Excellent</option>
                                                    </FormControl>
                                                </FormGroup>
                                                <FormGroup controlId="comment">
                                                    <FormLabel>Comment</FormLabel>
                                                    <FormControl
                                                        as="textarea"
                                                        row="3"
                                                        value={comment}
                                                        onChange={e => setComment(e.target.value)}
                                                        />
                                                </FormGroup>
                                                <Button
                                                    disabled={loadingProductReview}
                                                    type='submit'
                                                    variant='primary'
                                                >
                                                    Submit
                                                </Button>
                                            </Form>
                                        )
                                        : <Message>
                                        Please <Link to='/login'>sign in</Link> to write a review{' '}
                                    </Message>}
                                </ListGroup.Item>
                            </Col>
                        </Row>
                    </>
            }
        </>
    )
}

export default ProductScreen