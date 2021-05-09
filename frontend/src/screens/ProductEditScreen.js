import React, {useEffect, useState} from "react"
import FormContainer from "../components/FormContainer";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loading from "../components/loading/loading";
import {Button, Form, FormGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {PRODUCT_UPDATE_RESET} from "../store/actions/typesActions";
import {listProductDetails} from "../store/actions/productDetails";
import {updateProduct} from "../store/actions/productsList";
import axios from "axios";

const UserEditScreen = ({history, match}) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDetails = useSelector(state => state.productDetails)
    const {loading, product, error} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)

    const {
        loading: loadingUpdate,
        success: successUpdate,
        error: errorUpdate
    } = productUpdate

    useEffect(() => {
        if(successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push("/admin/productlist")
        } else {
            if(!product.name || product._id !== productId ) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    },[dispatch,history,successUpdate,productId, product])


    const uploadFileHandler = async (e) => {
        console.log('ssssssssssssda')
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file)

        setUploading(true)

        try{
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const { data } = await axios.post("/api/upload", formData, config)

            setImage(data)
            setUploading(false)
        } catch (e) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = e => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock,
        })
        )}

    return (
        <>
            <Link to={"/admin/productlist"} className='btn btn-light my-3'>
                Go back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loading />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message> }
                {loading
                    ? <Loading/>
                    : error ?
                        <Message variant="danger">{error}</Message>
                        : (

                            <Form onSubmit={submitHandler}>
                                <FormGroup controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        placeholder="Introdu numele"
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        placeholder="Enter price"
                                        type="text"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup controlId="image">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        placeholder="Enter image url"
                                        type="text"
                                        value={image}
                                        onChange={e => setImage(e.target.value)}
                                    />
                                    <Form.File
                                        id="image-file"
                                        label="Choose file"
                                        custom
                                        onChange={uploadFileHandler}
                                    />
                                </FormGroup>
                                <FormGroup controlId="brand">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        placeholder="Enter brand"
                                        type="text"
                                        value={brand}
                                        onChange={e => setBrand(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup controlId="countInStock">
                                    <Form.Label>countInStock</Form.Label>
                                    <Form.Control
                                        placeholder="Enter countInStock"
                                        type="number"
                                        value={countInStock}
                                        onChange={e => setCountInStock(e.target.value)}
                                    />
                                    {uploading && <Loading />}
                                </FormGroup>
                                <FormGroup controlId="category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        placeholder="Enter category"
                                        type="text"
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Enter description"
                                        rows="5"
                                        value={description}
                                        style={{resize: "none"}}
                                        onChange={e => setDescription(e.target.value)}
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