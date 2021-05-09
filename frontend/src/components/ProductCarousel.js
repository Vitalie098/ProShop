import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Loading from "./loading/loading";
import Message from "./Message";
import {Carousel, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import {listTopProducts} from "../store/actions/productsList";

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productsTop = useSelector(state => state.productsTop)
    const {loading, products, error} = productsTop

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (
        loading ? <Loading /> : error ? <Message variant="danger">{error}</Message> : (
            <Carousel pause="hover"  className='bg-dark'>
                {products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid />
                            <Carousel.Caption className='carousel-caption'>
                                <h2>
                                    {product.name} (${product.price})
                                </h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    )
}

export default ProductCarousel