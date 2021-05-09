import React from "react"
import {Card} from "react-bootstrap"
import Rating from "./Rating";
import {Link} from "react-router-dom"

const Product = ({product}) => {
    return (
        <Card className="my-3 p-3 rounded" >
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top" style={{height: "204px"}}/>
            </Link>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                    <div className="card-title">
                        <strong>{product.name}</strong>
                    </div>
                </Link>
                <div className="card-title">
                    <div className="my-3">
                        <Rating values={product.rating} text={`${product.numReviews} reviews`} />
                    </div>
                </div>
                <h3>${product.price}</h3>
            </div>
        </Card>
    )
}

export default Product